import { overview, showPopup, overviewPic, overviewCaption } from './index.js'

const cardTemplate = document.querySelector('#template').content
const cardsContainer = document.querySelector('.cards')

class Card {
  constructor(data, selector) {
    this._heading = data.name
    this._image = data.link
    this._selector = selector
  }
  // Подготавливает карточку к публикации
  _createCard() {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true)
    const cardPic = newCard.querySelector('.card__pic')
    cardPic.style.backgroundImage = `url("${this._image}")`
    newCard.querySelector('.card__heading').textContent = this._heading
    this._handleEventListeners(cardPic, newCard)
    return newCard
  }

  _handleEventListeners = (cardPic, newCard) => {
    const newDeleteBtn = newCard.querySelector('.card__trash-btn')
    const newLikeBtn = newCard.querySelector('.card__like-btn')
    // Добавляет слушатель на попап с фуллсайз превью карточки и записывает в него текст с картинкой
    cardPic.addEventListener('click', () => {
      showPopup(overview)
      overviewPic.src = this._image
      overviewCaption.textContent = this._heading
    })
    // Добавляем кнопке "удалить" листнер на удаление карточек
    newDeleteBtn.addEventListener('click', () => {
      newCard.remove()
    })
    // Добавляем кнопке "лайк" листнер на лайк карточек
    newLikeBtn.addEventListener('click', () => {
      this._switchLikeBtn(newLikeBtn)
    })
  }

  // Изменяет вид кнопки "лайк"
  _switchLikeBtn(newLikeBtn) {
    newLikeBtn.classList.toggle('card__like-btn_active')
  }
  // Добавляет карточку
  renderCard(item) {
    const newCard = this._createCard(item)
    return newCard
  }
}

export { Card, cardsContainer }
