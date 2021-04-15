// Конструктор и контроллер карточек:
// 1. Подготавливает карточку к публикации (создает и наполняет данными)
// 2. Изменяет состояние кнопки "лайк"
// 3. Добавляет слушатели на кнопку "лайк", кнопку "корзина", картинку
// 4. Добавляет карточку в DOM

class Card {
  constructor(data, selector, handleCardClick) {
    this._heading = data.name
    this._image = data.link
    this._selector = selector
    this._handleCardClick = handleCardClick
    this._likesCounter = data.likes.length
  }
  // Подготавливает карточку к публикации
  _createCard() {
    const newCard = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true)
    const cardPic = newCard.querySelector('.card__pic')
    const cardLikes = newCard.querySelector('.card__like-counter')
    cardPic.style.backgroundImage = `url("${this._image}")`
    newCard.querySelector('.card__heading').textContent = this._heading
    cardLikes.textContent = this._likesCounter
    this._handleEventListeners(cardPic, newCard)
    return newCard
  }
  _handleEventListeners = (cardPic, newCard) => {
    const newDeleteBtn = newCard.querySelector('.card__trash-btn')
    const newLikeBtn = newCard.querySelector('.card__like-btn')
    // Добавляет слушатель на функцию, куда нужно передать подпись и ссылку на картинку
    cardPic.addEventListener('click', () => {
      this._handleCardClick(this._heading, this._image)
    })
    // Добавляем кнопке "удалить" листнер на удаление карточек
    newDeleteBtn.addEventListener('click', () => {
      newCard.remove()
    })
    // Добавляем кнопке "лайк" листнер на лайк карточек
    newLikeBtn.addEventListener('click', () => {
      this._switchLikeBtn(newLikeBtn)
      this._switchLikeCounter(newCard)
    })
  }
  // Изменяет состояние кнопки "лайк"
  _switchLikeBtn(newLikeBtn) {
    newLikeBtn.classList.toggle('card__like-btn_active')
  }
  // Счетчик лайков
  // _switchLikeCounter(newCard) {
  //   this._counter++
  //   const newLikeBtn = newCard.querySelector('.card__like-counter')
  //   console.log('x============')
  //   console.log(this._counter)
  // }
  // Добавляет карточку
  renderCard() {
    const newCard = this._createCard()
    return newCard
  }
}
export { Card }
