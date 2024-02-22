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
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    editProfile(inputValues) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
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
            headers: this._headers
        })
        .then(this._checkResponse)
    }
    togglelike(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
            })
            .then(this._checkResponse)
        } else {
            return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
            })
            .then(this._checkResponse)
        }   
    }
    updateAvatar(url) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(url),
        })
        .then(this._checkResponse)
    }
}
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: '5bdde285-08ff-4c09-bc6a-dd3c3893d978',
      'Content-Type': 'application/json'
    }
});
export default api;