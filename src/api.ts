import useUser from "./Auth";
import Ship from "./interfaces/Ship";
import Good from "./interfaces/Good";
import Order from "./interfaces/Order";
import Loan from "./interfaces/Loan";
import CelestialBody from "./interfaces/CelestialBody";
import FlightPlan from "./interfaces/FlightPlan";

const connectionString = "https://api.spacetraders.io";
const { user, token, logout } = useUser();

const getCurrentUser = async () => {
  const res = await fetch(`${connectionString}/users/${user.value}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    logout();
    throw new Error(data.error.message);
  }
  return data;
};

const fetchShips = async (): Promise<Array<Ship>> => {
  const response = await fetch(`${connectionString}/game/ships`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  });

  const data = await response.json();
  if (data.error) {
    throw Error(data.error.message);
  }
  return data.ships;
};

const buyShip = async (purchaseInformation: Ship): Promise<Ship> => {
  const response = await fetch(
    `${connectionString}/users/${user.value}/ships`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        location: purchaseInformation.location,
        type: purchaseInformation.type
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.ship;
};

const fetchUserShips = async (): Promise<Array<Ship>> => {
  const response = await fetch(
    `${connectionString}/users/${user.value}/ships`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.ships;
};

const getMarketplace = async (location: string): Promise<Array<Good>> => {
  const response = await fetch(
    `${connectionString}/game/locations/${location}/marketplace`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }

  return data.location.marketplace;
};

const placeOrder = async (
  shipID: string,
  goodToOrder: string,
  quantityToOrder: number
): Promise<Order> => {
  const response = await fetch(
    `${connectionString}/users/${user.value}/purchase-orders`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        shipId: shipID,
        good: goodToOrder,
        quantity: quantityToOrder
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }

  return data.order;
};

const sellGood = async (
  shipID: string,
  goodToSell: string,
  quantityToSell: number
): Promise<Order> => {
  const response = await fetch(
    `${connectionString}/users/${user.value}/sell-orders`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        shipId: shipID,
        good: goodToSell,
        quantity: quantityToSell
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.order;
};

const getLoans = async (): Promise<Array<Loan>> => {
  const response = await fetch(
    `${connectionString}/game/loans?token=${token.value}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.loans;
};

const takeOutLoan = async (loanType: string): Promise<void> => {
  const response = await fetch(
    `${connectionString}/users/${user.value}/loans`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({ type: loanType })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
};

const createNewUser = async (username: string): Promise<string> => {
  const response = await fetch(`${connectionString}/users/${username}/token`, {
    method: "POST"
  });

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.token;
};

const getCelestialBodys = async (
  systemName: string
): Promise<Array<CelestialBody>> => {
  const response = await fetch(
    `${connectionString}/game/systems/${systemName}/locations`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.locations;
};

const createFlightPlan = async (
  shipID: string,
  destination: string
): Promise<FlightPlan> => {
  const response = await fetch(
    `${connectionString}/users/${user.value}/flight-plans`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({ shipId: shipID, destination: destination })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.flightPlan;
};

const getFlightsForSystem = async (
  systemName: string
): Promise<Array<FlightPlan>> => {
  const response = await fetch(
    `${connectionString}/game/systems/${systemName}/flight-plans`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  console.log(data);
  return data.flightPlans;
};

export {
  fetchShips,
  fetchUserShips,
  getLoans,
  takeOutLoan,
  getMarketplace,
  getCurrentUser,
  buyShip,
  createNewUser,
  placeOrder,
  getCelestialBodys,
  createFlightPlan,
  sellGood,
  getFlightsForSystem
};
