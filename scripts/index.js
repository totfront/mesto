import { FormValidator } from './FormValidator.js'
import { Card, cardsContainer } from './Card.js'
import { Popup } from './Popup.js'

const popupEdit = new Popup('#profile-popup')
const popupAdd = new Popup('#card-popup')
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
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const addBtn = document.querySelector('.profile__add-btn')
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
// const showPopup = popup => {
//   popup.classList.add('popup_opened')
//   document.addEventListener('keydown', closeByEscape)
// }
// Закрывает попап
// const hidePopup = popup => {
//   popup.classList.remove('popup_opened')
//   document.removeEventListener('keydown', closeByEscape)
// }
// const closeByEscape = evt => {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened')
//     hidePopup(openedPopup)
//   }
// }
// Заполняет поля формы данными со страницы
const fillProfileForm = () => {
  nameInput.setAttribute('value', profileName.textContent)
  descriptionInput.setAttribute('value', profileDescription.textContent)
}
// Добавляет обработчики:
overviewCloseBtn.addEventListener('click', () => {
  hidePopup(overview)
})
editBtn.addEventListener('click', () => {
  popupEdit.open()
  popupEdit.setEventListeners()
  popupAdd.open()
  popupAdd.setEventListeners()
  fillProfileForm()
})
addBtn.addEventListener('click', () => {
  popupAdd.open()
})
popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup')) {
      popupAdd.close()
    }
    if (event.target.classList.contains('popup__close-pic')) {
      popupAdd.close()
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
      // hidePopup(popupAdd)
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
  const filledNewCard = createCard(newCard)
  cardsContainer.prepend(filledNewCard)
  popupAddCardName.value = ''
  popupAddCardDescription.value = ''
}
// Изменяет данные профиля и закрывает попап
const handleProfileEditorForm = () => {
  editForm.addEventListener('submit', evt => {
    profileName.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
    popupEdit.close()
  })
}
// Наполняет попап с превью данными (название, ссылку) и открывает его
const handleCardClick = (name, link) => {
  overviewPic.src = link
  overviewCaption.textContent = name
  showPopup(overview)
}
// Рендерит заполненную карточку
const createCard = item => {
  return new Card(item, '#template', handleCardClick).renderCard()
}
// Добавляет стартовые 6 карточек
initialCards.forEach(item => {
  cardsContainer.prepend(createCard(item))
})
// Включает валидацию для формы добавления карточек
new FormValidator(settings, profileEditorForm).enableValidation()
new FormValidator(settings, cardRenderForm).enableValidation()
handleCardRenderForm()
handleProfileEditorForm()
