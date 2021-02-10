const template = document.createElement('template');
template.innerHTML = "It works!";

class kaijuInput extends HTMLElement {

    constructor(){
        super();
    };

}

window.customElements.define('kj-input', kaijuInput);
