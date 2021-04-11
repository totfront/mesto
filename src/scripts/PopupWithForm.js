// Контроллер-родитель для попапов с формами
// 1. Получает текущие значения инпутов в формах
// 2. Открывает попап с формой
// 3. Закрывает попап с формой
// 4. Сбрасывает формы
// 5. Добавляет слушатели на попап и детей

import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector)
    this._handleSubmitForm = handleSubmitForm
    this._formElement = this._popup.querySelector('.popup__form')
  }
  // Возвращает объект с текущими значениями input
  _getInputValues = () => {
    // Слепок текущего состояния формы
    const formState = Array.from(this._formElement.getElementsByTagName('input')).map(inputElement => {
      return { name: inputElement.name, value: inputElement.value }
    })
    let currentFormValues = {}
    for (let index = 0; index < formState.length; index++) {
      currentFormValues = { ...currentFormValues, [formState[index].name]: formState[index].value }
    }
    return currentFormValues
  }
  // Добавляет обработичики
  setEventListeners() {
    this._formElement.addEventListener('submit', () => {
      this._handleSubmitForm()
    })
    super.setEventListeners()
  }
  // Закрывает попап и сбрасывает форму
  close() {
    // this.reset()
    super.close()
  }
  // Обнуляет inputs
  reset() {
    this._getInputValues().name = ''
    this._getInputValues().description = ''
  }
  //Обрабытывает кнопку submit в форме добавления карточек
  // const handleCardRenderForm = () => {
  //   popupAdd
  //     .getPopup()
  //     .querySelector('.popup__form')
  //     .addEventListener('submit', () => {
  //       popupAdd.close()
  //       renderCard()
  //     })
  // }
}
