<template>
  <div class="container" v-if="loading">
    <h1>Loading...</h1>
  </div>
  <div class="container" v-else>
    <svg width="1000" height="1000" id="map" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <svg
        v-for="(location, index) in celestialBodies"
        :key="index"
        :id="location.symbol"
        @click="e => handleLocationSelection(location, e)"
      >
        <path
          v-if="location.type === 'GAS_GIANT'"
          :class="location.type + ' Object'"
          :transform="`translate(${location.x * 5 + 500} ${500 - location.y * 5})`"
          d="m -19.89786,45.274201 -9.89119,-4.82282 16.39444,-2.35324 c 18.7492698,-2.69115 34.88494,-6.68355 47.61921,-11.78221 5.02411,-2.01166 8.82172,-2.71973 8.82172,-1.64502 0,1.03797 -3.84411,5.776 -8.54242,10.52894 -14.90646,15.0798 -36.0904302,19.00274 -54.40176,10.07435 z m -38.36451,-14.20221 c -16.0384,-4.37885 -24.5726,-14.24945 -20.887,-24.1576 1.06227,-2.85583 4.10546,-7.55898997 6.76263,-10.45141 5.39836,-5.87647 18.10021,-15.74941 20.26193,-15.74941 1.84164,0 -0.71453,8.27065 -5.27119,17.05501 -2.46862,4.75916 -3.17954,8.25787 -2.21575,10.90442 5.28049,14.50015 36.68368,17.70052 72.03683,7.34129 39.19825,-11.4858 57.86189,-32.11002 39.61329,-43.7745 -3.46196,-2.21294 -8.19168,-5.93847 -10.51062,-8.27907 -4.13944,-4.17821 -4.14862,-4.2661 -0.50435,-4.83215 5.50514,-0.855 25.6299,4.7292 30.79708,8.54546 2.47277,1.82628 5.54852,5.50044 6.83489,8.16466 2.01171,4.1664 1.85911,5.94565 -1.0902,12.71862 -7.42713,17.05542 -40.6388,35.14743 -77.59201023,42.26804 C -17.78351,34.246951 -46.193,34.367291 -58.26264,31.071851 Z m 15.88451,-15.0374 c -5.28199,-1.51854 -6.23829,-3.98826 -6.2493,-16.13944997 -0.0272,-28.72295003 26.60463,-53.26444003 53.7305298,-49.51515003 19.2550602,2.66132 36.7647902,17.07765 41.9036302,34.5006 2.00614,6.80148 1.86122,7.50541 -2.23949,10.87839 -13.83045,11.37615 -40.0161002,19.60593 -65.56457,20.60579 -9.89119,0.38735 -19.6026,0.23821 -21.5808,-0.33005 z"
        />

        <path
          v-else-if="location.type === 'WORMHOLE'"
          :class="location.type + ' Object'"
          :transform="`translate(${location.x * 5 + 500} ${500 - location.y * 5})`"
          d="m -12.960185,48.408971 c -0.82711,-1.51143 -1.1134,-4.94561 -0.67378,-8.08234 0.42044,-2.99978 0.43377,-5.45417 0.0296,-5.45417 -0.40411,0 -2.20167,1.12839 -3.99452,2.50761 -5.27625,4.0588 -6.416829,3.27633 -6.304475,-4.32512 0.05558,-3.75798 -0.330903,-7.25505 -0.858738,-7.77124 -0.527855,-0.51624 -3.249245,-0.34072 -6.047535,0.38953 -5.903443,1.541 -6.584901,0.15353 -2.911607,-5.92777 2.717829,-4.4995 2.024043,-5.21762 -3.534697,-3.65851 C -42.02525,17.424611 -50,17.752871 -50,16.611441 c 0,-0.38952 1.698772,-2.10576 3.775045,-3.81432 4.722816,-3.8864098 9.496722,-11.3025698 8.396415,-13.04368978 -0.456112,-0.72171 -2.626336,-2.02933002 -4.82274,-2.90581002 l -3.993464,-1.5936 3.771092,-1.47176 c 2.074098,-0.80948 5.373548,-2.04302 7.332109,-2.74128 l 3.561022,-1.2694702 -2.688921,-5.15459 c -1.478904,-2.83501 -2.440227,-5.39778 -2.136266,-5.69504 0.303961,-0.29712 2.112538,0.0379 4.019053,0.74839 4.217124,1.56801 5.950279,1.5936 8.326304,0.12273 1.553957,-0.96182 1.510531,-1.59203 -0.295482,-4.28758 -1.164453,-1.73804 -3.602796,-4.6129 -5.418534,-6.38866 -2.719404,-2.65944 -2.952882,-3.35936 -1.324502,-3.97047 1.770084,-0.66428 8.488102,-0.24736 15.424104,0.95728 1.69847,0.29522 2.67929,-0.37721 3.02106,-2.07084 0.77595,-3.84484 5.18528,-12.91043 6.73498,-13.84709 2.08626,-1.26094 7.20037,4.09339 9.78784,10.24762 1.26507,3.00892 2.68854,5.47289 3.16329,5.4755 0.47472,0.003 2.60732,-1.43059 4.73905,-3.18478 l 3.87588,-3.18947 0.87242,4.54788 c 0.74469,3.88209 1.27087,4.43828 3.59428,3.79935 1.49702,-0.4118 5.26484,-1.11181 8.37293,-1.55592 5.50183,-0.78616 5.62798,-0.72774 4.77683,2.2111 -2.8846,9.96003 -2.89847,9.91449 3.02291,9.91449 5.68564,0 5.85697,0.34072 3.26188,6.48628 -0.6173,1.46191 0.0189,2.55481 2.09814,3.60463 3.71212,1.8742302 8.75327,6.2977302 8.75327,7.6808302 0,0.56936 -2.59615,1.03523 -5.76923,1.03523 -3.17307,0 -5.76923,0.4445 -5.76923,0.9877 0,0.54325 1.70733,2.94116 3.79405,5.32864 4.63495,5.30306 4.76047,6.22162 0.85012,6.22162 -6.58137,0 -7.52963,6.8426298 -1.39333,10.0543298 3.72776,1.95109 2.0956,3.68714 -3.49569,3.71827 -4.20904,0.0237 -5.51631,1.706 -2.94616,3.79205 2.86099,2.32209 2.2985,4.04203 -0.79278,2.42412 -3.80452,-1.99128 -4.95901,-0.15211 -3.78396,6.02756 0.55726,2.93074 0.73414,5.32865 0.39307,5.32865 -0.34108,0 -2.59138,-1.69264 -5.00067,-3.76139 -5.57593,-4.78786 -7.75778,-4.73133 -12.09549,0.31323 l -3.50367,4.07486 -3.85724,-3.58492 c -3.76072,-3.49522 -6.62971,-3.60023 -6.62971,-0.24263 0,0.91658 -2.59245,4.23821 -5.761,7.38143 -5.54661,5.50223 -5.81451,5.6171 -7.19921,3.08679 z m 26.14241,-18.9886 c 18.7082,-7.66694 24.57312,-31.0404698 11.52846,-45.9444 -8.31799,-9.50354 -19.54032,-12.94644 -31.27968,-9.59637 -8.00523,2.28446 -15.686226,8.86475 -19.240189,16.4830302 -2.789776,5.98017 -3.091116,16.63343 -0.633221,22.3863398 2.614474,6.11945 9.70595,13.43449 15.534,16.0238 6.14235,2.72891 18.21979,3.05356 24.09063,0.6476 z m -18.51765,-2.27153 c -6.0029,-1.59801 -15.00049,-9.10932 -17.267271,-14.41494 -0.96594,-2.26086 -1.756254,-7.4502798 -1.756254,-11.5320198 0,-6.30416 0.627251,-8.3261 4.166665,-13.4312602 13.8782,-20.01763 45.49421,-12.6443 48.01027,11.1967002 0.82746,7.84066 -1.03358,14.3230998 -5.65351,19.6925898 -6.25522,7.27007 -18.21277,10.96124 -27.4999,8.48893 z"
        />
        <path
          v-else-if="location.type === 'PLANET'"
          :class="location.type + ' Object'"
          :transform="`translate(${location.x * 5 + 500} ${500 - location.y * 5})`"
          d="M -2.9030962,39.269063 C -6.8274322,36.731351 18.892656,26.561991 26.483145,27.650151 c 2.073832,0.297176 1.586824,0.968016 -3.052104,4.20368 -8.425969,5.8772 -22.55854517,9.856672 -26.3341372,7.415232 z M -17.65544,35.499599 c -2.552912,-1.347256 -5.675304,-3.45332 -6.938704,-4.68012 -2.269192,-2.20348 -2.219664,-2.23072 4.076504,-2.239432 8.034136,-0.0132 19.83725583,-1.86072 27.1537598,-4.255056 C 10.901576,22.929087 15.078064,19.818263 23.785145,11.551495 30.115801,5.5410068 36.432761,0.01187884 37.822817,-0.73547316 40.310441,-2.0729132 40.337201,-1.9954812 39.523785,4.1795508 37.968609,15.985655 33.062345,23.908775 27.306689,23.908775 c -6.625904,0 -21.7709212,4.832856 -29.3850492,9.377 -4.29772,2.564856 -8.5163438,4.6634 -9.3747518,4.6634 -0.858408,0 -3.649424,-1.102312 -6.202328,-2.449576 z M -32.692344,22.446231 c -5.066196,-7.783248 -8.87872,-22.87701616 -6.663806,-26.3821202 0.767286,-1.21424 2.975814,-1.267264 11.01107,-0.264 10.81888,1.350528 22.8923358,0.15698 28.61515183,-2.828648 1.68119997,-0.877136 6.85000797,-4.7046158 11.48625617,-8.5055598 4.6362,-3.800952 10.490065,-8.074183 13.008545,-9.496135 l 4.579064,-2.585336 2.443072,3.44664 c 3.413128,4.815175 7.007704,13.067263 7.03816,16.1575188 0.0176,1.783064 -1.888632,4.035016 -6.089152,7.19360004 C 29.372905,1.7110068 23.738529,6.7597588 20.215265,10.401551 c -3.523265,3.641792 -7.978361,7.600128 -9.900137,8.79628 -4.9894722,3.105472 -19.7955682,5.881136 -31.371544,5.881136 -9.005656,0 -10.080696,-0.243216 -11.635928,-2.63256 z m 31.5549758,-5.695192 c 8.676352,-4.142736 10.983672,-11.8760082 4.437312,-14.8723442 -7.621216,-3.488296 -24.5902398,0.02208 -28.9724638,5.99572 -2.213288,3.0163202 -2.262992,3.5177522 -0.637864,6.4351922 3.481,6.249016 14.882584,7.354824 25.1730158,2.441432 z M -20.55,15.374199 C -27.37068,11.907743 -21.969672,5.9490388 -10.350608,4.1217108 2.0690718,2.1684388 8.2775678,6.5899028 0.70618383,11.995967 -5.5552242,16.466655 -15.340472,18.021799 -20.55,15.374199 Z M 25.954321,0.93531084 c 2.80788,-3.58589604 3.154584,-8.88352804 0.71464,-10.91776804 -2.467952,-2.0575518 -8.329785,-0.4028638 -11.098393,3.132928 -2.819232,3.600408 -2.900584,4.868112 -0.530496,8.267304 2.5706,3.686808 7.831729,3.454248 10.914249,-0.48246396 z m -7.835553,-0.661248 c -0.768744,-0.7722 -1.397664,-2.00691204 -1.397664,-2.74373604 0,-1.922936 3.916897,-5.212504 6.206513,-5.212504 2.666392,0 2.544232,4.94412 -0.18356,7.42390404 C 20.201233,2.0534148 19.92192,2.0855668 18.11864,0.27406284 Z M -28.703016,-7.0811612 c -0.960936,-0.244984 -3.680872,-0.76136 -6.0444,-1.147864 l -4.297286,-0.70268 1.87459,-5.0808558 1.874544,-5.080904 11.740496,-0.576912 c 15.0483278,-0.739479 22.84223983,-3.629815 31.6883838,-11.751575 l 6.5613682,-6.024064 5.314169,2.980416 c 2.922776,1.639208 5.443632,3.465784 5.601936,4.059112 0.15848,0.59328 -2.706632,3.01336 -6.366489,5.377984 -3.659864,2.364576 -9.093104,6.455799 -12.0738962,9.091543 -2.980744,2.635752 -7.42355997,5.63964 -9.872848,6.6753198 -4.126392,1.744768 -21.8704718,3.232872 -26.0005678,2.18048 z M -32.1972,-22.632264 c 0,-4.458704 14.803464,-14.748616 23.9673518,-16.659696 6.80652,-1.41948 17.962624,-0.57192 17.962624,1.36468 0,2.011248 -7.42564,8.033008 -13.394304,10.862008 -7.8179518,3.70552 -28.5356718,6.924016 -28.5356718,4.433008 z"
        />
        <path
          v-else-if="location.type === 'ASTEROID'"
          :class="location.type + ' Object'"
          :transform="`translate(${location.x * 5 + 500} ${500 - location.y * 5})`"
          d="m -50,19.50157 c 0,-0.22112 3.61971,-3.12208 8.04373,-6.4471 8.92986,-6.71144 27.12801,-16.62679 37.19438,-20.26557 3.73665,-1.35068 6.54763,-3.17597 6.54763,-4.25158 0,-1.27588 -2.11519,-2.11552 -6.54763,-2.59912 l -6.54763,-0.7144 6.54763,-1.78478 c 3.60117,-0.98166 12.07888,-2.15703 18.83928,-2.61192 L 26.36904,-20 l -3.06546,5.24816 c -2.23811,3.83178 -3.06547,7.03598 -3.06547,11.87227 0,5.6179 0.60751,7.37252 3.99951,11.55104 l 3.99946,4.92687 -6.56171,3.49016 c -6.70106,3.56427 -8.876,3.83913 -5.63272,0.71187 2.75802,-2.65933 2.20041,-5.56019 -1.06879,-5.56019 -1.58578,0 -7.57822,1.85525 -13.31645,4.12284 -5.73826,2.26754 -10.63397,3.88953 -10.87937,3.60448 -0.24522,-0.2849 2.53274,-3.2214 6.17364,-6.5251 3.64085,-3.30368 6.61975,-6.4151 6.61975,-6.91427 0,-3.88714 -16.3883,-0.67164 -37.79762,7.41617 C -42.90178,17.2217 -50,19.72244 -50,19.50157 Z M 30.98812,10.47072 C 26.15802,7.63119 22.32058,-0.13748 23.0665,-5.56609 24.57962,-16.57755 36.66115,-22.755 44.16229,-16.35255 46.49278,-14.36349 50,-6.70036 50,-3.59757 c 0,4.70565 -3.85327,11.5286 -7.71235,13.65621 -4.74817,2.61772 -7.38421,2.71386 -11.29953,0.41192 z"
        />
        <path
          v-else
          :class="location.type + ' Object'"
          :transform="`translate(${location.x * 5 + 500} ${500 - location.y * 5})`"
          d="m -9.5121737,28.339384 C -28.324908,21.618044 -35.847687,0.12771362 -24.987689,-15.869556 c 4.506209,-6.63784 8.793578,-10.01695 15.8757483,-12.51255 C 10.627181,-35.337646 31.46167,-18.898066 29.91928,2.4157836 28.52672,21.659084 8.5499013,34.792524 -9.5121737,28.339384 Z m 16.229945,-9.08006 c 2.59235,-2.34502 2.38416,-6.15379 -0.41831,-7.65296 -1.26072,-0.67439 -4.93778,-1.26211 -8.17126,-1.30604 -9.9782333,-0.13549 -12.0377843,4.65956 -3.805524,8.86009 4.423964,2.25734 9.960164,2.30151 12.395094,0.0991 z m -12.260972,-2.98406 c -1.261992,-0.88355 -2.029052,-2.03579 -1.704568,-2.5606 0.786099,-1.27136 7.84183003,-1.21689 11.27298,0.0871 2.27295,0.8638 2.52485,1.30012 1.47828,2.5606 -1.65735,1.99611 -8.14426,1.94497 -11.046692,-0.0871 z M 23.734101,6.0448936 c 5.111519,-3.57867 1.04054,-8.64796 -6.94487,-8.64796 -5.25074,0 -9.2222497,2.21634002 -9.2222497,5.14656 0,4.32599 11.4479597,6.80534 16.1671197,3.5014 z m -12.06834,-2.53768 c -1.32717,-0.88761 -1.25721,-1.24511 0.51234,-2.61796998 3.35168,-2.60032002 12.1425,-0.41255 10.30214,2.56388998 -0.86275,1.39531 -8.75015,1.43476 -10.81448,0.0542 z M -7.3642957,0.90859362 c 2.058172,-2.05723002 2.025167,-2.81884002 -0.209754,-4.84050002 -3.9729663,-3.59389 -15.5998293,-3.00404 -15.5998293,0.79137 0,0.85893 0.922225,2.48353002 2.049387,3.61019002 2.597704,2.59655998 11.3231743,2.87488998 13.7601963,0.43894 z m -10.4299323,-1.49511 c -3.55377,-1.42779002 -2.733331,-3.04251002 1.537043,-3.02509002 4.411909,0.0194 6.9857253,1.28812 5.962801,2.94252002 -0.831419,1.34464 -4.26448,1.38246 -7.499844,0.0825 z M 8.7254213,-15.820476 c 2.3464097,-1.89914 2.3605597,-2.00555 0.53461,-4.0223 -2.49812,-2.75919 -8.96286997,-3.80126 -12.64331,-2.03807 -3.45246,1.65398 -4.295458,4.82026 -1.774007,6.66315 2.821637,2.06235 11.030347,1.70593 13.882707,-0.60278 z m -9.16202997,-0.92764 c -3.80959003,-0.37433 -3.99627003,-2.5498 -0.26564,-3.09582 2.95814997,-0.43295 7.24454997,0.61865 7.24454997,1.77735 0,1.18767 -2.84331,1.72483 -6.97889997,1.31847 z"
        />
      </svg>

      <svg
        v-for="ship in ships"
        :key="ship.id"
        :id="ship.id"
        @click="() => handleShipSelection(ship)"
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

    <div id="location-info" class="location-info item-card">
      <div>
        <h3>Name: {{ selectedObject?.name }}</h3>
        <h3>Type: {{ selectedObject?.type }}</h3>
      </div>

      <button :disabled="!(selectedShip && selectedObject)" @click="e => handleTravel(selectedShip, e)">
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
import CelestialBody from "@/interfaces/CelestialBody";
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import FlightPlan from "@/interfaces/FlightPlan";

