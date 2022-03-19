export default class Spinner {
#spinnerElement
    constructor(idSpinner) {
        this.#spinnerElement = document.getElementById(idSpinner);
    }
    start() {
        this.#spinnerElement.hidden = false;
        this.#spinnerElement.innerHTML = `<div class="position-absolute top-50 start-50 translate-middle">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div></div>`;
    }
    stop() {
        this.#spinnerElement.hidden = true;
        this.#spinnerElement.innerHTML = ``;
    }
}