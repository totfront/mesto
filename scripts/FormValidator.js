import { hidePopup, editForm, profileName, nameInput, profileDescription, descriptionInput, popupEdit, popupAdd } from './index.js'
import { Card } from './Card.js'

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
  _showInputError = (formElement, inputElement, errorMessage, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

    errorElement.textContent = errorMessage
    errorElement.classList.add(errorClass)
  }

  _hideInputError = (formElement, inputElement, errorClass) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = ''
    errorElement.classList.remove(errorClass)
  }

  _toggleButtonState = (inputList, buttonElement, inputErrorClass, inactiveButtonClass) => {
    const findTheOneNotValid = inputElement => {
      return !inputElement.validity.valid
    }
    const notValidInput = inputList.find(findTheOneNotValid)
    if (notValidInput) {
      buttonElement.setAttribute('disabled', true)
      buttonElement.classList.add(inactiveButtonClass)
      notValidInput.classList.add(inputErrorClass)
    } else {
      buttonElement.removeAttribute('disabled')
      buttonElement.classList.remove(inactiveButtonClass)
    }
  }

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

  _checkInputValidity = (formElement, inputElement, errorClass) => {
    const isInputNotValid = !inputElement.validity.valid
    if (isInputNotValid) {
      const errorMessage = this._getErrorMessage(inputElement)
      this._showInputError(formElement, inputElement, errorMessage, errorClass)
    } else {
      this._hideInputError(formElement, inputElement, errorClass)
    }
  }

  _setEventListeners = (formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass) => {
    const handleFormSubmit = event => {
      event.preventDefault()
    }
    formElement.addEventListener('submit', handleFormSubmit)

    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const submitBtn = formElement.querySelector(submitButtonSelector)
    const inputListIterator = inputElement => {
      const handleInput = () => {
        this._checkInputValidity(formElement, inputElement, errorClass)
        this._toggleButtonState(inputList, submitBtn, inputErrorClass, inactiveButtonClass)
      }
      inputElement.addEventListener('input', handleInput)
    }
    inputList.forEach(inputListIterator)
    this._toggleButtonState(inputList, submitBtn, inputErrorClass, inactiveButtonClass)
    editForm.addEventListener('submit', evt => {
      this._editFormSubmitHandler(evt)
    })
    popupAdd.querySelector('.popup__form').addEventListener('submit', evt => {
      this._addFormSubmitHandler(evt)
    })
  }
  // Обработчик формы добавления карточек
  _addFormSubmitHandler(evt) {
    evt.preventDefault()
    const newCard = {}
    const popupAddCardDescription = popupAdd.querySelector('.popup__input_data_description')
    const popupAddCardName = popupAdd.querySelector('.popup__input_data_name')
    newCard.name = popupAddCardName.value
    newCard.link = popupAddCardDescription.value
    Card.renderCard(newCard)
    popupAddCardName.value = ''
    popupAddCardDescription.value = ''
    hidePopup(popupAdd)
  }
  // Обработчик формы редакторования профиля
  _editFormSubmitHandler(evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
    hidePopup(popupEdit)
  }
  enableValidation = ({ errorClass, formSelector, inactiveButtonClass, inputErrorClass, inputSelector, submitButtonSelector }) => {
    const formElements = document.querySelectorAll(formSelector)
    const formList = Array.from(formElements)
    formList.forEach(formElement => {
      this._setEventListeners(formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass)
    })
  }
}

export { FormValidator, settings }
