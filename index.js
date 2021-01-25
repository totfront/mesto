let popupCloseBtn = document.querySelector('.popup__close-btn')
let popup = document.querySelector('.popup')
let editBtn = document.querySelector('.profile__edit-btn')
let inputName = document.querySelector('.popup__input-name')
let inputDescription = document.querySelector('.popup__input-description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')

// Заполняет форму
let fillInputs = () => {
  inputName.setAttribute('value', profileName.innerHTML)
  inputName.value.textContent = profileName.innerHTML
  inputDescription.setAttribute('value', profileDescription.innerHTML)
}

// Прячет Popup
let hidePopup = () => {
  popup.classList.toggle('popup__opened')

  if (popup.classList.contains('popup__opened') == 0) {
    console.log('Содержит')
    fillInputs()
  }
}

popupCloseBtn.addEventListener('click', hidePopup)
editBtn.addEventListener('click', hidePopup)
