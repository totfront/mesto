export class Api {
  constructor(data) {
    this._url = data.url
    this._token = data.token
  }
  // Получает текущие карточки на сервере
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(`Ошибка ${response.status}`)
    })
  }
  // getCard(cardId) {
  //   return fetch(`${this._url}/cards/likes/${cardId}`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: this._token,
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(responce => (responce.ok ? Promise.resolve(responce) : Promise.reject(`Ошибка ${responce.status}`)))
  // }
  // Получает данные профиля
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(response => (response.ok ? Promise.resolve(response.json()) : Promise.reject(`Ошибка ${response.status}`)))
  }
  // Отправляет новую карточку на сервер
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
    }).then(response => (response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)))
  }
  // Удаляет карточку с сервера
  // removeCard(id) {
  //   return fetch(`${this._url}/messages/${id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this._token
  //     }
  //   }).then(response => (response.ok ? Promise.resolve('success') : Promise.reject(`Ошибка ${response.status}`)))
  // }
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
    }).then(responce => (responce.ok ? Promise.resolve(responce) : Promise.reject(`Ошибка ${responce.status}`)))
  }
  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(responce => (responce.ok ? Promise.resolve(responce) : Promise.reject(`Ошибка ${responce.status}`)))
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    }).then(responce => (responce.ok ? Promise.resolve(responce) : Promise.reject(`Ошибка ${responce.status}`)))
  }
  // TODO:
  // 1. Method to get like count
  // 3. Method to delete like
}
