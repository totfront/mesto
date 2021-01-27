let popupCloseBtn = document.querySelector('.popup__close-btn')
let popup = document.querySelector('.popup')
let editBtn = document.querySelector('.profile__edit-btn')
let nameInput = document.querySelector('.popup__input-name')
let jobInput = document.querySelector('.popup__input-description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')
let saveBtn = document.querySelector('.popup__save-btn')
let formElement = document.querySelector('.popup__form')
let likeBtn = document.querySelector('.elements__like-btn')
let pageEl = document.querySelector('.page')

// Заполняет форму
let fillInputs = () => {
  nameInput.setAttribute('value', profileName.innerHTML)
  nameInput.value.textContent = profileName.innerHTML
  jobInput.setAttribute('value', profileDescription.innerHTML)
}

// Прячет Popup
let togglePopup = () => {
  popup.classList.toggle('popup__opened')
  pageEl.style.overflow = 'hidden'
  fillInputs()

  if (popup.classList.contains('popup__opened') == 0) {
    pageEl.style.overflow = 'auto'
  }
}

// Заполняет профиль и скрывает Popup
let fillProfile = () => {
  profileName.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  togglePopup()
}

// Обработчик «отправки» формы (пока не работает)
function formSubmitHandler(evt) {
  evt.preventDefault()
  // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
}

// Прикрепляем обработчики:
formElement.addEventListener('submit', formSubmitHandler)
popupCloseBtn.addEventListener('click', togglePopup)
editBtn.addEventListener('click', togglePopup)
saveBtn.addEventListener('click', fillProfile)
