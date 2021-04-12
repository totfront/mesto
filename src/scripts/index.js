// Контроллер приложения

import '../pages/index.css'
import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { UserInfo } from './UserInfo.js'
import { PopupWithForm } from './PopupWithForm.js'
import { initialCards } from './initial-cards.js'

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
const popupFormSelector = '.popup__form'
const editBtn = document.querySelector('.profile__edit-btn')
const nameInputSelector = '.popup__input_data_name'
const nameInput = document.querySelector(nameInputSelector)
const descriptionInputSelector = '.popup__input_data_description'
const descriptionInput = document.querySelector(descriptionInputSelector)
const profileNameSelector = '.profile__name'
const profileDescriptionSelector = '.profile__description'
const addBtn = document.querySelector('.profile__add-btn')
const overviewCloseBtn = document.querySelector('.overview').querySelector('.popup__close-btn')
const profileInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector })
// Изменяет данные профиля и закрывает попап по клику на submit
const handleSubmitForm = popup => {
  if (popup.id === 'profile-popup') {
    profileInfo.setUserInfo(popupEdit._getInputValues())
    popupEdit.reset()
    popupEdit.close()
    return
  }
  if (popup.id === 'card-popup') {
    popupAdd.close()
    renderCard()
    return
  }
}
const popupEdit = new PopupWithForm('#profile-popup', handleSubmitForm)
const popupAdd = new PopupWithForm('#card-popup', handleSubmitForm)
const popupOverview = new PopupWithImage('#overview', handleSubmitForm)
const profileEditFormValidator = new FormValidator(settings, profileEditorForm)
const addCardFormValidator = new FormValidator(settings, cardRenderForm)
const cardTemplateSelector = '#template'
const cardContainerSelector = '.cards'
// Заполняет поля формы данными со страницы
const fillProfileForm = () => {
  nameInput.value = profileInfo.getUserInfo().name
  descriptionInput.value = profileInfo.getUserInfo().description
}
// Добавляет обработчики:
overviewCloseBtn.addEventListener('click', () => {
  popupOverview.close()
})
popupEdit.setEventListeners()
popupEdit.onEmptyZoneClose()
editBtn.addEventListener('click', () => {
  profileEditFormValidator.resetValidation()
  popupEdit.open()
  fillProfileForm()
})
popupAdd.onEmptyZoneClose()
popupAdd.setEventListeners()
addBtn.addEventListener('click', () => {
  addCardFormValidator.resetValidation()
  popupAdd.reset()
  popupAdd.open()
})
//Создает и наполняет новую карточку из формы, затем очищает форму
const renderCard = () => {
  const newCard = {}
  const popupAddCardDescription = popupAdd.getPopup().querySelector(descriptionInputSelector)
  const popupAddCardName = popupAdd.getPopup().querySelector(nameInputSelector)
  newCard.name = popupAddCardName.value
  newCard.link = popupAddCardDescription.value
  const sectionData = {
    items: [newCard],
    renderer: createCard
  }
  const newSection = new Section(sectionData, cardContainerSelector)
  newSection.renderItems()
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
const initalSectionData = { items: initialCards, renderer: createCard }
// Рендерим стартовые карточки
const initialSection = new Section(initalSectionData, cardContainerSelector)
initialSection.renderItems()
// Включает валидацию для формы добавления карточек
profileEditFormValidator.enableValidation()
addCardFormValidator.enableValidation()
// Сбрасывает поля форм и скрывает ошибки
