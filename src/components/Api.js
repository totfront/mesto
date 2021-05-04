export class Api {
  constructor(data) {
    this._url = data.url
    this._token = data.token
  }
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(response => {
      return this._checkResponce(response)
    })
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(response => this._checkResponce(response))
  }
  addCard(card, cardRenderForm) {
    this._changeSubmitBtnText(cardRenderForm)
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.url
      })
    })
      .then(response => {
        this._changeSubmitBtnText(cardRenderForm)
        return response
      })
      .then(response => this._checkResponce(response))
  }
  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(response => this._checkResponce(response))
  }
  updUserData(profileData, profileEditorForm) {
    this._changeSubmitBtnText(profileEditorForm)
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.description
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        this._changeSubmitBtnText(profileEditorForm)
        return response
      })
      .then(response => this._checkResponce(response))
  }
  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(response => this._checkResponce(response))
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(response => this._checkResponce(response))
  }
  changeAvatar(newAvatarUrl, changeAvatarForm) {
    this._changeSubmitBtnText(changeAvatarForm)
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: newAvatarUrl
      }),
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        this._changeSubmitBtnText(changeAvatarForm)
        return response
      })
      .then(response => this._checkResponce(response))
  }
  _changeSubmitBtnText = formElement => {
    const submitBtnElement = formElement.querySelector('.popup__save-btn')
    if (submitBtnElement.textContent == 'Сохранение...') {
      submitBtnElement.textContent = 'Сохранить'
    } else {
      submitBtnElement.textContent = 'Сохранение...'
    }
  }
  _checkResponce = response => {
    if (response.ok) {
      return response.json()
    } else {
      return `Ошибка ${response.status}`
    }
  }
}
