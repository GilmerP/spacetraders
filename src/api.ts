import { store } from "./store";

import Ship from "./interfaces/Ship";
import Good from "./interfaces/Good";
import Order from "./interfaces/Order";
import Loan from "./interfaces/Loan";
import CelestialBody from "./interfaces/CelestialBody";
import FlightPlan from "./interfaces/FlightPlan";
import User from "./interfaces/User";

const connectionString = "https://api.spacetraders.io";

const getUser = async (): Promise<User> => {
  const res = await fetch(`${connectionString}/users/${store.state.username}`, {
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error.message);
  }
  return data.user;
};

const fetchShips = async (): Promise<Array<Ship>> => {
  const response = await fetch(`${connectionString}/game/ships`, {
    headers: {
      Authorization: `Bearer ${store.state.token}`
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
    `${connectionString}/users/${store.state.username}/ships`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${store.state.token}`,
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
    `${connectionString}/users/${store.state.username}/ships`,
    {
      headers: {
        Authorization: `Bearer ${store.state.token}`
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
        Authorization: `Bearer ${store.state.token}`
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
    `${connectionString}/users/${store.state.username}/purchase-orders`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${store.state.token}`,
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
    `${connectionString}/users/${store.state.username}/sell-orders`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${store.state.token}`,
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
    `${connectionString}/game/loans?token=${store.state.token}`
  );
  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.loans;
};

const takeOutLoan = async (loanType: string): Promise<void> => {
  const response = await fetch(
    `${connectionString}/users/${store.state.username}/loans`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${store.state.token}`,
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
        Authorization: `Bearer ${store.state.token}`
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
    `${connectionString}/users/${store.state.username}/flight-plans`,
    {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${store.state.token}`,
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
        Authorization: `Bearer ${store.state.token}`
      }
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.flightPlans;
};

const getFlightById = async (flightPlanId: string): Promise<FlightPlan> => {
  const response = await fetch(
    `${connectionString}/my/flight-plans/${flightPlanId}`,
    {
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.flightPlan;
};

export {
  fetchShips,
  fetchUserShips,
  getLoans,
  takeOutLoan,
  getMarketplace,
  getUser,
  buyShip,
  createNewUser,
  placeOrder,
  getCelestialBodys,
  createFlightPlan,
  sellGood,
  getFlightsForSystem,
  getFlightById
};
