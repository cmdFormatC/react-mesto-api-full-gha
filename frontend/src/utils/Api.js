class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo () {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    editProfile(inputValues) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
              name: `${inputValues.name}`,
              about: `${inputValues.about}`
            })
          })
          .then(this._checkResponse); 
    }
    addCard(inputValues) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: inputValues.name,
                link: inputValues.link
              }),
        })
        .then(this._checkResponse)
    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    togglelike(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: this._headers,
            })
            .then(this._checkResponse)
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers
            })
            .then(this._checkResponse)
        }   
    }
    updateAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify(url),
        })
        .then(this._checkResponse)
    }
}
const api = new Api({
    baseUrl: 'https://api.vtelegram.nomoredomainswork.ru',
    headers: {
      'Content-Type': 'application/json'
    }
});
export default api;