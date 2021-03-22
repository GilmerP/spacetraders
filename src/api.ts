import useUser from "./Auth";
import { IShip, PurchaseInformation } from "./interfaces";
const connectionString = "https://api.spacetraders.io";

const { user, token } = useUser();

const getCurrentUser = async () => {
  const res = await fetch(`${connectionString}/users/${user.value}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  });
  const data = await res.json();
  return data;
};

const fetchShips = async (): Promise<Array<IShip> | string> => {
  const response = await fetch(`${connectionString}/game/ships`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  });
  const data = await response.json();
  return data.error ? data.error.message : (data.ships as Array<IShip>);
};

const buyShip = async (
  purchaseInformation: PurchaseInformation
): Promise<IShip | string> => {
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
  return data.error ? data.error.message : (data.ship as IShip);
};

const fetchUserShips = async () => {
  const response = await fetch(
    `${connectionString}/users/${user.value}/ships`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }
  );
  const data = await response.json();
  return data;
};

const getMarketplace = async (location: string) => {
  return await fetch(
    `${connectionString}/game/locations/${location}/marketplace`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }
  ).then(res => res.json());
};

const placeOrder = async (
  shipID: string,
  goodToOrder: string,
  quantityToOrder: number
) => {
  return fetch(`${connectionString}/users/${user.value}/purchase-orders`, {
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
  }).then(response => response.json());
};

const sellGood = async (
  shipID: string,
  goodToSell: string,
  quantityToSell: number
) => {
  return fetch(`${connectionString}/users/${user.value}/sell-orders`, {
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
  }).then(response => response.json());
};

const getLoans = async () => {
  const response = await fetch(
    `${connectionString}/game/loans?token=${token.value}`
  );
  return response.json();
};

const takeOutLoan = async (loanType: string) => {
  return fetch(`${connectionString}/users/${user.value}/loans`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ type: loanType })
  }).then(response => response.json());
};

const createNewUser = async (username: string) => {
  return fetch(`${connectionString}/users/${username}/token`, {
    method: "POST"
  }).then(response => response.json());
};

const getPlanets = async (systemName: string) => {
  return await fetch(
    `${connectionString}/game/systems/${systemName}/locations`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }
  ).then(res => res.json());
};

const createFlightPlan = async (shipID: string, destination: string) => {
  return fetch(`${connectionString}/users/${user.value}/flight-plans`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${token.value}`,
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ shipId: shipID, destination: destination })
  }).then(response => response.json());
};

const getFlightsForSystem = async (systemName: string) => {
  return await fetch(
    `${connectionString}/game/systems/${systemName}/flight-plans`,
    {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    }
  ).then(res => res.json());
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
  getPlanets,
  createFlightPlan,
  sellGood,
  getFlightsForSystem
};
