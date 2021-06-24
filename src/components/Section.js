export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item));
    }

    // Prepend newly created cards
    addNewItem(element) {
        this._container.prepend(element);
    }

    // Append loaded cards from server
    addItem(element) {
        this._container.append(element);
    }
}