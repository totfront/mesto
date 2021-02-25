const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  errorElement.textContent = errorMessage
  errorElement.classList.add('popup__input-error_active')
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = ''
  errorElement.classList.remove('popup__input-error_active')
}

const toggleButtonState = (inputList, buttonElement) => {
  const findTheOneNotValid = inputElement => {
    return !inputElement.validity.valid
  }
  const hasNotValidInput = inputList.some(findTheOneNotValid)
  if (hasNotValidInput) {
    buttonElement.setAttribute('disabled', true)
    buttonElement.classList.add('popup__save-btn_inactive')
  } else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove('popup__save-btn_inactive')
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

const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid
  if (isInputNotValid) {
    const errorMessage = getErrorMessage(inputElement)
    showInputError(formElement, inputElement, errorMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = (formElement, inputSelector) => {
  const handleFormSubmit = event => {
    event.preventDefault()
  }
  formElement.addEventListener('submit', handleFormSubmit)

  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  const submitBtn = formElement.querySelector('.popup__save-btn')
  const inputListIterator = inputElement => {
    const handleInput = event => {
      checkInputValidity(formElement, inputElement)
      toggleButtonState(inputList, submitBtn)
    }
    inputElement.addEventListener('input', handleInput)
  }
  inputList.forEach(inputListIterator)
  toggleButtonState(inputList, submitBtn)
}

const enableValidation = ({ formSelector, inputSelector }) => {
  const formElements = document.querySelectorAll(formSelector)
  const formList = Array.from(formElements)
  formList.forEach(formElement => {
    setEventListeners(formElement, inputSelector)
  })
}

enableValidation({
  formSelector: 'form',
  inputSelector: '.popup__input'
})
