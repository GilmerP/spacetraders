<template>
  <div class="loader" v-if="loading"></div>
  <div class="container" v-else>
    <svg width="1000" height="1000" id="map" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <celestial-body
        v-for="(location, index) in celestialBodies"
        :key="index"
        :id="location.symbol"
        :location="location"
        @click="event => selectLocation(location, event)"
      ></celestial-body>

      <svg
        v-for="ship in ships"
        :key="ship.id"
        :id="ship.id"
        @click="() => selectShip(ship)"
        @dblclick="showMarketplace(ship)"
      >
        <path
          class="ship Object"
          :transform="`translate(${getShipLocation(ship)})`"
          d="m -3.6557208,14.182777 -0.790943,-0.817224 0.821134,-2.674261 0.821134,-2.6742618 -1.408061,-1.435289 c -0.774434,-0.78941 -1.9411739,-1.958958 -2.5927554,-2.598994 l -1.1846944,-1.163705 -2.4997564,0.76591 c -1.374864,0.421249 -2.617386,0.764601 -2.761156,0.763002 C -13.516142,4.3450082 -15,2.9425672 -15,2.6947542 c 0,-0.177702 3.978423,-7.048001 4.279386,-7.390028 0.208815,-0.237305 0.590205,-0.283268 3.7651813,-0.453754 l 3.5328309,-0.189703 1.941288,-2.1094723 c 5.015127,-5.4496249 8.283834,-7.1495569 14.4256978,-7.5022639 1.540327,-0.08846 1.628869,-0.07895 1.863773,0.199995 0.233485,0.277265 0.23866,0.394141 0.09715,2.194296 -0.472523,6.0110419 -2.640876,9.8949982 -8.2701728,14.8135562 l -1.323709,1.156581 -0.0076,0.641326 C 5.2869452,5.4699612 4.9707032,10.569874 4.8948292,10.650984 4.7053712,10.85351 -2.5214408,15 -2.6849658,15 c -0.09887,0 -0.535693,-0.367751 -0.970712,-0.817223 z m 13.40834,-21.6378039 c 0.6791928,-0.3033704 1.1218108,-0.9705846 1.1218108,-1.6910542 0,-0.503595 -0.07792,-0.7046604 -0.434053,-1.1200929 -0.391273,-0.456417 -0.5123778,-0.512377 -1.2287278,-0.567769 -0.784197,-0.06064 -0.801504,-0.05415 -1.312472,0.492081 -0.438478,0.4687379 -0.517795,0.6418169 -0.517795,1.1298711 0,0.8041095 0.285209,1.3090502 0.933017,1.651839 0.649972,0.3439326 0.867907,0.3598621 1.43822,0.105125 z"
        />
      </svg>

      <line
        class="flightLine"
        v-for="flight in flightPlans"
        :key="flight.id"
        :x1="flight.x1"
        :x2="flight.x2"
        :y1="flight.y1"
        :y2="flight.y2"
        @mousemove="event => showFlightDetails(event, flight)"
      ></line>
    </svg>
    <div id="ship-infos">
      <div
        v-for="ship in ships.concat(shipsTravelling)"
        :key="ship.id"
        :id="'shipinfo-' + ship.id"
        class="item-card"
        @click="selectShip(ship)"
        @dblclick="showMarketplace(ship)"
      >
        <h3 class="item-card--header">
          {{ ship.manufacturer + " " + ship.class }}
        </h3>
        <table class="item-card_details">
          <tr>
            <td>Location:</td>
            <td v-if="ship.location">{{ ship.location }}</td>
            <td v-else>
              <tr>
                <td>travelling...</td>
              </tr>
              <tr>
                <td>Destination:</td>
                <td>{{ flightPlans.find(flight => flight.shipId === ship.id)?.destination }}</td>
              </tr>
              <tr>
                <td>Time remaining:</td>
                <td>{{ flightPlans.find(flight => flight.shipId === ship.id)?.timeRemainingInSeconds - counter }}</td>
              </tr>
            </td>
          </tr>
          <tr>
            <td>Goods:</td>
            <td>
              <tr v-for="cargo in ship.cargo" :key="cargo.good">
                <td>{{ capitalize(cargo.good) }}:</td>
                <td>{{ cargo.quantity }}</td>
              </tr>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div id="location-info" class="location-info item-card">
      <div>
        <p>Name: {{ selectedObject?.name }}</p>
        <p>Type: {{ selectedObject?.type }}</p>
      </div>

      <button :disabled="!(selectedShip && selectedObject)" @click="e => travel(selectedShip, e)">
        Travel
      </button>
    </div>
    <div id="flight-info" class="flight-info item-card">
      <p>Flight from {{ selectedFlight.departure }} to {{ selectedFlight.destination }}</p>
      <p>Seconds till destination: {{ selectedFlight.timeRemainingInSeconds - counter }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { getCelestialBodys, createFlightPlan, getFlightById } from "../ts/api";
import SvgHelper from "../ts/SvgHelper";
import { store } from "@/store/index";
import router from "../router/index";
import Ship from "@/interfaces/Ship";
import CelestialBodyInterface from "@/interfaces/CelestialBody";
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import FlightPlan from "@/interfaces/FlightPlan";
import CelestialBody from "@/components/CelestialBody.vue";
import useMessage from "../ts/Message";

const { messageText } = useMessage();

/**
 * draws a line between two SVGElements
 * @param start id of the first SVGElement
 * @param end id of the second SVGElement
 */
function showTravelLine(start: string, end: string) {
  const shipBox = SvgHelper.getBoxFromSvg(start);
  const shipCenter = SvgHelper.getCenterOfBox(shipBox);
  const locationBox = SvgHelper.getBoxFromSvg(end);
  const locationCenter = SvgHelper.getCenterOfBox(locationBox);

  document.getElementById("travelPath")?.remove();
  const travelLine = SvgHelper.drawLine(shipCenter.x, shipCenter.y, locationCenter.x, locationCenter.y);

  (travelLine as Element).id = "travelPath";
  (document.getElementById("map") as HTMLElement).append(travelLine);
}

function movePopup(x: number, y: number, popUp: HTMLElement) {
  const grid = document.getElementsByClassName("container")[0] as HTMLElement;
  const locationInfo = popUp;
  locationInfo.style.left = String(x - grid.offsetLeft) + "px";
  locationInfo.style.top = String(y - grid.offsetTop) + "px";
  locationInfo.style.display = "block";
}

function hidePopups() {
  const flightInfo = document.getElementById("flight-info");
  const locationInfo = document.getElementById("location-info");
  if (flightInfo) flightInfo.style.display = "none";
  if (locationInfo) locationInfo.style.display = "none";
}

export default defineComponent({
  components: { CelestialBody },
  setup() {
    const selectedObject = ref<CelestialBodyInterface>();
    const selectedShip = ref<Ship>();

    function selectLocation(location: CelestialBodyInterface, event: MouseEvent) {
      if (selectedObject.value?.symbol === location.symbol) {
        selectedObject.value = undefined;
        hidePopups();
        document.getElementById("travelPath")?.remove();
        return;
      }
      selectedObject.value = location;
      movePopup(event.clientX, event.clientY, document.getElementsByClassName("location-info")[0] as HTMLElement);
      if (!selectedShip.value) return;
      showTravelLine(selectedShip.value.id, selectedObject.value.symbol);
    }

    function selectShip(ship: Ship) {
      const shipInfos = document.getElementById("ship-infos")?.getElementsByClassName("item-card");
      if (shipInfos) {
        for (let index = 0; index < shipInfos.length; index++) {
          const element = shipInfos[index];
          element.classList.remove("selected");
        }
      }
      if (selectedShip.value?.id === ship.id) {
        selectedShip.value = undefined;
        document.getElementById("travelPath")?.remove();
        return;
      }
      selectedShip.value = ship;
      document.getElementById("shipinfo-" + ship.id)?.classList.add("selected");
      if (!selectedObject.value) return;
      showTravelLine(selectedShip.value.id, selectedObject.value.symbol);
    }

    async function travel(ship: Ship) {
      if (!(selectedObject.value && selectedShip.value)) return;
      try {
        const flightplan = await createFlightPlan(ship.id, selectedObject.value.symbol);
        messageText.value = `You are on your way to ${flightplan.destination}! \n
          Total travel duration: ${flightplan.timeRemainingInSeconds}`;
        document.getElementById("travelPath")?.remove();
        store.update();
      } catch (error) {
        messageText.value = (error as Error).message;
      }
      hidePopups();
    }

    const loading = ref<boolean>(true);
    const celestialBodies = ref<Array<CelestialBodyInterface>>([]);
    const ships = computed(() => store.state.userShips.filter(x => x.location));
    const shipsTravelling = computed(() => store.state.userShips.filter(x => !x.location));
    async function getLocations() {
      const currentLocation = selectedShip.value?.location.split("-")[0] ?? "OE";
      celestialBodies.value = await getCelestialBodys(currentLocation);
      loading.value = false;
    }

    let interval = -1;
    let intervalRunning = false;
    const counter = ref(0);
    // eslint-disable-next-line
    const flightPlans = ref<Array<any>>([]);
    watch(shipsTravelling, async () => {
      flightPlans.value = [];
      shipsTravelling.value.forEach(async ship => {
        const flightPlan = await getFlightById(ship.flightPlanId as string);
        const departureBox = SvgHelper.getBoxFromSvg(flightPlan.departure);
        const destinationBox = SvgHelper.getBoxFromSvg(flightPlan.destination);
        const departureCenter = SvgHelper.getCenterOfBox(departureBox);
        const destinationCenter = SvgHelper.getCenterOfBox(destinationBox);
        flightPlans.value.push({
          ...flightPlan,
          x1: departureCenter.x,
          y1: departureCenter.y,
          x2: destinationCenter.x,
          y2: destinationCenter.y
        });
      });
      counter.value = 0;

      if (!shipsTravelling.value.length || intervalRunning) return;

      interval = setInterval(() => {
        intervalRunning = true;

        if (flightPlans.value.some(flight => flight.timeRemainingInSeconds <= counter.value)) {
          clearInterval(interval);
          hidePopups();
          flightPlans.value = [];
          counter.value = 0;
          intervalRunning = false;
          store.update();
        }
        counter.value += 1;
      }, 1000);
    });

    onBeforeUnmount(() => clearInterval(interval));

    onMounted(async () => {
      await getLocations();
    });

    function getShipLocation(ship: Ship) {
      if (ship.x && ship.y) return `${ship.x * 4 + 500} ${500 - ship.y * 4}`;
      if (!ship.flightPlanId) throw new Error("What is this bullshit");
    }

    const selectedFlight = ref({});
    function showFlightDetails(event: MouseEvent, flight: FlightPlan) {
      selectedFlight.value = flight;
      movePopup(event.clientX, event.clientY, document.getElementsByClassName("flight-info")[0] as HTMLElement);
    }

    function showMarketplace(ship: Ship) {
      router.push("/trade/" + ship.id);
    }

    function capitalize(word: string) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    return {
      celestialBodies,
      selectLocation,
      selectedObject,
      ships,
      travel,
      selectedShip,
      loading,
      selectShip,
      getShipLocation,
      flightPlans,
      showFlightDetails,
      selectedFlight,
      counter,
      showMarketplace,
      capitalize,
      shipsTravelling
    };
  }
});
</script>

<style>
label {
  margin-right: 20px;
}
.PLANET {
  fill: violet;
  stroke: blueviolet;
}
.GAS_GIANT {
  fill: orange;
  stroke: yellow;
}
.ASTEROID {
  fill: lightgray;
  stroke: white;
}
.MOON {
  fill: lightblue;
  stroke: darkblue;
}
.WORMHOLE {
  fill: greenyellow;
  stroke: green;
}
.ship {
  fill: gray;
}
.Object {
  opacity: 0.9;
}
.Object:hover {
  opacity: 1;
  cursor: pointer;
}
#travelPath {
  stroke: white;
  stroke-dasharray: 5;
  animation: dash 20s linear infinite reverse;
}
.flightLine {
  stroke: gray;
  stroke-width: 3;
  stroke-dasharray: 10;
  animation: dash 40s linear infinite reverse;
}
.flightLine:hover {
  cursor: pointer;
}
.location-info {
  display: none;
  position: absolute;
  align-items: center;
  text-align: center;
  margin: 0;
}
.flight-info {
  display: none;
  position: absolute;
  margin: 0;
  padding: 10px;
}
select,
option {
  color: black;
  margin-left: 15px;
}

#ship-infos {
  margin: -10px;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  justify-content: center;
}

#ship-infos > * {
  margin: 10px;
}

.item-card.selected {
  border: #ff4400 1px solid;
}

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}
</style>
