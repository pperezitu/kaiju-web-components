const template3 = document.createElement("template");
template3.innerHTML = `
    <style> 
        :host { 
            margin-bottom: 10px; 
            display: block; 
        } 
        .invalid-field { 
            border: 1px solid red; 
        } 
        .invalid-field:focus { 
            outline-color: red; 
        } 
        .form-field { 
            display: block; 
        }
        input { 
          display: block;
          width: 100%;
          padding: 0.375rem 0.75rem;
          font-family: Mont;
          font-size: 13px;
          font-weight: 400;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          box-sizing: border-box;
          height: 50px; 
        } 
        label { 
          display: inline-block;
          margin-bottom: 0.5rem;
          font-size: 15px;
          color: #000;
        } 
        .error { 
          display: block;
          margin-top: 10px;
          font-size: 13px;
          font-style: italic; 
        } 
        .hidden { 
            display: none; 
        } 
        ::slotted(span) { 
            color: grey; 
            font-style: italic; 
            padding-left: 10px; 
        } 
    </style> 

    <div class="form-field"> 
            <label></label> 
            <input /> 
            <slot></slot> 
            <span class="error hidden"></span> 
    </div>
  `;

class kaijuInput extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._shadowRoot.appendChild(template3.content.cloneNode(true));
    this.$label = this.shadowRoot.querySelector("label");
    this.$input = this.shadowRoot.querySelector("input");
    this.$error = this.shadowRoot.querySelector(".error");
  }

  static get observedAttributes() {
    return ["value", "label", "type", "error-message", "invalid"];
  }

  connectedCallback() {
    if (this.$input.isConnected) {
      this.$input.addEventListener("blur", (event) => {
        if (!event.target.value && this.hasAttribute("required")) {
          this.invalid = true;
          this.$error.innerText = "This field is required.";
        } else {
          this.invalid = false;
          this.value = event.target.value;
        }
      });
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "label":
        this.$label.innerText = `${newValue}:`;
        break;
      case "type":
        this.$input.type = newValue;
        break;
      case "error-message":
        this.$error.innerText = newValue;
        break;
      case "invalid":
        this._handleInvalidState(newValue);
        break;
      default:
        break;
    }
  }

  get invalid() {
    return this.hasAttribute("invalid");
  }

  set invalid(value) {
    if (!!value) {
      this.setAttribute("invalid", "");
    } else {
      this.removeAttribute("invalid");
    }
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(newValue) {
    this.setAttribute("value", newValue);
  }

  _handleInvalidState(value) {
    if (value !== null) {
      this.$error.classList.remove("hidden");
      this.$input.classList.add("invalid-field");
    } else {
      this.$error.classList.add("hidden");
      this.$input.classList.remove("invalid-field");
    }
  }
}

window.customElements.define("kj-input", kaijuInput);