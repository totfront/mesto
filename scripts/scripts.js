const popupEdit = document.querySelector('#profile-popup')
const popupEditCloseBtn = popupEdit.querySelector('.popup__close-btn')
const editBtn = document.querySelector('.profile__edit-btn')
const nameInput = document.querySelector('.popup__input_data_name')
const descriptionInput = document.querySelector('.popup__input_data_description')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const editForm = popupEdit.querySelector('.popup__form')
const addBtn = document.querySelector('.profile__add-btn')
const popupTitle = document.querySelector('.popup__title')
const cardTemplate = document.querySelector('#template').content
const cardsContainer = document.querySelector('.cards')
const overview = document.querySelector('.overview')
const overviewPic = document.querySelector('.overview__pic')
const overviewCloseBtn = overview.querySelector('.popup__close-btn')
const overviewCaption = document.querySelector('.overview__caption')
const popupAdd = document.querySelector('#card-popup')
const popupAddCardName = popupAdd.querySelector('.popup__input_data_name')
const popupAddCardDescription = popupAdd.querySelector('.popup__input_data_description')
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
// Создает карточку
const createCard = item => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true)
  const cardPic = newCard.querySelector('.card__pic')
  cardPic.style.backgroundImage = `url("${item.link}")`
  newCard.querySelector('.card__heading').textContent = item.name
  cardPic.addEventListener('click', () => {
    showPopup(overview)
    overviewPic.src = item.link
    overviewCaption.textContent = item.name
  })
  const newDeleteBtn = newCard.querySelector('.card__trash-btn')
  const newLikeBtn = newCard.querySelector('.card__like-btn')
  // Добавляем кнопке "удалить" листнер на удаление карточек
  newDeleteBtn.addEventListener('click', () => {
    newCard.remove()
  })
  // Добавляем кнопке "лайк" листнер на лайк карточек
  newLikeBtn.addEventListener('click', () => {
    switchLikeBtn(newLikeBtn)
  })
  return newCard
}
// Добавляет карточки и оживляет кнопки "лайк" и "удалить карточку"
const renderCard = item => {
  const newCard = createCard(item)
  cardsContainer.prepend(newCard)
}
// Показывает попап
const showPopup = popup => {
  popup.classList.add('popup_opened')
}
// Закрывает попап
const hidePopup = popup => {
  popup.classList.remove('popup_opened')
}
// Заполняет поля формы данными со страницы
const fillProfileForm = () => {
  nameInput.setAttribute('value', profileName.textContent)
  descriptionInput.setAttribute('value', profileDescription.textContent)
}
// Обработчик формы редакторования профиля
const editFormSubmitHandler = evt => {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value
  hidePopup(popupEdit)
}
// Изменяет вид кнопки "лайк"
const switchLikeBtn = newLikeBtn => {
  newLikeBtn.classList.toggle('card__like-btn_active')
}
// Обработчик формы добавления карточек
const addFormSubmitHandler = evt => {
  evt.preventDefault()
  const newCard = {}
  newCard.name = popupAddCardName.value
  newCard.link = popupAddCardDescription.value
  renderCard(newCard)
  popupAddCardName.value = ''
  popupAddCardDescription.value = ''
  hidePopup(popupAdd)
}
// Рендерит стартовые 6 карточек
initialCards.forEach(item => {
  renderCard(item)
})
// Добавляет обработчики:
popupEditCloseBtn.addEventListener('click', () => {
  hidePopup(popupEdit)
})
overviewCloseBtn.addEventListener('click', () => {
  hidePopup(overview)
})
popupAdd.querySelector('.popup__close-pic').addEventListener('click', () => {
  hidePopup(popupAdd)
})
editBtn.addEventListener('click', () => {
  showPopup(popupEdit)
  fillProfileForm()
})
addBtn.addEventListener('click', () => {
  showPopup(popupAdd)
})
editForm.addEventListener('submit', evt => {
  editFormSubmitHandler(evt)
})
popupAdd.querySelector('.popup__form').addEventListener('submit', evt => {
  addFormSubmitHandler(evt)
})
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    hidePopup(popupAdd)
    hidePopup(overview)
    hidePopup(popupEdit)
  }
})
popups.forEach(popup => {
  popup.addEventListener('click', event => {
    hidePopup(popup)
  })
})
