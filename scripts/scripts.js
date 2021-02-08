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
const popupTitles = {
  profileEditor: 'Редактировать профиль',
  cardRenderer: 'Новое место'
}
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

// Добавляет 6 карточек при загрузке страницы
const cardsRenderer = item => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true)
  newCard.querySelector('.card__pic').src = initialCards[item].link
  newCard.querySelector('.card__pic').alt = initialCards[item].name
  newCard.querySelector('.card__heading').textContent = initialCards[item].name
  cardsContainer.appendChild(newCard)
  console.log(cardsContainer)
  return console.log(newCard)
}

for (let i = 0; i < initialCards.length; i++) {
  cardsRenderer(i)
}

// Показывает попап
const showPopup = () => {
  popup.classList.add('popup_opened')
}

// Показывает попап редактор профиля
const showProfileEditor = () => {
  showPopup()
  popupCloseBtn.addEventListener('click', profileFiller)
  // Заполняет поля формы данными со страницы
  nameInput.setAttribute('value', profileName.textContent)
  descriptionInput.setAttribute('value', profileDescription.textContent)
  console.log('Редактор профиля')
}

// Показывает попап с добавлением карточек
const showCardRendered = () => {
  showPopup()
  console.log('Добавление карточек')
  popupTitle.textContent = popupTitles.cardRenderer
  popupCloseBtn.addEventListener('click', hidePopup)
  nameInput.setAttribute('placeholder', 'Название карточек')
  descriptionInput.setAttribute('placeholder', 'Ссылка на изображение')
}

// Закрывает попап
const hidePopup = () => {
  popup.classList.remove('popup_opened')
  console.log(123)
}

// Переписывает данные на странице введенными в форму и закрывает попап
const profileFiller = () => {
  hidePopup()
  profileName.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value
}

// Обработчик «отправки» формы (пока не работает)
function formSubmitHandler(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value
  hidePopup()
}
// Добавляем обработчики:
form.addEventListener('submit', formSubmitHandler)
editBtn.addEventListener('click', showProfileEditor)
addBtn.addEventListener('click', showCardRendered)
