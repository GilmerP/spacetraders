import useUser from "./Auth";
import { IShip } from "./interfaces";
const connectionString = "https://api.spacetraders.io";

const { user, token, getUserInfo } = useUser();

const getCurrentUser = async () => {
  getUserInfo();
  const res = await fetch(
    `https://api.spacetraders.io/users/${user.value}?token=${token.value}`
  );
  return await res.json();
};

const fetchShips = async () => {
  const data = await fetch(`${connectionString}/game/ships`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
  return data;
};

const buyShip = async (ship: IShip) => {
  if (ship) {
    return await fetch(
      `https://api.spacetraders.io/users/${user.value}/ships`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          location: ship.purchaseLocations[0].location,
          type: ship.type
        })
      }
    ).then(res => res.json());
  }
};

const fetchUserShips = async () => {
  const data = await fetch(`${connectionString}/users/${user.value}/ships`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
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

export {
  fetchShips,
  fetchUserShips,
  getLoans,
  takeOutLoan,
  getMarketplace,
  getCurrentUser,
  buyShip,
  createNewUser,
  placeOrder
};
