export class Api {
  constructor(data) {
    this._url = data.url
    this._token = data.token
  }
  // Получает текущие карточки на сервере
  getCards() {
    return fetch(`${this._url}/cards`, {
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
  // Отправляет новую карточку на сервер
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      // TODO:
      // Проверить имя ключа на сервере
      body: JSON.stringify({
        user: data.name,
        link: data.url
      })
    }).then(response => (response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`)))
  }
  // Удаляет карточку с сервера
  removeCard(id) {
    return fetch(`${this._url}/messages/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(response => (response.ok ? Promise.resolve('success') : Promise.reject(`Ошибка ${response.status}`)))
  }
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(response => (response.ok ? Promise.resolve(response.json()) : Promise.reject(`Ошибка ${response.status}`)))
  }
  // TODO:
  // 1. Method to get like count
  // 2. Method to add new like
  // 3. Method to delete like
  // 4. Method to get user data
  // 5. Method to patch user data
}
