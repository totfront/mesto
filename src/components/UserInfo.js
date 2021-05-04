// Управляет информацией профиля:
// 1. Получает информацию о текущем пользователе
// 2. Меняет её на новую

export class UserInfo {
  constructor(data) {
    this._userNameElement = document.querySelector(data.nameSelector)
    this._userDescriptionElement = document.querySelector(data.descriptionSelector)
    this._avatarElement = document.querySelector(data.avatarSelector)
  }
  getUserInfo = () => {
    const currentUser = {}
    currentUser.name = this._userNameElement.textContent
    currentUser.description = this._userDescriptionElement.textContent
    return currentUser
  }
  setUserInfo = newProfileData => {
    this._userNameElement.textContent = newProfileData.name
    this._userDescriptionElement.textContent = newProfileData.description
  }
  setUserAvatar = userData => {
    this._avatarElement.style.backgroundImage = `url(${userData.avatar})`
    const newProfileData = {
      name: userData.name,
      description: userData.about
    }
    this.setUserInfo(newProfileData)
  }
}
