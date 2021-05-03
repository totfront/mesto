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
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(`Ошибка ${response.status}`)
      })
      .catch(err => {
        console.log(err + ':' + 'Ошибка при получении карточек')
      })
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(response => (response.ok ? Promise.resolve(response.json()) : Promise.reject(`Ошибка ${response.status}`)))
      .catch(err => {
        console.log(err + ':' + 'Ошибка при получении данных пользователя')
      })
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
      .then(responce => {
        this._changeSubmitBtnText(cardRenderForm)
        return responce
      })
      .then(response => (response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)))
      .catch(err => {
        console.log(err + ':' + 'Ошибка при добавлении карточки')
      })
  }
  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(response => (response.ok ? Promise.resolve('success') : Promise.reject(`Ошибка ${response.status}`)))
      .catch(err => {
        console.log(err + ':' + 'Ошибка при удалении карточки')
      })
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
      .then(responce => {
        this._changeSubmitBtnText(profileEditorForm)
        return responce
      })
      .then(responce => (responce.ok ? Promise.resolve(responce) : Promise.reject(`Ошибка ${responce.status}`)))
      .catch(err => {
        console.log(err + ':' + 'Ошибка при обновлении данных пользователя')
      })
  }
  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(responce => (responce.ok ? Promise.resolve(responce) : Promise.reject(`Ошибка ${responce.status}`)))
      .catch(err => {
        console.log(err + ':' + 'Ошибка при добавлении лайка')
      })
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
      .then(responce => (responce.ok ? Promise.resolve(responce) : Promise.reject(`Ошибка ${responce.status}`)))
      .catch(err => {
        console.log(err + ':' + 'Ошибка при удалении лайка')
      })
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
      .then(responce => {
        this._changeSubmitBtnText(changeAvatarForm)
        return responce
      })
      .then(responce => (responce.ok ? Promise.resolve(responce) : Promise.reject(`Ошибка ${responce.status}`)))
      .catch(err => {
        console.log(err + ':' + 'Ошибка при смене аватара')
      })
  }
  _changeSubmitBtnText = formElement => {
    const submitBtnElement = formElement.querySelector('.popup__save-btn')
    if (submitBtnElement.textContent == 'Сохранение...') {
      submitBtnElement.textContent = 'Сохранить'
    } else {
      submitBtnElement.textContent = 'Сохранение...'
    }
  }
}
