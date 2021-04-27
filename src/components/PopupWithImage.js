// Контроллер-ребенок попапа с картинкой:
// 1. Наполняет попап данными
// 2. Открывает попап

import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
  open(name, link) {
    const overviewCaption = this._popup.querySelector('.overview__caption')
    const overviewPic = this._popup.querySelector('.overview__pic')
    overviewCaption.textContent = name
    overviewPic.alt = name
    overviewPic.src = link
    super.open()
  }
}
