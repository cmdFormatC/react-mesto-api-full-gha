export const BASE_URL = 'https://api.vtelegram.nomoredomainswork.ru';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response) => {
    console.log(response)
    if (!response.ok) {
      throw new Error("Bad Request");
    }
    return response.json();
  })
  .then((res) => {
    return res;
  })
};
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response => {
    console.log(response)
    return response.json()}))
  .catch(err => console.log(err))
};
export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => data)
}