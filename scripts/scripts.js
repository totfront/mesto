let popupCloseBtn = document.querySelector('.popup__close-btn')
let popup = document.querySelector('.popup')
let editBtn = document.querySelector('.profile__edit-btn')
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_description')
let profileName = document.querySelector('.profile__name')
let profileDescription = document.querySelector('.profile__description')
let form = document.querySelector('.popup__form')
// Показывает popup
let showPopup = () => {
  if (popup.classList.contains('popup_opened') == 0)  {
    popup.classList.add('popup_opened')
  }
  // Заполняет поля формы данными со страницы
  nameInput.setAttribute('value', profileName.textContent)
  jobInput.setAttribute('value', profileDescription.textContent)
}
// Прячет попап и заполняет профиль новыми данными
let hidePopup = () => {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened')
  }
  // Переписывает данные на странице введенными в форму
  profileName.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
}
// Обработчик «отправки» формы (пока не работает)
function formSubmitHandler(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  hidePopup()
}
// Прикрепляем обработчики:
form.addEventListener('submit', formSubmitHandler)
popupCloseBtn.addEventListener('click', hidePopup)
editBtn.addEventListener('click', showPopup)
