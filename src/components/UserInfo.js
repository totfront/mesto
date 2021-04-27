// Управляет информацией профиля:
// 1. Получает информацию о текущем пользователе
// 2. Меняет её на новую

export class UserInfo {
  constructor(data) {
    this._userNameSelector = data.nameSelector
    this._userDescriptionSelector = data.descriptionSelector
    this._userName = document.querySelector(this._userNameSelector)
    this._userDescription = document.querySelector(this._userDescriptionSelector)
  }
  getUserInfo = () => {
    const currentUser = {}
    currentUser.name = this._userName.textContent
    currentUser.description = this._userDescription.textContent
    return currentUser
  }
  setUserInfo = newProfileData => {
    this._userName.textContent = newProfileData.name
    this._userDescription.textContent = newProfileData.description
  }
}
