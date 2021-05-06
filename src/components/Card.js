// Конструктор и контроллер карточек:
// 1. Подготавливает карточку к публикации (создает и наполняет данными)
// 2. Изменяет состояние кнопки "лайк"
// 3. Добавляет слушатели на кнопку "лайк", кнопку "корзина", картинку
// 4. Добавляет карточку в DOM
class Card {
  constructor(data, selector, handleCardClick, deleteCardHandler, api, personalId) {
    this._deleteCardHandler = deleteCardHandler
    this._heading = data.name
    this._image = data.link
    this._id = data._id
    this._likes = data.likes
    this._owner = data.owner
    this._selector = selector
    this._handleCardClick = handleCardClick
    this._api = api
    this._personalId = personalId
    this._isLiked = this._findPersonalLike()
  }
  // Подготавливает карточку к публикации
  _createCard() {
    const newCard = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true)
    const cardPic = newCard.querySelector('.card__pic')
    const newLikeBtn = newCard.querySelector('.card__like-btn')
    const newLikeCounter = newCard.querySelector('.card__like-counter')
    newLikeCounter.textContent = this._likes.length
    cardPic.style.backgroundImage = `url("${this._image}")`
    newCard.querySelector('.card__heading').textContent = this._heading
    this._handleEventListeners(cardPic, newCard)
    // Проверим, мои лайки у карточки, если она новая
    if (this._findPersonalLike()) {
      this._switchLikeBtn(newLikeBtn)
    }
    // Удалим кнопку удаления карточки, если она чужая
    if (this._owner && this._personalId != this._owner._id) {
      const newDeleteBtn = newCard.querySelector('.card__trash-btn')
      newDeleteBtn.remove()
    }
    return newCard
  }
  _handleEventListeners = (cardPic, newCard) => {
    const newDeleteBtn = newCard.querySelector('.card__trash-btn')
    const newLikeBtn = newCard.querySelector('.card__like-btn')
    cardPic.addEventListener('click', () => {
      this._handleCardClick(this._heading, this._image)
    })
    if (newDeleteBtn) {
      // Добавляем кнопке "удалить" листнер на удаление карточек
      newDeleteBtn.addEventListener('click', () => {
        this._deleteCardHandler(newCard, this._id)
      })
    }
    // Добавляем кнопке "лайк" листнер на лайк карточек
    newLikeBtn.addEventListener('click', () => {
      this._changeLikeCount(newCard, newLikeBtn)
    })
  }
  // Ищет среди лайков персональный
  _findPersonalLike() {
    return this._likes.some(like => like._id === this._personalId)
  }
  // Изменяет состояние кнопки "лайк"
  _switchLikeBtn(newLikeBtn) {
    newLikeBtn.classList.toggle('card__like-btn_active')
  }
  _getInitialLikes() {}
  // Изменяет количество лайков в DOM и на сервере
  _changeLikeCount(newCard, newLikeBtn) {
    const likeCounterElement = newCard.querySelector('.card__like-counter')
    const count = likeCounterElement.textContent
    if (count == this._likes.length && !this._findPersonalLike()) {
      this._api
        .putLike(this._id)
        .then(() => {
          likeCounterElement.textContent++
          this._switchLikeBtn(newLikeBtn)
        })
        .catch(err => {
          console.log(err + ' && ' + 'Ошибка при добавлении лайка')
        })
      return
    }
    this._api
      .deleteLike(this._id)
      .then(() => {
        likeCounterElement.textContent--
        this._switchLikeBtn(newLikeBtn)
      })
      .catch(err => {
        console.log(err + ' && ' + 'Ошибка при удалении лайка')
      })
  }
  // Добавляет карточку
  renderCard() {
    const newCard = this._createCard()
    return newCard
  }
}
export { Card }
