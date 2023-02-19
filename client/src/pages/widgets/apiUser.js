const { USERS_URL } = require("constants/url");

export const getUser = async (id, token) => {
  const response = await fetch(USERS_URL + `${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};
