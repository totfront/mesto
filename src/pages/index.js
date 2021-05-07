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
const changeAvatarPupupSelector = '#avatar-upd'
const addCardPopupSelector = '#card-popup'
const deleteCardPopupSelector = '#popup-delete-card'
const overviewPopupSelector = '#overview'
const cardTemplateSelector = '#template'
const cardContainerSelector = '.cards'
const popupAddBtnSelector = '.profile__add-btn'
const avatarSelector = '.profile__avatar-btn'
const avatarChangeFormSelector = '#avatar-upd-form'
const avatarElement = document.querySelector(avatarSelector)
const editBtn = document.querySelector(editBtnSelector)
const avatarChangeFormElement = document.querySelector(avatarChangeFormSelector)
const cardRenderForm = document.querySelector(popupAddCardSelector)
const profileEditorForm = document.querySelector(popupProfileEditorSelecor)
const descriptionInput = document.querySelector(descriptionInputSelector)
const nameInput = document.querySelector(nameInputSelector)
const addBtn = document.querySelector(popupAddBtnSelector)
const profileInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector, avatarSelector: avatarSelector })
// Добавляет новую карточку по клику на submit
const handleAddCardSubmit = newCardData => {
  popupAdd.changeSubmitBtnText(cardRenderForm)
  api
    .addCard(newCardData, cardRenderForm)
    .then(res => {
      newCardData._id = res._id
      newCardData.likes = res.likes
      renderCard(newCardData)
    })
    .then(() => {
      popupAdd.close()
    })
    .catch(err => {
      console.log(err + ' && ' + 'Ошибка при добавлении карточки')
    })
    .finally(() => {
      popupAdd.changeSubmitBtnText(cardRenderForm)
    })
}
// Изменяет данные профиля и закрывает попап по клику на submit
const handleEditProfileSubmit = inputValues => {
  popupAdd.changeSubmitBtnText(profileEditorForm)
  api
    .updUserData(inputValues, profileEditorForm)
    .then(() => {
      profileInfo.setUserInfo(inputValues)
    })
    .then(() => {
      popupEdit.close()
    })
    .catch(err => {
      console.log(err + ' && ' + 'Ошибка при обновлении данных пользователя')
    })
    .finally(() => {
      popupAdd.changeSubmitBtnText(profileEditorForm)
    })
}
// Подтверждает изменение аватара
const handleChangeAvatarSubmit = newAvatar => {
  popupAdd.changeSubmitBtnText(avatarChangeFormElement)
  api
    .changeAvatar(newAvatar.url, avatarChangeFormElement)
    .then(() => {
      avatarElement.style.backgroundImage = `url(${newAvatar.url})`
    })
    .then(() => {
      popupChangeAvatar.close()
    })
    .catch(err => {
      console.log(err + ' && ' + 'Ошибка при смене аватара')
    })
    .finally(() => {
      popupAdd.changeSubmitBtnText(avatarChangeFormElement)
    })
}
const popupEdit = new PopupWithForm(profileEditorPopupSelector, handleEditProfileSubmit)
const popupAdd = new PopupWithForm(addCardPopupSelector, handleAddCardSubmit)
const popupChangeAvatar = new PopupWithForm(changeAvatarPupupSelector, handleChangeAvatarSubmit)
const changeAvatarFormValidator = new FormValidator(settings, avatarChangeFormElement)
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
popupChangeAvatar.setEventListeners()
avatarElement.addEventListener('click', () => {
  changeAvatarFormValidator.resetValidation()
  popupChangeAvatar.open()
})
// Наполняет попап с превью данными (название, ссылку) и открывает его
const handleCardClick = (name, link) => {
  popupOverview.setEventListeners()
  popupOverview.open(name, link)
}
const popupDeleteCard = new PopupWithForm(deleteCardPopupSelector)
popupDeleteCard.setEventListeners()
// Собирает заполненную карточку
const createCard = (item, personalId) => {
  // Управляет кнопкой удаления карточки
  const deleteCardHandler = (currentCard, cardId) => {
    popupDeleteCard.open()
    popupDeleteCard.setSubmitHandler(() => {
      api
        .removeCard(cardId)
        .then(() => {
          currentCard.remove()
        })
        .catch(err => {
          console.log(err + ' && ' + 'Ошибка при удалении карточки')
        })
        .then(() => {
          popupDeleteCard.close()
        })
    })
  }
  return new Card(item, cardTemplateSelector, handleCardClick, deleteCardHandler, api, personalId).renderCard()
}
//Создает и наполняет новую карточку из формы, затем очищает форму
const renderCard = newCardData => {
  const newCard = {}
  newCard.name = newCardData.name
  newCard.link = newCardData.url
  newCard._id = newCardData._id
  newCard.likes = newCardData.likes
  newCard.owner = newCardData.owner
  section.addItem(createCard(newCard, personalId))
}
// Включает валидацию для форм
profileEditFormValidator.enableValidation()
addCardFormValidator.enableValidation()
changeAvatarFormValidator.enableValidation()
// Рендерим стартовые карточки
let personalId
Promise.all([api.getCards(), api.getUserData()])
  .catch(err => {
    console.log(err + ' && ' + 'Ошибка при получении карточек')
  })
  .then(([[...initialCards], userData]) => {
    const personalId = userData._id
    const initalSectionData = {
      items: initialCards,
      renderer: createCard,
      personalId: personalId
    }
    section = new Section(initalSectionData, cardContainerSelector)
    section.renderItems()
  })
// Обновляем данные пользователя
api
  .getUserData()
  .catch(err => {
    console.log(err + ' && ' + 'Ошибка при получении данных пользователя')
  })
  .then(userData => {
    profileInfo.setUserAvatar(userData)
  })
