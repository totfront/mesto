// Контроллер рендера новых карточек
// 1. Рендерит все стартовые карточки
// 2. Добавляет поштучно новые

export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }
  renderItems = () => {
    this._items.forEach(item => {
      const newItem = this._renderer(item)
      this._container.prepend(newItem)
    })
  }

  addItem = item => {
    this._container.prepend(item)
  }
}
