// Конструктор и контроллер карточек:
// 1. Подготавливает карточку к публикации (создает и наполняет данными)
// 2. Изменяет состояние кнопки "лайк"
// 3. Добавляет слушатели на кнопку "лайк", кнопку "корзина", картинку
// 4. Добавляет карточку в DOM

class Card {
  constructor(data, selector, handleCardClick, handleDeleteBtnClick, likesApi) {
    this._heading = data.name
    this._image = data.link
    this._selector = selector
    this._handleDeleteBtnClick = handleDeleteBtnClick
    this._handleCardClick = handleCardClick
    this._personalId = '5e7c90c2d461fc6a9589e831'
    this._trashBtnTemplate = '<button class="card__trash-btn"></button>'
    this._cardId = data.cardId
    this._likeApi = likesApi
    // Если карточка уже есть на сервере пишем её id
    if (data.cardId) {
      this._cardId = data.cardId
    }
    // Записываем создателя карточки с сервера
    if (data.owner) {
      this._cardOwner = data.owner
    } else {
      // Если нет, пишем себя
      this._cardOwner = {
        _id: this._personalId
      }
    }
    // Лайки добавляются только старым карточкам
    if (data.likes) {
      this._likesCounter = data.likes.length
    }
  }
  // Подготавливает карточку к публикации
  _createCard() {
    const cardTemplate = document.querySelector(this._selector).content.querySelector('.card')
    let newCard = cardTemplate.cloneNode(true)
    // Удаляем кнопку удалить карточку у не моих карточек
    if (this._cardOwner._id != this._personalId) {
      newCard.querySelector('.card__trash-btn').remove()
    }
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
    // Добавляем кнопке "удалить" листнер на удаление карточек, если мы владельцы карты
    if (this._cardOwner._id == this._personalId) {
      newDeleteBtn.addEventListener('click', () => {
        const newCardData = {
          id: this._cardId,
          owner: {
            id: this._cardOwner._id
          }
        }
        this._handleDeleteBtnClick(newCard, newCardData)
      })
    }
    // Добавляем кнопке "лайк" листнер на лайк карточек
    newLikeBtn.addEventListener('click', () => {
      this._switchLikeBtn(newLikeBtn)
      this._countLike(newCard)
    })
  }
  // Изменяет состояние кнопки "лайк"
  _switchLikeBtn(newLikeBtn) {
    newLikeBtn.classList.toggle('card__like-btn_active')
  }
  // Увеличивает или уменьшает лайк на 1
  _countLike(newCard) {
    const cardLikes = newCard.querySelector('.card__like-counter')
    if (cardLikes.textContent == this._likesCounter + 1) {
      cardLikes.textContent = this._likesCounter
      this._likeApi.deleteLike(this._cardId)
      return
    }
    cardLikes.textContent = this._likesCounter + 1
    this._likeApi.postLike(this._cardId)
  }
  // Добавляет карточку
  renderCard() {
    const newCard = this._createCard()
    return newCard
  }
}
export { Card }
