// Валидирует формы:
// 1. Показывает ошибки
// 2. Скрывает ошибки
// 3. Меняет состояние кнопки с активного на дизейблед
// 4. Меняет сообщения на катомные
// 5. Проверяет поля на ошибки
// 6. Включает валидацию и добавляет слушатели

export class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector
    this._inputSelector = settings.inputSelector
    this._submitButtonSelector = settings.submitButtonSelector
    this._inactiveButtonClass = settings.inactiveButtonClass
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass
    this._formElement = formElement
    this.resetValidation = this.resetValidation.bind(this)
  }
  // Показывает ошибку ввода
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }
  // Скрывает ошибку ввода
  _hideInputError = inputElement => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = ''
    errorElement.classList.remove(this._errorClass)
  }
  // Меняет состояние кнопки
  _toggleButtonState = (inputList, buttonElement) => {
    const findTheOneNotValid = inputElement => {
      return !inputElement.validity.valid
    }
    const notValidInput = inputList.find(findTheOneNotValid)
    if (notValidInput) {
      buttonElement.setAttribute('disabled', true)
      buttonElement.classList.add(this._inactiveButtonClass)
      notValidInput.classList.add(this._inputErrorClass)
    } else {
      buttonElement.removeAttribute('disabled')
      buttonElement.classList.remove(this._inactiveButtonClass)
    }
  }
  // Меняет сообщения с ошибкой на кастомные
  _getErrorMessage = inputElement => {
    const defaultErrorHandler = inputElement => inputElement.validationMessage
    const multyErrorHandler = inputElement => {
      if (inputElement.validity.typeMismatch) {
        return 'Введите адрес сайта.'
      }
      if (inputElement.validity.valueMissing) {
        return 'Вы пропустили это поле.'
      }
      if (inputElement.validity.tooShort) {
        const minInputValue = inputElement.getAttribute('minlength')
        return `Минимальное количество символов: ${minInputValue}. Длина текста сейчас: ${inputElement.value.length} символ `
      }
    }
    const errorHandlers = {
      name: multyErrorHandler,
      description: multyErrorHandler,
      url: multyErrorHandler,
      DEFAULT: defaultErrorHandler
    }
    const errorHandler = errorHandlers[inputElement.name] || errorHandlers.DEFAULT
    return errorHandler(inputElement)
  }
  // Проверяет поля для ввода на валидность
  _checkInputValidity = inputElement => {
    const isInputNotValid = !inputElement.validity.valid
    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(inputElement)
      this._showInputError(inputElement, errorMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }
  // Включает валидацию и добавляет слушатели событий всем интерактивным элементам
  enableValidation = () => {
    // const handleFormSubmit = event => {
    //   event.preventDefault()
    // }
    // this._formElement.addEventListener('submit', handleFormSubmit)
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
