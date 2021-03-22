import { popupEdit, editForm, popupAdd, cardRenderForm, profileEditorForm, settings, hidePopup, profileName, nameInput, profileDescription, descriptionInput } from './index.js'
import { Card } from './Card.js'

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
  }
  // Обработчик формы добавления карточек
  formSubmitHandler(evt) {
    evt.preventDefault()
    hidePopup(popupAdd)
  }
  // Обработчик формы редакторования профиля
  editFormSubmitHandler(evt) {
    evt.preventDefault()
    hidePopup(popupEdit)
  }
}

class FormCardRender extends FormValidator {
  constructor(settings, cardRenderForm) {
    super(settings, cardRenderForm)
  }
  handleCardRenderForm = () => {
    new FormValidator(settings, cardRenderForm).enableValidation()
    popupAdd.querySelector('.popup__form').addEventListener('submit', evt => {
      super.formSubmitHandler(evt)
      this._renderCard()
    })
  }

  _renderCard = () => {
    const newCard = {}
    const popupAddCardDescription = popupAdd.querySelector('.popup__input_data_description')
    const popupAddCardName = popupAdd.querySelector('.popup__input_data_name')
    newCard.name = popupAddCardName.value
    newCard.link = popupAddCardDescription.value
    new Card(newCard, '#template').renderCard(newCard)
    popupAddCardName.value = ''
    popupAddCardDescription.value = ''
  }
}

class FormEditProfile extends FormValidator {
  constructor(settings, profileEditorForm) {
    super(settings, profileEditorForm)
  }
  changeProfileData = () => {
    new FormValidator(settings, profileEditorForm).enableValidation()
    editForm.addEventListener('submit', evt => {
      profileName.textContent = nameInput.value
      profileDescription.textContent = descriptionInput.value
      super.editFormSubmitHandler(evt)
    })
  }
}

export { FormEditProfile, FormCardRender }
