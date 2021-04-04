import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super()
    this._popup = document.querySelector('.' + popupSelector)
  }
  open = () => {
    const overviewCaption = document.querySelector('.overview__caption')
    const overviewPic = document.querySelector('.overview__pic')
    overviewCaption.textContent = name
    overviewPic.src = link
    this._popup.classList.add(this._openedPopupSelector)
  }
}
