import { IShip } from "./interfaces";
const connectionString = "https://api.spacetraders.io";

const getUser = async (username: string) => {
  const res = await fetch(
    `https://api.spacetraders.io/users/${username}?token=${process.env.VUE_APP_TOKEN}`
  );
  return await res.json();
};

const fetchShips = async () => {
  const data = await fetch(`${connectionString}/game/ships`, {
    headers: {
      Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));
  return data;
};

const buyShip = async (ship: IShip) => {
  if (ship) {
    return await fetch(`https://api.spacetraders.io/users/gilli/ships`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        location: ship.purchaseLocations[0].location,
        type: ship.type
      })
    }).then(res => res.json());
  }
};

const fetchUserShips = async () => {
  const data = await fetch(`${connectionString}/users/gilli/ships`, {
    headers: {
      Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`
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
        Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`
      }
    }
  ).then(res => res.json());
};

const getLoans = async () => {
  const response = await fetch(
    `${connectionString}/game/loans?token=${process.env.VUE_APP_TOKEN}`
  );
  return response.json();
};

const takeOutLoan = async (loanType: string) => {
  return fetch(`${connectionString}/users/gilli/loans`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ type: loanType })
  }).then(response => response.json());
};

export {
  fetchShips,
  fetchUserShips,
  getLoans,
  takeOutLoan,
  getMarketplace,
  getUser,
  buyShip
};
