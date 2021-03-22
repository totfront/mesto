import { FormEditProfile, FormCardRender } from './FormValidator.js'
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

const popupEditCloseBtn = popupEdit.querySelector('.popup__close-btn')
const editBtn = document.querySelector('.profile__edit-btn')
const nameInput = document.querySelector('.popup__input_data_name')
const descriptionInput = document.querySelector('.popup__input_data_description')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const addBtn = document.querySelector('.profile__add-btn')
const popupTitle = document.querySelector('.popup__title')
const overview = document.querySelector('.overview')
const overviewPic = document.querySelector('.overview__pic')
const overviewCloseBtn = overview.querySelector('.popup__close-btn')
const overviewCaption = document.querySelector('.overview__caption')
const popups = Array.from(document.querySelectorAll('.popup'))

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]

// Показывает попап
const showPopup = popup => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}
// Закрывает попап
const hidePopup = popup => {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}
const closeByEscape = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    hidePopup(openedPopup)
  }
}

// Заполняет поля формы данными со страницы
const fillProfileForm = () => {
  nameInput.setAttribute('value', profileName.textContent)
  descriptionInput.setAttribute('value', profileDescription.textContent)
}

// Добавляет обработчики:
popupEditCloseBtn.addEventListener('click', () => {
  hidePopup(popupEdit)
})
overviewCloseBtn.addEventListener('click', () => {
  hidePopup(overview)
})
editBtn.addEventListener('click', () => {
  showPopup(popupEdit)
  fillProfileForm()
})
addBtn.addEventListener('click', () => {
  showPopup(popupAdd)
})

popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup')) {
      hidePopup(popup)
    }
    if (event.target.classList.contains('popup__close-pic')) {
      hidePopup(popup)
    }
  })
})

// Рендерит стартовые 6 карточек
initialCards.forEach(item => {
  new Card(item, '#template').renderCard()
})

new FormCardRender(settings, cardRenderForm).handleCardRenderForm()
new FormEditProfile(settings, cardRenderForm).changeProfileData()

export { initialCards, popupEdit, editForm, popupAdd, cardRenderForm, profileEditorForm, settings, overview, showPopup, hidePopup, overviewPic, overviewCaption, profileName, nameInput, profileDescription, descriptionInput }
