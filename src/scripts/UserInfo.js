// Управляет информацией профиля:
// 1. Получает информацию о текущем пользователе
// 2. Меняет её на новую

import { Api } from './Api.js'

export class UserInfo {
  constructor(data) {
    this._userNameSelector = data.nameSelector
    this._userDescriptionSelector = data.descriptionSelector
    this._userNameElement = document.querySelector(this._userNameSelector)
    this._userDescriptionElement = document.querySelector(this._userDescriptionSelector)
  }
  getUserInfo = () => {
    const currentUser = {}
    currentUser.name = this._userNameElement.textContent
    currentUser.description = this._userDescriptionElement.textContent
    return currentUser
  }
  setUserInfo = newProfileData => {
    // Первичное заполнение данных пользователя с сервера
    // if (!newProfileData) {
    //   fetch('https://mesto.nomoreparties.co/v1/cohort-22/users/me', {
    //     headers: {
    //       authorization: '72b79157-1952-43cd-9fd8-d3bec7029691'
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(updatedProfileData => {
    //       this._userNameElement.textContent = updatedProfileData.name
    //       this._userDescriptionElement.textContent = updatedProfileData.about
    //     })
    //   return
    // }
    this._userNameElement.textContent = newProfileData.name
    this._userDescriptionElement.textContent = newProfileData.description
  }
}
