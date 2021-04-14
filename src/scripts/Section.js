// Контроллер рендера новых карточек
// 1. Рендерит все стартовые карточки
// 2. Добавляет поштучно новые

export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector)
    this._items = items
    this._renderer = newCardData => {
      const newCard = renderer(newCardData)
      this._container.prepend(newCard)
    }
  }
  renderItems = () => {
    this._items.forEach(newCardData => {
      this._renderer(newCardData)
    })
  }
  addItem = newCard => {
    this._container.prepend(newCard)
  }
}
