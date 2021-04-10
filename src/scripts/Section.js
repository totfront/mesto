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
    // рендерит элементы
    this._items.forEach(item => {
      const newItem = this._renderer(item)
      this.addItem(newItem)
    })
  }

  addItem = item => {
    // принимает DOM-элемент и добавляет его в контейнер.
    this._container.prepend(item)
  }
}
