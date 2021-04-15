export class Api {
  constructor(options) {
    this._serverUrl = options.baseUrl
    this._headers = options.headers
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
      .then(res => {
        console.log('До вставки============')
        console.log(res)
        console.log('newCardData============')
        console.log(newCardData)
      })
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
        console.log('res============')
        console.log(res)
        console.log('newCardData============')
        console.log(newCardData)
        return res.json()
      }
      // если ошибка, отклоняем промис
      return console.log(res)
      //   Promise.reject(`Ошибка: ${res.status}`)
    })
  }
}
