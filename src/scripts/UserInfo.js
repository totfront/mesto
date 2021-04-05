export class UserInfo {
  constructor(data) {
    this._userNameSelector = data.nameSelector
    this._userDescriptionSelector = data.descriptionSelector
    this._userName = document.querySelector(this._userNameSelector).textContent
    this._userDescription = document.querySelector(this._userDescriptionSelector).textContent
  }
  getUserInfo = () => {
    let currentUser = {}
    currentUser.name = this._userName
    currentUser.description = this._userDescription
    return currentUser
  }
  setUserInfo = newProfileData => {
    const currentUserName = document.querySelector(this._userNameSelector)
    const currentUserDescription = document.querySelector(this._userDescriptionSelector)
    currentUserName.textContent = newProfileData.name
    currentUserDescription.textContent = newProfileData.description
  }
}
