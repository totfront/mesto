// Контроллер приложения

import '../pages/index.css'
import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { UserInfo } from './UserInfo.js'
import { PopupWithForm } from './PopupWithForm.js'
import { cardList } from './initial-cards.js'
const popupAddCardSelector = '#card-renderer'
const popupProfileEditorSelecor = '#profile-editor'
const settings = {
  formSelector: 'form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__input-error_active'
}
const editBtnSelector = '.profile__edit-btn'
const nameInputSelector = '.popup__input_data_name'
const descriptionInputSelector = '.popup__input_data_description'
const profileNameSelector = '.profile__name'
const profileDescriptionSelector = '.profile__description'
const profileEditorPopupSelector = '#profile-popup'
const addCardPopupSelector = '#card-popup'
const overviewPopupSelector = '#overview'
const cardTemplateSelector = '#template'
const cardContainerSelector = '.cards'
const popupCloseBtnSelector = '.popup__close-btn'
const popupAddBtnSelector = '.profile__add-btn'
const editBtn = document.querySelector(editBtnSelector)
const cardRenderForm = document.querySelector(popupAddCardSelector)
const profileEditorForm = document.querySelector(popupProfileEditorSelecor)
const descriptionInput = document.querySelector(descriptionInputSelector)
const nameInput = document.querySelector(nameInputSelector)
const addBtn = document.querySelector(popupAddBtnSelector)
const overviewCloseBtn = document.querySelector(overviewPopupSelector).querySelector(popupCloseBtnSelector)
const profileInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector })
// Изменяет данные профиля и закрывает попап по клику на submit
const handleAddCardSubmit = newCardData => {
  renderCard(newCardData)
}
const handleEditProfileSubmit = inputValues => {
  profileInfo.setUserInfo(inputValues)
}
const popupEdit = new PopupWithForm(profileEditorPopupSelector, handleEditProfileSubmit)
const popupAdd = new PopupWithForm(addCardPopupSelector, handleAddCardSubmit)
const popupOverview = new PopupWithImage(overviewPopupSelector)
const profileEditFormValidator = new FormValidator(settings, profileEditorForm)
const addCardFormValidator = new FormValidator(settings, cardRenderForm)
const popupAddCardDescription = popupAdd.getPopup().querySelector(descriptionInputSelector)
const popupAddCardName = popupAdd.getPopup().querySelector(nameInputSelector)
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
// popupEdit.onEmptyZoneClose()
editBtn.addEventListener('click', () => {
  profileEditFormValidator.resetValidation()
  popupEdit.open()
  fillProfileForm()
})
// popupAdd.onEmptyZoneClose()
popupAdd.setEventListeners()
addBtn.addEventListener('click', () => {
  addCardFormValidator.resetValidation()
  // popupAdd.reset()
  popupAdd.open()
})
// Наполняет попап с превью данными (название, ссылку) и открывает его
const handleCardClick = (name, link) => {
  popupOverview.setEventListeners()
  // popupOverview.onEmptyZoneClose()
  popupOverview.open(name, link)
}
// Рендерит заполненную карточку
const createCard = item => {
  return new Card(item, cardTemplateSelector, handleCardClick).renderCard()
}
const initalSectionData = { items: cardList, renderer: createCard }
// Рендерим стартовые карточки
const initialSection = new Section(initalSectionData, cardContainerSelector)
initialSection.renderItems()
//Создает и наполняет новую карточку из формы, затем очищает форму
const renderCard = newCardData => {
  const newCard = {}
  newCard.name = newCardData.name
  newCard.link = newCardData.url
  const sectionData = {
    items: [newCard],
    renderer: createCard
  }
  const newSection = new Section(sectionData, cardContainerSelector)
  newSection.renderItems()
}
// Включает валидацию для формы добавления карточек
profileEditFormValidator.enableValidation()
addCardFormValidator.enableValidation()
// Сбрасывает поля форм и скрывает ошибки
