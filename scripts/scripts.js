const popupCloseBtn = document.querySelector('.popup__close-btn')
const popup = document.querySelector('.popup')
const editBtn = document.querySelector('.profile__edit-btn')
const nameInput = document.querySelector('.popup__input_data_name')
const descriptionInput = document.querySelector('.popup__input_data_description')
const profileName = document.querySelector('.profile__name')
const profileDescription = document.querySelector('.profile__description')
const form = document.querySelector('.popup__form')
const addBtn = document.querySelector('.profile__add-btn')
const popupTitle = document.querySelector('.popup__title')
const cardTemplate = document.querySelector('#template').content
const cardsContainer = document.querySelector('.cards')
const overview = document.querySelector('.overview')
const overviewPic = document.querySelector('.overview__pic')
const overviewCloseBtn = document.querySelector('.overview').querySelector('.popup__close-btn')
const overviewCaption = document.querySelector('.overview__caption')
const popupAdd = document.querySelector('#popup__add-card')
const popupEdit = document.querySelector('#popup__edit-profile')

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
// Добавляет карточки и оживляет кнопки "лайк" и "удалить карточку"
const renderCard = item => {
  // Создаем карточку
  const newCard = cardTemplate.querySelector('.card').cloneNode(true)
  newCard.querySelector('.card__pic').style.backgroundImage = `url("${item.link}")`
  newCard.querySelector('.card__heading').textContent = item.name
  // Делаем интерактивной картинку: по нажатии открывает попап
  let cardPic = newCard.querySelector('.card__pic')
  cardPic.addEventListener('click', () => {
    showPopup(cardPic)
    // Обрезает у значения свойства фона всё лишнее и добавляет фоновую картинку в overview
    overviewPic.src = cardPic.style.backgroundImage.slice(5).slice(0, -2)
    overviewCaption.textContent = newCard.querySelector('.card__heading').textContent
  })
  const newDeleteBtn = newCard.querySelector('.card__trash-btn')
  const newLikeBtn = newCard.querySelector('.card__like-pic')
  // Добавляем кнопке "удалить" листнер на удаление карточек
  newDeleteBtn.addEventListener('click', () => {
    newCard.remove()
  })
  // Добавляем кнопке "лайк" листнер на лайк карточек
  newLikeBtn.addEventListener('click', () => {
    newLikeBtn.src = './images/cards/card__like-active.svg'
  })
  // Вставляем карточки в DOM
  cardsContainer.prepend(newCard)
}
// Показывает попап
const showPopup = button => {
  if (button.classList.contains('card__pic')) {
    overview.classList.add('popup_opened')
    overview.querySelector('.popup__close-btn').addEventListener('click', () => {
      hidePopup(button)
    })
    return
  }
  if (button == addBtn) {
    popupAdd.classList.add('popup_opened')
    popupAdd.querySelector('.popup__close-btn').addEventListener('click', () => {
      hidePopup(button)
    })
    popupAdd.querySelector('.popup__form').addEventListener('submit', () => {
      hidePopup(button)
    })
  } else {
    popup.classList.add('popup_opened')
    // Добавляет листнер и передает ему кнопку, по которой кликнули
    form.addEventListener('submit', evt => {
      const btn = document.querySelector('#popup__edit-profile')
      editFormSubmitHandler(evt, btn)
      evt.preventDefault()
    })
    // Заполняет поля формы данными со страницы
    nameInput.setAttribute('value', profileName.textContent)
    descriptionInput.setAttribute('value', profileDescription.textContent)
  }
}

// Закрывает попап
const hidePopup = button => {
  popupAdd.querySelector('.popup__form').removeEventListener('submit', () => {
    hidePopup(button)
  })
  popupEdit.querySelector('.popup__form').removeEventListener('submit', () => {
    hidePopup(button)
  })
  if (button.classList.contains('card__pic')) {
    overview.classList.remove('popup_opened')
    return
  }
  if (button == addBtn) {
    popupAdd.classList.remove('popup_opened')
    return
  } else {
    popup.classList.remove('popup_opened')
  }
}
// Переписывает данные профиля введенными в форму и закрывает попап
const fillProfile = () => {
  hidePopup(popupEdit.querySelector('.popup__close-pic'))
  profileName.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value
}
// Обработчик формы редакторования профиля
const editFormSubmitHandler = evt => {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value
  hidePopup(popupEdit.querySelector('.popup__close-pic'))
}
// Обработчик формы добавления карточек
function addFormSubmitHandler(evt) {
  evt.preventDefault()
  let newCard = {}
  newCard.name = popupAdd.querySelector('.popup__input_data_name').value
  newCard.link = popupAdd.querySelector('.popup__input_data_description').value
  renderCard(newCard)
  popupAdd.querySelector('.popup__input_data_name').value = ''
  popupAdd.querySelector('.popup__input_data_description').value = ''
  hidePopup(popupAdd.querySelector('.popup__close-pic'))
}
// Рендерит стартовые 6 карточек
initialCards.forEach(item => {
  renderCard(item)
})
// Добавляет обработчики:
popupCloseBtn.addEventListener('click', fillProfile)
popupAdd.querySelector('.popup__form').addEventListener('submit', evt => {
  addFormSubmitHandler(evt)
})
editBtn.addEventListener('click', () => {
  showPopup(editBtn)
})
addBtn.addEventListener('click', () => {
  showPopup(addBtn)
})
overviewCloseBtn.addEventListener('click', () => {
  overview.classList.remove('overview_opened')
})
