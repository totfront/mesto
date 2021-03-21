import { hidePopup, profileName, nameInput, profileDescription, descriptionInput } from './index.js'
import { Card } from './Card.js'

const popupEdit = document.querySelector('#profile-popup')
const editForm = popupEdit.querySelector('.popup__form')
const popupAdd = document.querySelector('#card-popup')
const cardRenderForm = document.querySelector('#card-renderer')
const profileEditorForm = document.querySelector('#profile-editor')

const settings = {
  formSelector: 'form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active'
}

class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector
    this._inputSelector = settings.inputSelector
    this._submitButtonSelector = settings.submitButtonSelector
    this._inactiveButtonClass = settings.inactiveButtonClass
    this._inputErrorClass = settings.inputErrorClass
    this._errorClass = settings.errorClass
    this._formElement = formElement
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
    editForm.addEventListener('submit', evt => {
      this._editFormSubmitHandler(evt)
    })
    popupAdd.querySelector('.popup__form').addEventListener('submit', evt => {
      this.addFormSubmitHandler(evt)
    })
  }
  // Обработчик формы добавления карточек
  addFormSubmitHandler(evt) {
    evt.preventDefault()
    hidePopup(popupAdd)
  }
  // Обработчик формы редакторования профиля
  _editFormSubmitHandler(evt) {
    evt.preventDefault()
    hidePopup(popupEdit)
  }
}

class FormCardRender extends FormValidator {
  _addFormSubmitHandler(evt) {
    super.addFormSubmitHandler(evt)
    const newCard = {}
    const popupAddCardDescription = popupAdd.querySelector('.popup__input_data_description')
    const popupAddCardName = popupAdd.querySelector('.popup__input_data_name')
    newCard.name = popupAddCardName.value
    newCard.link = popupAddCardDescription.value
    new Card(newCard, '#template').renderCard(newCard)
    popupAddCardName.value = ''
    popupAddCardDescription.value = ''
  }

  enableValidation() {
    super.enableValidation()
    this._editFormSubmitHandler(evt)
  }
}

class FormEditProfile extends FormValidator {
  _editFormSubmitHandler(evt) {
    super._editFormSubmitHandler(evt)
    profileName.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
  }

  enableValidation() {
    super.enableValidation()
    this._editFormSubmitHandler(evt)
  }
}

new FormCardRender(settings, cardRenderForm).enableValidation()
new FormEditProfile(settings, profileEditorForm).enableValidation()

export { FormValidator, settings, popupEdit, popupAdd }
