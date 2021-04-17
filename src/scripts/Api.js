export class Api {
  constructor(options) {
    this._serverUrl = options.baseUrl
    this._headers = options.headers
    if (options.formSelector) {
      this._formSelector = options.formSelector
    }
  }
  getInitialCards() {
    return fetch(this._serverUrl, {
      headers: {
        authorization: this._headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  getInitialProfileData() {
    return fetch(this._serverUrl, {
      headers: {
        authorization: this._headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  updateProfileInfo(profileElements, newProfileData) {
    // Первичное заполнение данных профиля с сервера
    if (!newProfileData) {
      fetch(this._serverUrl, {
        headers: {
          authorization: this._headers.authorization
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`)
        })
        .then(profileData => {
          profileElements.profileNameElement.textContent = profileData.name
          profileElements.profileDescriptionElement.textContent = profileData.about
          profileElements.avatarElement.style.backgroundImage = `url("${profileData.avatar}")`
        })
      return
    }
    // Обновляет данные профиля на сервере
    fetch(this._serverUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileElements.profileNameElement.textContent,
        about: profileElements.profileDescriptionElement.textContent
      })
    })
  }
  // Отправляет лайк на сервер
  postLike(cardId) {
    fetch(`${this._serverUrl}/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization
      },
      'Content-Type': 'application/json'
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  // Удаляет лайк на сервере
  deleteLike(cardId) {
    return fetch(`${this._serverUrl}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  // Отправляет новую карточку на сервер
  postNewCard(newCardData) {
    fetch(this._serverUrl, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then(res => {})
    return fetch(this._serverUrl, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newCardData.name,
        link: newCardData.url
      })
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  // Удаляет свою карточку на сервере
  deleteCard(cardId) {
    return fetch(`${this._serverUrl}/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  // Обновляет аватар на сервере
  updateAvatarImage(url) {
    fetch(this._serverUrl, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: url
      })
    })
      // Записать изменение кнопки здесь
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
}
