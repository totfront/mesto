// Контроллер-родитель всех попапов:
// 1. Получает любой попап
// 2. Открывает любой попап
// 3. Закрывает любой попап
// 4. Добавляет слушатели на попап и детей

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._openedPopupSelector = 'popup_opened'
    this._closePicBtnSelector = '.popup__close-pic'
  }
  _handleEscClose = evt => {
    if (evt.key === 'Escape') {
      this.close()
    }
  }
  getPopup() {
    return this._popup
  }
  // Скывает попапы по клику на затемнение
  _handleOverlayClick() {
    this._popup.addEventListener('click', event => {
      if (event.target.classList.contains('popup_opened')) {
        this.close()
      }
    })
  }
  // Добавляет обработчики событий
  setEventListeners() {
    this._popup.querySelector(this._closePicBtnSelector).addEventListener('click', this.close)
    this._handleOverlayClick()
  }
  // Открывает попап
  open() {
    this._popup.classList.add(this._openedPopupSelector)
    document.addEventListener('keydown', this._handleEscClose)
  }
  // Закрывает попап
  close() {
    this._popup.classList.remove(this._openedPopupSelector)
    document.removeEventListener('keydown', this._handleEscClose)
  }
}
