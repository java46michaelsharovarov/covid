export default class NavigatorButtons {
    #buttonsElements
    #curButton
    constructor() {
        this.#buttonsElements = Array.from(document.querySelectorAll(`nav button`)).map(e => e = e.id);
    }
    setActive(index) {  
            if(this.#curButton >= 0) {
                document.querySelector(`#${this.#buttonsElements[this.#curButton]}`).classList.remove("bg-primary");
            }
                document.querySelector(`#${this.#buttonsElements[index]}`).classList.add("bg-primary");
                this.#curButton = index;
        }  
}    