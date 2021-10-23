import { store } from "../store";

import ApiObject from "../interfaces/ApiObject";
import Ship from "../interfaces/Ship";
import Good from "../interfaces/Good";
import Order from "../interfaces/Order";
import Loan from "../interfaces/Loan";
import CelestialBody from "../interfaces/CelestialBody";
import FlightPlan from "../interfaces/FlightPlan";
import User from "../interfaces/User";

const connectionString = "https://api.spacetraders.io";

async function request(request: RequestInfo) {
  const response = await fetch(request);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error.message);
  return data;
}

async function get(
  path: string,
  args: RequestInit = {
    method: "get",
    headers: { Authorization: `Bearer ${store.state.token}` }
  }
): Promise<ApiObject> {
  const data = await request(new Request(`${connectionString}/${path}`, args));
  return data;
}

async function post(
  path: string,
  body: string,
  args: RequestInit = {
    method: "post",
    headers: {
      Authorization: `Bearer ${store.state.token}`,
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: body
  }
): Promise<ApiObject> {
  const data = await request(new Request(`${connectionString}/${path}`, args));
  return data;
}

export const getUser = async (): Promise<User> => {
  const data = await get(`users/${store.state.username}`);
  return data.user;
};

export const fetchShips = async (): Promise<Array<Ship>> => {
  const data = await get(`game/ships`);
  return data.ships;
};

export const buyShip = async (location: string, type: string): Promise<Ship> => {
  const data = await post(
    `users/${store.state.username}/ships`,
    JSON.stringify({
      location: location,
      type: type
    })
  );
  return data.ship;
};

export const fetchUserShips = async (): Promise<Array<Ship>> => {
  const data = await get(`users/${store.state.username}/ships`);
  return data.ships;
};

export const getMarketplace = async (location: string): Promise<Array<Good>> => {
  const data = await get(`game/locations/${location}/marketplace`);
  return data.location.marketplace;
};

export const placeOrder = async (shipID: string, goodToOrder: string, quantityToOrder: number): Promise<Order> => {
  const data = await post(
    `users/${store.state.username}/purchase-orders`,
    JSON.stringify({
      shipId: shipID,
      good: goodToOrder,
      quantity: quantityToOrder
    })
  );

  return data.order;
};

export const sellGood = async (shipID: string, goodToSell: string, quantityToSell: number): Promise<Order> => {
  const data = await post(
    `users/${store.state.username}/sell-orders`,
    JSON.stringify({
      shipId: shipID,
      good: goodToSell,
      quantity: quantityToSell
    })
  );
  return data.order;
};

export const getLoans = async (): Promise<Array<Loan>> => {
  const data = await get(`game/loans`);
  return data.loans;
};

export const takeOutLoan = async (loanType: string): Promise<void> => {
  await post(`users/${store.state.username}/loans`, JSON.stringify({ type: loanType }));
};

/**
 * api mehtod for new user creation
 * @param username name of the user that will be created
 * @returns token that was created for the user
 */
export const createNewUser = async (username: string): Promise<string> => {
  const response = await fetch(`${connectionString}/users/${username}/token`, {
    method: "POST"
  });

  const data = await response.json();
  if (!response.ok) {
    throw Error(data.error.message);
  }
  return data.token;
};

export const getCelestialBodys = async (systemName: string): Promise<Array<CelestialBody>> => {
  const data = await get(`game/systems/${systemName}/locations`);
  return data.locations;
};

export const createFlightPlan = async (shipID: string, destination: string): Promise<FlightPlan> => {
  const data = await post(
    `users/${store.state.username}/flight-plans`,
    JSON.stringify({ shipId: shipID, destination: destination })
  );
  return data.flightPlan;
};

export const getFlightById = async (flightPlanId: string): Promise<FlightPlan> => {
  const data = await get(`my/flight-plans/${flightPlanId}`);
  return data.flightPlan;
};
