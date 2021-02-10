class kaijuButton extends HTMLElement {
  get template() {
    return `
            <style>
                div {
                    display: inline-block;
                    color: #fff;
                    padding: 10px;
                    cursor: pointer;
                    background: #000;
                }
            </style>

            <div class="$(this.status)">
                <slot></slot>
            </div>
        `;
  }

  constructor() {
    super();
    let currentStatus = this.getAttribute("status");
    if (currentStatus) {
      this.status = currentStatus;
    } else {
      this.status = "neutral";
    }
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = this.template;
  }

  static get observedAttributes() {
    return ["status"];
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
