// Конструктор и контроллер карточек:
// 1. Подготавливает карточку к публикации (создает и наполняет данными)
// 2. Изменяет состояние кнопки "лайк"
// 3. Добавляет слушатели на кнопку "лайк", кнопку "корзина", картинку
// 4. Добавляет карточку в DOM

class Card {
  constructor(data, selector, handleCardClick, deleteCardHandler, api) {
    this._deleteCardHandler = deleteCardHandler
    this._heading = data.name
    this._image = data.link
    this._id = data._id
    this._selector = selector
    this._handleCardClick = handleCardClick
    this._api = api
  }
  // Подготавливает карточку к публикации
  _createCard() {
    const newCard = document.querySelector(this._selector).content.querySelector('.card').cloneNode(true)
    const cardPic = newCard.querySelector('.card__pic')
    cardPic.style.backgroundImage = `url("${this._image}")`
    newCard.querySelector('.card__heading').textContent = this._heading
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
      this._deleteCardHandler(newCard)
    })
    // Добавляем кнопке "лайк" листнер на лайк карточек
    newLikeBtn.addEventListener('click', () => {
      this._switchLikeBtn(newLikeBtn)
      this._changeLikeCount()
    })
  }
  // Изменяет состояние кнопки "лайк"
  _switchLikeBtn(newLikeBtn) {
    newLikeBtn.classList.toggle('card__like-btn_active')
  }
  // Изменяет количество лайков в DOM и на сервере
  _changeLikeCount() {
    console.log('this._id============')
    console.log(this._id)
    this._api.putLike(this._id)
  }
  // Добавляет карточку
  renderCard() {
    const newCard = this._createCard()
    return newCard
  }
}
export { Card }
