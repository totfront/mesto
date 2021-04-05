export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items
    this._renderer = renderer
    this._containerSelector = containerSelector
  }
  renderItems = () => {
    // рендерит элементы
    this._items.forEach(item => {
      const newItem = this._renderer(item)
      this.addItem(newItem)
      return newItem
    })
  }

  addItem = item => {
    // принимает DOM-элемент и добавляет его в контейнер.
    const container = document.querySelector(this._containerSelector)
    container.prepend(item)
  }
}
