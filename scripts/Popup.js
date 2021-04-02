const openedPopupSelector = 'popup_opened'

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
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
    document.addEventListener('keydown', this._handleEscClose)
    this._popup.querySelector('.popup__close-pic').addEventListener('click', this.close)
  }

  // Открывает попап
  open = () => {
    this._popup.classList.add(openedPopupSelector)
  }
  // Закрывает попап
  close = () => {
    this._popup.classList.remove(openedPopupSelector)
    document.removeEventListener('keydown', this._handleEscClose)
  }
}
