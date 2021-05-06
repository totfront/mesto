// Контроллер запросов
export class Api {
  constructor(data) {
    this._url = data.url
    this._token = data.token
  }
  // 1. Получает карточки
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
  // 2. Получает данные пользователя
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(response => this._checkResponce(response))
  }
  // 3. Отправляет новую карточку
  addCard(card) {
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
        return response
      })
      .then(response => this._checkResponce(response))
  }
  // 4. Удаляет карточку
  removeCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(response => this._checkResponce(response))
  }
  // 5. Обновляет данные пользователя
  updUserData(profileData) {
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
        return response
      })
      .then(response => this._checkResponce(response))
  }
  // 6. Добавляет новый лайк
  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(response => this._checkResponce(response))
  }
  // 6. Удаляет лайк
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(response => this._checkResponce(response))
  }
  // 7. Меняет аватар на новый
  changeAvatar(newAvatarUrl) {
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
        return response
      })
      .then(response => this._checkResponce(response))
  }
  _checkResponce = response => {
    if (response.ok) {
      return response.json()
    } else {
      return `Ошибка ${response.status}`
    }
  }
}
