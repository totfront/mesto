const showInputError = (formElement, inputElement, errorMessage, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  errorElement.textContent = errorMessage
  errorElement.classList.add(errorClass)
}

const hideInputError = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = ''
  errorElement.classList.remove(errorClass)
}

const toggleButtonState = (inputList, buttonElement, inputErrorClass, inactiveButtonClass) => {
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

const getErrorMessage = inputElement => {
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

const checkInputValidity = (formElement, inputElement, errorClass) => {
  const isInputNotValid = !inputElement.validity.valid
  if (isInputNotValid) {
    const errorMessage = getErrorMessage(inputElement)
    showInputError(formElement, inputElement, errorMessage, errorClass)
  } else {
    hideInputError(formElement, inputElement, errorClass)
  }
}

const setEventListeners = (formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass) => {
  const handleFormSubmit = event => {
    event.preventDefault()
  }
  formElement.addEventListener('submit', handleFormSubmit)

  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const submitBtn = formElement.querySelector(submitButtonSelector)
  const inputListIterator = inputElement => {
    const handleInput = event => {
      checkInputValidity(formElement, inputElement, errorClass)
      toggleButtonState(inputList, submitBtn, inputErrorClass, inactiveButtonClass)
    }
    inputElement.addEventListener('input', handleInput)
  }
  inputList.forEach(inputListIterator)
  toggleButtonState(inputList, submitBtn, inputErrorClass, inactiveButtonClass)
}

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) => {
  const formElements = document.querySelectorAll(formSelector)
  const formList = Array.from(formElements)
  formList.forEach(formElement => {
    setEventListeners(formElement, inputSelector, inputErrorClass, submitButtonSelector, inactiveButtonClass, errorClass)
  })
}

enableValidation({
  formSelector: 'form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active'
})
