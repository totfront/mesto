export class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileNameSelector = profileNameSelector
    this._profileDescriptionSelector = profileDescriptionSelector
  }

  getUserInfo = item => {
    console.log(item)
  }
  setUserInfo = () => {}
}
