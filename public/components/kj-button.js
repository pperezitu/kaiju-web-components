const template = document.createElement("template");
template.innerHTML = `
    <style>
      :host { 
        margin-bottom: 10px; 
        display: block; 
      } 
      button {
        display: inline;
        color: #fff;
        padding: 10px;
        cursor: pointer;
        background: #000;
        border: none;
        border-radius: 5px;
      }
      red {
        background-color: #fb0000;
      }
      red:hover {
        background-color: #d60202;
      }
    </style>

    <button class="$(this.status)" themes="$(this.themes)">
      <slot></slot>
    </button>
  `;
            

class kaijuButton extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    this.$button = this.shadowRoot.querySelector("button");

    let currentStatus = this.getAttribute("status");
    if (currentStatus) {
      this.status = currentStatus;
    } else {
      this.status = "neutral";
    }

  }

  static get observedAttributes() {
    return ["status", "themes"];
  }

  connectedCallback() {
  }

  attributeChangeCallback(attr, oldVal, newVal) {
    console.log("attributeChangedCallback");
    if (attr == "status" && oldVal != newVal) {
      this.status = newVal;
      console.log(this.status);
      this.shadowRoot.innerHTML = this.template;
    }
  }

}

window.customElements.define("kj-button", kaijuButton);