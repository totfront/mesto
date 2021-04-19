// Контроллер приложения

import './index.css'
import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Api } from '../components/Api.js'
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
const profileAvatarBtnSelector = '.profile__avatar-btn'
const descriptionInputSelector = '.popup__input_data_description'
const profileNameSelector = '.profile__name'
const profileDescriptionSelector = '.profile__description'
const profileEditorPopupSelector = '#profile-popup'
const addCardPopupSelector = '#card-popup'
const certitudePopupSelector = '#certitude'
const avatarUpdPopupSelector = '#avatar-upd'
const avatarUpdFormSelector = '#avatar-upd-form'
const overviewPopupSelector = '#overview'
const cardTemplateSelector = '#template'
const popupAddCardSelector = '#card-renderer'
const popupProfileEditorSelecor = '#profile-editor'
const cardContainerSelector = '.cards'
const popupAddBtnSelector = '.profile__add-btn'
const profileDescriptionElement = document.querySelector(profileDescriptionSelector)
const profileNameElement = document.querySelector(profileNameSelector)
const profileAvatarBtnElement = document.querySelector(profileAvatarBtnSelector)
const editBtn = document.querySelector(editBtnSelector)
const cardRenderForm = document.querySelector(popupAddCardSelector)
const profileEditorForm = document.querySelector(popupProfileEditorSelecor)
const avatarUpdFormElement = document.querySelector(avatarUpdFormSelector)
const descriptionInput = document.querySelector(descriptionInputSelector)
const nameInput = document.querySelector(nameInputSelector)
const addBtn = document.querySelector(popupAddBtnSelector)
const profileInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector })
let lastClickedCard
const cardsApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/cards',
  headers: {
    authorization: '72b79157-1952-43cd-9fd8-d3bec7029691'
  }
})
const userInfoApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/users/me',
  headers: {
    authorization: '72b79157-1952-43cd-9fd8-d3bec7029691'
  }
})
const avatarApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/users/me/avatar',
  headers: {
    authorization: '72b79157-1952-43cd-9fd8-d3bec7029691'
  },
  formSelector: avatarUpdFormSelector
})
const likesApi = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/cards/likes',
  headers: {
    authorization: '72b79157-1952-43cd-9fd8-d3bec7029691'
  }
})
// Добавляет новую карточку и закрывает попап по клику на submit
const handleAddCardSubmit = newCardData => {
  renderCard(newCardData)
  cardsApi.postNewCard(newCardData)
}
// Изменяет данные профиля и закрывает попап по клику на submit
const handleEditProfileSubmit = inputValues => {
  profileInfo.setUserInfo(inputValues)
  userInfoApi.updateProfileInfo({ profileNameElement: profileNameElement, profileDescriptionElement: profileDescriptionElement }, inputValues)
}
// Закрывает попап, удаляет карточку на странице и сервере
const handleCertitudeSubmit = () => {
  // Если у карточки есть id, удаляем её на сервере
  console.log('============')
  console.log(cardsApi.getDeletingCard())
  cardsApi.getCurrentCard
  console.log('lastClickedCard============')
  console.log(lastClickedCard)
  if (lastClickedCard.data.id) {
    console.log('=====Свежая======')
  }
  if (lastClickedCard.data.id) {
    cardsApi.deleteCard(lastClickedCard.data.id)
  }
  lastClickedCard.card.remove()
}
// Обновляет аватар, отправляет новый на сервер
const handleAvatarUpdSubmit = newAvatarUrl => {
  avatarApi.updateAvatarImage(newAvatarUrl.url)
  profileAvatarBtnElement.style.backgroundImage = `url("${newAvatarUrl.url}")`
}
const popupEdit = new PopupWithForm(profileEditorPopupSelector, handleEditProfileSubmit)
const popupAdd = new PopupWithForm(addCardPopupSelector, handleAddCardSubmit)
const popupOverview = new PopupWithImage(overviewPopupSelector)
const popupCertitude = new PopupWithForm(certitudePopupSelector, handleCertitudeSubmit)
popupCertitude.setEventListeners()
const popupAvatarUpd = new PopupWithForm(avatarUpdPopupSelector, handleAvatarUpdSubmit)
const profileEditFormValidator = new FormValidator(settings, profileEditorForm)
const addCardFormValidator = new FormValidator(settings, cardRenderForm)
const profileAvatorFormFalidator = new FormValidator(settings, avatarUpdFormElement)
// Обновляем данные на странице данными с сервера
userInfoApi.updateProfileInfo({ profileNameElement: profileNameElement, profileDescriptionElement: profileDescriptionElement, avatarElement: profileAvatarBtnElement })
// Заполняет поля формы данными со страницы
const fillProfileForm = () => {
  nameInput.value = profileInfo.getUserInfo().name
  descriptionInput.value = profileInfo.getUserInfo().description
}
// Добавляет обработчики на элементы вызова попапов:
popupEdit.setEventListeners()
editBtn.addEventListener('click', () => {
  profileEditFormValidator.resetValidation()
  popupEdit.open()
  fillProfileForm()
})
popupAdd.setEventListeners()
addBtn.addEventListener('click', () => {
  addCardFormValidator.resetValidation()
  popupAdd.open()
})
popupAvatarUpd.setEventListeners()
profileAvatarBtnElement.addEventListener('click', () => {
  popupAvatarUpd.open()
  profileAvatorFormFalidator.resetValidation()
})
// Наполняет попап с превью данными (название, ссылку) и открывает его
const handleCardClick = (name, link) => {
  popupOverview.setEventListeners()
  popupOverview.open(name, link)
}
// Открывает попап с удалением карточки
const handleDeleteBtnClick = (newCard, currentCardData) => {
  lastClickedCard = {
    card: newCard,
    data: currentCardData
  }
  popupCertitude.open()
}
// Собирает заполненную карточку
const createCard = item => {
  return new Card(item, cardTemplateSelector, handleCardClick, handleDeleteBtnClick, likesApi).renderCard()
}
// Запрос на стартовые карточки
let section
cardsApi
  .getInitialCards()
  .then(result => {
    let cardList = []
    result.forEach(newCardData => {
      cardList = [...cardList, { name: newCardData.name, link: newCardData.link, likes: newCardData.likes, owner: newCardData.owner, cardId: newCardData._id }]
    })
    return cardList
  })
  .then(cardList => {
    // Рендерим стартовые карточки
    const initalSectionData = { items: cardList, renderer: createCard }
    section = new Section(initalSectionData, cardContainerSelector)
    section.renderItems()
  })
  .catch(err => {
    return Promise.reject(`Ошибка: ${err}`)
  })
fetch('https://mesto.nomoreparties.co/v1/cohort-22/cards', {
  headers: {
    authorization: '72b79157-1952-43cd-9fd8-d3bec7029691'
  }
})
//Создает и наполняет новую карточку из формы, затем очищает форму
const renderCard = newCardData => {
  const newCard = {}
  newCard.name = newCardData.name
  newCard.link = newCardData.url
  section.addItem(createCard(newCard))
}
// Включает валидацию для формы добавления карточек
profileEditFormValidator.enableValidation()
addCardFormValidator.enableValidation()
profileAvatorFormFalidator.enableValidation()
