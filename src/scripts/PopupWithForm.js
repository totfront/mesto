// Контроллер-родитель для попапов с формами
// 1. Получает текущие значения инпутов в формах
// 2. Открывает попап с формой
// 3. Закрывает попап с формой
// 4. Сбрасывает формы
// 5. Добавляет слушатели на попап и детей

import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm, resetForm) {
    super()
    this._popup = document.querySelector(popupSelector)
    this._handleSubmitForm = handleSubmitForm
    this._resetForm = resetForm
    this._currentForm = this._popup.querySelector('.popup__form')
  }
  // Возвращает объект с текущими значениями input
  _getInputValues = () => {
    const inputValues = {}
    inputValues.name = this._popup.querySelector('.popup__input_data_name').value
    inputValues.description = this._popup.querySelector('.popup__input_data_description').value
    return inputValues
  }
  // Добавляет обработичики
  setEventListeners() {
    console.log(123)
    this._popup.querySelector('.popup__close-pic').addEventListener('click', event => {
      this.close(event)
    })
    this._popup.querySelector('.popup__close-pic').addEventListener('click', () => {
      this._resetForm(this._currentForm)
      console.log(123)
    })
    this._popup.querySelector('.popup__form').addEventListener('submit', this._handleSubmitForm(this._getInputValues()))
    super.setEventListeners()
  }
  // Открывает попап
  open = () => {
    document.addEventListener('keydown', this._handleEscClose)
    this._popup.classList.add(this._openedPopupSelector)
    if (this._popup.id == 'profile-popup') {
      this._popup.querySelector('.popup__input_data_name').value = document.querySelector('.profile__name').textContent
      this._popup.querySelector('.popup__input_data_description').value = document.querySelector('.profile__description').textContent
    }
  }
  // Закрывает попап
  close(event) {
    if (event && event.target.classList.contains('popup__close-pic')) {
      this._popup.classList.remove(this._openedPopupSelector)
      return
    }
    this._reset()
    super.close()
  }
  // Обнуляет inputs
  _reset() {
    this._getInputValues().name = ''
    this._getInputValues().description = ''
  }
}
