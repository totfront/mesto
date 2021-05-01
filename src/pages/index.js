// Контроллер приложения

import './index.css'
import { FormValidator } from '../components/FormValidator.js'
import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { Api } from '../components/Api.js'
let section
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
const deleteCardPopupSelector = '#popup-delete-card'
const overviewPopupSelector = '#overview'
const cardTemplateSelector = '#template'
const cardContainerSelector = '.cards'
const popupAddBtnSelector = '.profile__add-btn'
const editBtn = document.querySelector(editBtnSelector)
const cardRenderForm = document.querySelector(popupAddCardSelector)
const profileEditorForm = document.querySelector(popupProfileEditorSelecor)
const descriptionInput = document.querySelector(descriptionInputSelector)
const nameInput = document.querySelector(nameInputSelector)
const addBtn = document.querySelector(popupAddBtnSelector)
const profileInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector })
// Добавляет новую карточку по клику на submit
const handleAddCardSubmit = newCardData => {
  api.addCard(newCardData).then(res => {
    newCardData._id = res._id
    renderCard(newCardData)
  })
}
// Изменяет данные профиля и закрывает попап по клику на submit
const handleEditProfileSubmit = inputValues => {
  profileInfo.setUserInfo(inputValues)
  api.updUserData(inputValues)
}
// Подтверждает удаление карточки
const handleDeleteCardSubmit = currentCard => {}
const popupEdit = new PopupWithForm(profileEditorPopupSelector, handleEditProfileSubmit)
const popupAdd = new PopupWithForm(addCardPopupSelector, handleAddCardSubmit)
const popupDeleteCard = new PopupWithForm(deleteCardPopupSelector)
const popupOverview = new PopupWithImage(overviewPopupSelector)
const profileEditFormValidator = new FormValidator(settings, profileEditorForm)
const addCardFormValidator = new FormValidator(settings, cardRenderForm)
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-23',
  token: 'f470df2e-c67b-482b-ae5d-65b776a618c9'
})
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
// Наполняет попап с превью данными (название, ссылку) и открывает его
const handleCardClick = (name, link) => {
  popupOverview.setEventListeners()
  popupOverview.open(name, link)
}
// Управляет кнопкой удаления карточки
const deleteCardHandler = currentCard => {
  popupDeleteCard.open()
  popupDeleteCard.setEventListeners(() => {
    currentCard.remove()
  })
}
// Добавляет слушатели попапу удаления карточки
// popupDeleteCard.setEventListeners()
// Собирает заполненную карточку
const deleteLike = () => {}
const createCard = item => {
  return new Card(item, cardTemplateSelector, handleCardClick, deleteCardHandler, api).renderCard()
}
//Создает и наполняет новую карточку из формы, затем очищает форму
const renderCard = newCardData => {
  const newCard = {}
  newCard.name = newCardData.name
  newCard.link = newCardData.url
  newCard._id = newCardData._id
  section.addItem(createCard(newCard))
}
// Включает валидацию для формы добавления карточек
profileEditFormValidator.enableValidation()
addCardFormValidator.enableValidation()
// Рендерим стартовые карточки
api
  .getCards()
  .then(result => {
    let cardList = []
    result.forEach(newCardData => {
      cardList = [...cardList, { name: newCardData.name, link: newCardData.link, _id: newCardData._id }]
    })
    return cardList
  })
  .then(cardList => {
    const initalSectionData = { items: cardList, renderer: createCard }
    section = new Section(initalSectionData, cardContainerSelector)
    section.renderItems()
  })
  .then(() => {
    // Получает стартовое количество лайков
    api
      .getLikes()
      // Собираем двумерный массив лайков
      .then(cards => {
        const likes = cards.map(card => {
          return card.likes
        })
        return likes
      })
      // Распределяем лайки по карточкам
      .then(likes => {
        const cards = Array.from(document.querySelectorAll('.card')).reverse()
        cards.forEach((card, index) => {
          const counter = card.querySelector('.card__like-counter')
          counter.textContent = likes[index].length
        })
      })
  })
// Обновляем данные пользователя
api.getUserData().then(res => {
  const newProfileData = {
    name: res.name,
    description: res.about
  }
  profileInfo.setUserInfo(newProfileData)
})