export default defineComponent({
  setup() {
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

    /**
     * places the location info popup right next to the given coordinates
     */
    function movePopup(x: number, y: number, popUp: HTMLElement) {
      const grid = document.getElementsByClassName("container")[0] as HTMLElement;
      const locationInfo = popUp;
      locationInfo.style.left = String(x - grid.offsetLeft) + "px";
      locationInfo.style.top = String(y - grid.offsetTop) + "px";
      locationInfo.style.display = "block";
    }

    const selectedObject = ref<CelestialBody>();
    const selectedShip = ref<Ship>();

    function hidePopups() {
      const flightInfo = document.getElementById("flight-info");
      const locationInfo = document.getElementById("location-info");
      console.log({ flightInfo, locationInfo });
      if (flightInfo) flightInfo.style.display = "none";
      if (locationInfo) locationInfo.style.display = "none";
    }

    function handleLocationSelection(location: CelestialBody, event: MouseEvent) {
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

    function handleShipSelection(ship: Ship) {
      if (selectedShip.value?.id === ship.id) {
        selectedShip.value = undefined;
        document.getElementById("travelPath")?.remove();
        return;
      }
      selectedShip.value = ship;
      if (!selectedObject.value) return;
      showTravelLine(selectedShip.value.id, selectedObject.value.symbol);
    }

    async function handleTravel(ship: Ship) {
      if (!(selectedObject.value && selectedShip.value)) return;
      if (selectedObject.value.ships?.some(x => x.id === ship.id)) return;
      try {
        const flightplan = await createFlightPlan(ship.id, selectedObject.value.symbol);
        alert(
          `You are on your way to ${flightplan.destination}! \n
          Total travel duration: ${flightplan.timeRemainingInSeconds}`
        );
        document.getElementById("travelPath")?.remove();
        store.update();
      } catch (error) {
        alert((error as Error).message);
      }
      hidePopups();
    }

    const loading = ref<boolean>(true);
    const celestialBodies = ref<Array<CelestialBody>>([]);
    const ships = computed(() => store.state.userShips.filter(x => x.location));
    const shipsTravelling = computed(() => store.state.userShips.filter(x => x.flightPlanId));
    async function getLocations() {
      if (!selectedShip.value?.location) selectedShip.value = ships.value[0];
      const currentLocation = selectedShip.value?.location.split("-")[0] ?? "OE";
      celestialBodies.value = await getCelestialBodys(currentLocation);
      loading.value = false;
    }

    let interval = -1;
    const counter = ref(0);
    // eslint-disable-next-line
    const flightPlans = ref<Array<any>>([]);
    watch(shipsTravelling, async () => {
      console.log("watch: ", { shipsTravelling });
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

      if (!shipsTravelling.value.length) return;

      interval = setInterval(() => {
        console.log("tick");

        if (flightPlans.value.some(flight => flight.timeRemainingInSeconds <= counter.value)) {
          clearInterval(interval);
          hidePopups();
          flightPlans.value = [];
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
      if (ship.x && ship.y) return `${ship.x * 5 + 500} ${500 - ship.y * 5}`;
      if (!ship.flightPlanId) throw new Error("What is this bullshit");
    }

    const selectedFlight = ref({});
    function showFlightDetails(event: MouseEvent, flight: FlightPlan) {
      console.log("mouse enter");
      selectedFlight.value = flight;
      movePopup(event.clientX, event.clientY, document.getElementsByClassName("flight-info")[0] as HTMLElement);
    }

    function showMarketplace(ship: Ship) {
      router.push("/trade/" + ship.id);
    }

    return {
      celestialBodies,
      handleLocationSelection,
      selectedObject,
      ships,
      handleTravel,
      selectedShip,
      loading,
      handleShipSelection,
      getShipLocation,
      flightPlans,
      showFlightDetails,
      selectedFlight,
      counter,
      showMarketplace
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
  fill: red;
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
  backdrop-filter: blur(5px) brightness(0.8);
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

@keyframes dash {
  to {
    stroke-dashoffset: 1000;
  }
}
</style>
