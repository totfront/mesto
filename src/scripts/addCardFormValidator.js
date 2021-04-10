// Валидиратор формы добавления карточек:
// Не понимаю, зачем он нужен (ревьюер попросил добавить).

import { FormValidator } from './FormValidator'

export class addCardFormValidator extends FormValidator {
  constructor(settings, formElement) {
    super(settings, formElement)
  }
  enableValidation = () => {
    const handleFormSubmit = event => {
      event.preventDefault()
    }
    this._formElement.addEventListener('submit', handleFormSubmit)
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    const submitBtn = this._formElement.querySelector(this._submitButtonSelector)
    const inputListIterator = inputElement => {
      const handleInput = () => {
        this._checkInputValidity(inputElement, this._errorClass)
        this._toggleButtonState(inputList, submitBtn)
      }
      inputElement.addEventListener('input', handleInput)
    }
    inputList.forEach(inputListIterator)
    this._toggleButtonState(inputList, submitBtn)
  }
  resetValidation = () => {
    const currentInputs = Array.from(this._formElement.getElementsByTagName('input'))
    currentInputs.forEach(input => {
      input.value = ''
    })
    const activeErrors = Array.from(this._formElement.getElementsByClassName('popup__input-error_active'))
    activeErrors.forEach(error => {
      error.classList.remove('popup__input-error_active')
    })
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    const submitBtn = this._formElement.querySelector(this._submitButtonSelector)
    // Если кнопка submit активна, то деактивировать её
    if (!submitBtn.classList.contains('popup__save-btn_inactive')) {
      this._toggleButtonState(inputList, submitBtn)
    }
  }
}
