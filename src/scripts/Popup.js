export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._openedPopupSelector = 'popup_opened'
  }
  _handleEscClose = evt => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }
  getPopup = () => {
    return this._popup
  }
  setEventListeners = () => {
    this._popup.querySelector('.popup__close-pic').addEventListener('click', this.close)
  }
  // Открывает попап
  open = () => {
    this._popup.classList.add(this._openedPopupSelector)
    document.addEventListener('keydown', this._handleEscClose)
  }
  // Закрывает попап
  close = () => {
    this._popup.classList.remove(this._openedPopupSelector)
    document.removeEventListener('keydown', this._handleEscClose)
  }
}
