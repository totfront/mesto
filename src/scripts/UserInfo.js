export class UserInfo {
  constructor(data) {
    this._userNameSelector = data.nameSelector
    this._userDescriptionSelector = data.descriptionSelector
    this._userName = document.querySelector(this._userNameSelector).textContent
    this._userDescription = document.querySelector(this._userDescriptionSelector).textContent
  }
  getUserInfo = () => {
    const currentUser = {}
    currentUser.name = this._userName
    currentUser.description = this._userDescription
    return currentUser
  }
  setUserInfo = newProfileData => {
    this._userName = newProfileData.name
    this._userDescription = newProfileData.description
  }
}
