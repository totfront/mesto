import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, resetForm) {
    super()
    this._popup = document.querySelector(popupSelector)
    this._handleSubmitForm = handleSubmitForm
    this._resetForm = resetForm
  }
  _getInputValues = () => {
    const popup = this._popup
    const inputList = Array.from(popup.getElementsByTagName('input'))
    return inputList
  }
  setEventListeners() {
    this._popup.querySelector('.popup__close-pic').addEventListener('click', event => {
      this.close(event)
    })
    super.setEventListeners()
    this._popup.querySelector('.popup__close-pic').addEventListener('click', this._resetForm(this._popup.querySelector('.popup__form')))
    this._popup.querySelector('.popup__form').addEventListener('submit', this._handleSubmitForm)
  }
  close(event) {
    if (event && event.target.classList.contains('popup__close-pic')) {
      this._popup.classList.remove(this._openedPopupSelector)
      return
    }
    super.close()
    this._reset()
  }
  _reset() {
    this._getInputValues().forEach(input => {
      input.value = ''
    })
  }
  open = () => {
    document.addEventListener('keydown', this._handleEscClose)
    this._popup.classList.add(this._openedPopupSelector)
    if (this._popup.id == 'profile-popup') {
      this._popup.querySelector('.popup__input_data_name').value = document.querySelector('.profile__name').textContent
      this._popup.querySelector('.popup__input_data_description').value = document.querySelector('.profile__description').textContent
    }
  }
}
