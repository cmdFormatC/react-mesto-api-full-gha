export const BASE_URL = 'https://api.vtelegram.nomoredomainswork.ru';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
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
};
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .catch(err => {return Promise.reject(`Ошибка: ${err.status}`)})
};
export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}