// Контроллер приложения

import '../pages/index.css'
import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { UserInfo } from './UserInfo.js'
import { PopupWithForm } from './PopupWithForm.js'
import { initialCards } from './initial-cards.js'

// const editForm = popupEdit.getPopup().querySelector('.popup__form')
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
const editBtn = document.querySelector('.profile__edit-btn')
const nameInputSelector = '.popup__input_data_name'
const nameInput = document.querySelector(nameInputSelector)
const descriptionInputSelector = '.popup__input_data_description'
const descriptionInput = document.querySelector(descriptionInputSelector)
const profileNameSelector = '.profile__name'
const profileDescriptionSelector = '.profile__description'
const addBtn = document.querySelector('.profile__add-btn')
const overviewCloseBtn = document.querySelector('.overview').querySelector('.popup__close-btn')
const popups = Array.from(document.querySelectorAll('.popup'))
const profileInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector })
// Изменяет данные профиля и закрывает попап по клику на submit
const handleSubmitForm = () => {
  profileInfo.setUserInfo(opupEdit._getInputValues())
}
const popupEdit = new PopupWithForm('#profile-popup', handleSubmitForm)
const popupAdd = new PopupWithForm('#card-popup', handleSubmitForm)
const popupOverview = new PopupWithImage('#overview', handleSubmitForm)
const cardTemplateSelector = '#template'
const cardContainerSelector = '.cards'
// const Section = new Section({ items: [newCard], renderer: createCard }, cardContainerSelector)
// Заполняет поля формы данными со страницы
const fillProfileForm = () => {
  nameInput.setAttribute('value', profileInfo.getUserInfo().name)
  descriptionInput.setAttribute('value', profileInfo.getUserInfo().description)
}
// Добавляет обработчики:
overviewCloseBtn.addEventListener('click', () => {
  popupOverview.close()
})
editBtn.addEventListener('click', () => {
  popupEdit.open()
  popupEdit.onEmptyZoneClose()
  popupEdit.setEventListeners()
  fillProfileForm()
})
addBtn.addEventListener('click', () => {
  popupAdd.open()
  popupAdd.onEmptyZoneClose()
  popupAdd.setEventListeners()
})
//Создает и наполняет новую карточку из формы, затем очищает форму
const renderCard = () => {
  const newCard = {}
  const popupAddCardDescription = popupAdd.getPopup().querySelector(descriptionInputSelector)
  const popupAddCardName = popupAdd.getPopup().querySelector(nameInputSelector)
  newCard.name = popupAddCardName.value
  newCard.link = popupAddCardDescription.value
  new Section({ items: [newCard], renderer: createCard }, cardContainerSelector).renderItems()
  popupAddCardName.value = ''
  popupAddCardDescription.value = ''
}
// Наполняет попап с превью данными (название, ссылку) и открывает его
const handleCardClick = (name, link) => {
  popupOverview.setEventListeners()
  popupOverview.onEmptyZoneClose()
  popupOverview.open(name, link)
}
// Рендерит заполненную карточку
const createCard = item => {
  return new Card(item, cardTemplateSelector, handleCardClick).renderCard()
}
// Рендерим стартовые карточки
new Section({ items: initialCards, renderer: createCard }, cardContainerSelector).renderItems()
// Включает валидацию для формы добавления карточек
new FormValidator(settings, profileEditorForm).enableValidation()
new FormValidator(settings, cardRenderForm).enableValidation()
// // Сбрасывает поля форм и скрывает ошибки
// const resetForm = currentForm => {
//   new FormValidator(settings, currentForm).resetValidation()
// }
