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
    }).then(res => {
      document.querySelector('#profile-editor').querySelector('.popup__save-btn').textContent = 'Сохранение...'
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }
  // Отправляет лайк на сервер
  postLike(cardId, cardName, personalId) {
    // Если карточка новая и у неё пока нет Id
    if (!cardId) {
      const cardApiUrl = this._serverUrl.slice(0, -6)
      fetch(cardApiUrl, {
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
        .then(res => {
          res.forEach(rederedCard => {
            if (rederedCard.name === cardName && rederedCard.owner._id === personalId) {
              fetch(`${this._serverUrl}/${rederedCard._id}`, {
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
              return
            }
          })
        })
      return
    }
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
  deleteLike(cardId, cardName, personalId) {
    if (!cardId) {
      const cardApiUrl = this._serverUrl.slice(0, -6)
      fetch(cardApiUrl, {
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
        .then(res => {
          res.forEach(rederedCard => {
            if (rederedCard.name === cardName && rederedCard.owner._id === personalId) {
              return fetch(`${this._serverUrl}/${rederedCard._id}`, {
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
          })
        })
      return
    }
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
        document.querySelector('#card-popup').querySelector('.popup__save-btn').textContent = 'Сохранение...'
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
          document.querySelector('#avatar-upd').querySelector('.popup__save-btn').textContent = 'Сохранение...'
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
}
