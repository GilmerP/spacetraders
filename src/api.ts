const connectionString = "https://api.spacetraders.io";

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

export { fetchShips, fetchUserShips };
