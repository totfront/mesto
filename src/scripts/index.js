import '../pages/index.css'
import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'
import { Popup } from './Popup.js'
import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { UserInfo } from './UserInfo.js'
import { PopupWithForm } from './PopupWithForm.js'

const popupEdit = new Popup('#profile-popup')
const popupAdd = new Popup('#card-popup')
const popupOverview = new Popup('.overview')
const editForm = popupEdit.getPopup().querySelector('.popup__form')
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
const nameInput = document.querySelector('.popup__input_data_name')
const descriptionInput = document.querySelector('.popup__input_data_description')
const profileNameSelector = '.profile__name'
const profileDescriptionSelector = '.profile__description'
const addBtn = document.querySelector('.profile__add-btn')
const overview = document.querySelector('.overview')
const overviewCloseBtn = overview.querySelector('.popup__close-btn')
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
const profileInfo = new UserInfo({ nameSelector: profileNameSelector, descriptionSelector: profileDescriptionSelector })
// Заполняет поля формы данными со страницы
const fillProfileForm = () => {
  nameInput.setAttribute('value', profileInfo.getUserInfo().name)
  descriptionInput.setAttribute('value', profileInfo.getUserInfo().description)
}
// Добавляет обработчики:
overviewCloseBtn.addEventListener('click', () => {
  new PopupWithImage('overview').close()
})
editBtn.addEventListener('click', () => {
  new PopupWithForm('#profile-popup', handleProfileEditorSubmit).open()
  // popupEdit.open()
  popupEdit.setEventListeners()
  fillProfileForm()
})
addBtn.addEventListener('click', () => {
  popupAdd.open()
  popupAdd.setEventListeners()
})
// Скрывает попапы по клику на затемнение
popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup')) {
      new PopupWithForm('#card-popup').close()
      popupEdit.close()
      popupOverview.close()
      const currentForm = popup.querySelector('.popup__form')
      if (currentForm) {
        resetForm(currentForm)
      }
    }
  })
})
//Обрабытывает кнопку submit в форме добавления карточек
const handleCardRenderForm = () => {
  popupAdd
    .getPopup()
    .querySelector('.popup__form')
    .addEventListener('submit', () => {
      popupAdd.close()
      renderCard()
    })
}
//Создает и наполняет новую карточку из формы, затем очищает форму
const renderCard = () => {
  const newCard = {}
  const popupAddCardDescription = popupAdd.getPopup().querySelector('.popup__input_data_description')
  const popupAddCardName = popupAdd.getPopup().querySelector('.popup__input_data_name')
  newCard.name = popupAddCardName.value
  newCard.link = popupAddCardDescription.value
  new Section({ items: [newCard], renderer: createCard }, '.cards').renderItems()
  popupAddCardName.value = ''
  popupAddCardDescription.value = ''
}
// Изменяет данные профиля и закрывает попап по клику на submit
editForm.addEventListener('submit', evt => {
  let newProfileData = {}
  newProfileData.name = nameInput.value
  newProfileData.description = descriptionInput.value
  profileInfo.setUserInfo(newProfileData)
  popupEdit.close()
})
const handleProfileEditorSubmit = () => {
  let newProfileData = {}
  newProfileData.name = nameInput.value
  newProfileData.description = descriptionInput.value
  popupEdit.close()
}
// Наполняет попап с превью данными (название, ссылку) и открывает его
const handleCardClick = (name, link) => {
  new PopupWithImage('overview').setEventListeners()
  new PopupWithImage('overview').open(name, link)
}
// Рендерит заполненную карточку
const createCard = item => {
  return new Card(item, '#template', handleCardClick).renderCard()
}
new Section({ items: initialCards, renderer: createCard }, '.cards').renderItems()
// Включает валидацию для формы добавления карточек
new FormValidator(settings, profileEditorForm).enableValidation()
new FormValidator(settings, cardRenderForm).enableValidation()
handleCardRenderForm()
// Сбрасывает поля форм и скрывает ошибки
const resetForm = currentForm => {
  new FormValidator(settings, currentForm).resetValidation()
}
// Добавляет обработчик событий, который сбрасывает формы
new PopupWithForm('#profile-popup', handleProfileEditorSubmit, resetForm).setEventListeners()
new PopupWithForm('#card-popup', handleProfileEditorSubmit, resetForm).setEventListeners()
