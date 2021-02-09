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
const template = 1
let likeBtnPic
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
// Добавляет карточки и оживляет кнопку "лайк"
const cardsRenderer = item => {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true)
  newCard.querySelector('.card__pic').style.backgroundImage = `url("${item.link}")`
  newCard.querySelector('.card__heading').textContent = item.name
  cardsContainer.prepend(newCard)
  // Добавляем карточкам ID
  newCard.id = `card_${cardsContainer.childElementCount - template}`
  // Находим лайк и добавляем ему событие
  likeBtnPic = document.querySelector('.card__like-pic')
  likeBtnPic.id = cardsContainer.childElementCount - template
  likeBtnPic.addEventListener('click', () => {
    fillLikePic(newCard)
  })
}
// Показывает попап
const showPopup = () => {
  popup.classList.add('popup_opened')
}
// Показывает попап редактор профиля
const showProfileEditor = () => {
  showPopup()
  // Добавляем обработчики событий для попапа редактора профиля
  popupCloseBtn.addEventListener('click', profileFiller)
  // Заполняет поля формы данными со страницы
  nameInput.setAttribute('value', profileName.textContent)
  descriptionInput.setAttribute('value', profileDescription.textContent)
}
// Показывает попап с добавлением карточек
const showCardRendered = () => {
  showPopup()
  // Добавляем обработчики событий для попапа добавления карточек
  popupTitle.textContent = popupTitles.cardRenderer
  popupCloseBtn.addEventListener('click', hidePopup)
  nameInput.value = ''
  descriptionInput.value = ''
  nameInput.setAttribute('placeholder', 'Название карточек')
  descriptionInput.setAttribute('placeholder', 'Ссылка на изображение')
}
// Закрывает попап
const hidePopup = () => {
  popup.classList.remove('popup_opened')
}
// Переписывает данные профиля введенными в форму и закрывает попап
const profileFiller = () => {
  hidePopup()
  profileName.textContent = nameInput.value
  profileDescription.textContent = descriptionInput.value
  // Убираем обработчики событий, чтобы они не работали в попапе добавления карточек
  popupCloseBtn.removeEventListener('click', profileFiller)
}
// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  if (popupTitle.textContent == 'Новое место') {
    const newCard = {
      name: `${nameInput.value}`,
      link: `${descriptionInput.value}`
    }
    cardsRenderer(newCard)
  } else {
    profileName.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
  }
  evt.preventDefault()
  hidePopup()
}
// Наполняет цветом лайк
const fillLikePic = newCard => {
  const likePic = newCard.querySelector('.card__like-pic')
  const cardId = newCard.id[5]
  if (cardId == likePic.id) {
    likePic.src = './images/cards/card__like-active.svg'
  }
}
// Рендерим стартовые 6 карточек
initialCards.forEach(item => {
  cardsRenderer(item)
})
// Добавляем обработчики:
editBtn.addEventListener('click', showProfileEditor)
addBtn.addEventListener('click', showCardRendered)
form.addEventListener('submit', formSubmitHandler)
