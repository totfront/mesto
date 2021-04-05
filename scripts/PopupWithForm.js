import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super()
    this._popup = document.querySelector(popupSelector)
    this._handleSubmitForm = handleSubmitForm
  }
  _getInputValues = () => {
    const popup = this._popup
    const inputList = Array.from(popup.getElementsByTagName('input'))
    return inputList
  }
  setEventListeners = () => {
    document.addEventListener('keydown', this._handleEscClose)
    this._popup.querySelector('.popup__close-pic').addEventListener('click', event => {
      this.close(event)
    })
    this._popup.querySelector('.popup__form').addEventListener('submit', this._handleSubmitForm)
  }
  close = event => {
    if (event.target.classList.contains('popup__close-pic')) {
      this._popup.classList.remove(this._openedPopupSelector)
      return
    }
    console.log(123)
    this._popup.classList.remove(this._openedPopupSelector)
    document.removeEventListener('keydown', this._handleEscClose)
    this._getInputValues().forEach(input => {
      input.value = ''
    })
  }
}
