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

const checkInputValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid
  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage
    showInputError(formElement, inputElement, errorMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

const setEventListeners = formElement => {
  const handleFormSubmit = event => {
    event.preventDefault()
  }
  formElement.addEventListener('submit', handleFormSubmit)

  const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
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

const enableValidation = () => {
  const formElements = document.querySelectorAll('form')
  const formList = Array.from(formElements)
  formList.forEach(formElement => {
    setEventListeners(formElement)
  })
}

enableValidation()
