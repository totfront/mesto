import { cardTemplate, cardsContainer } from './index.js'

export class Card {
  constructor(data, selector) {
    this._heading = data.name
    this._image = data.link
    this._selector = selector
  }
  // Создает карточку и наполняет её
  _createCard(item) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true)
    const cardPic = newCard.querySelector('.card__pic')
    // Наполняет карточку
    cardPic.style.backgroundImage = `url("${this._image}")`
    newCard.querySelector('.card__heading').textContent = this._heading
    cardPic.addEventListener('click', () => {
      this.showPopup(overview)
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
      this._switchLikeBtn(newLikeBtn)
    })
    return newCard
  }

  // Обработчик формы редакторования профиля
  _editFormSubmitHandler(evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
    this._hidePopup(popupEdit)
  }
  // Изменяет вид кнопки "лайк"
  _switchLikeBtn(newLikeBtn) {
    newLikeBtn.classList.toggle('card__like-btn_active')
  }
  // Обработчик формы добавления карточек
  _addFormSubmitHandler(evt) {
    evt.preventDefault()
    const newCard = {}
    newCard.name = popupAddCardName.value
    newCard.link = popupAddCardDescription.value
    this._renderCard(newCard)
    popupAddCardName.value = ''
    popupAddCardDescription.value = ''
    this._hidePopup(popupAdd)
  }
  // Добавляет карточку
  renderCard(item) {
    const newCard = this._createCard(item)
    cardsContainer.prepend(newCard)
  }
}
