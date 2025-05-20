import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

// (if you have CSS-in-JS for reset/headings, import those here)
// import reset from "../styles/reset.css.js";
// import headings from "../styles/headings.css.js";

interface LoginFormData {
  username?: string;
  password?: string;
}

export class LoginFormElement extends LitElement {
  // ---- state & properties ----
  @state()
  private formData: LoginFormData = {};

  @state()
  private error: string = "";

  @property({ type: String })
  api: string = "";

  @property({ type: String })
  redirect: string = "/";

  get canSubmit(): boolean {
    return (
      Boolean(this.api) &&
      Boolean(this.formData.username) &&
      Boolean(this.formData.password)
    );
  }

  // ---- styles ----
  static styles = [
    // reset.styles,
    // headings.styles,
    css`
      form { display: flex; flex-direction: column; }
      button[disabled] { opacity: 0.5; cursor: not-allowed; }
      .error { color: var(--color-error, red); margin-top: 0.5rem; }
    `,
  ];

  // ---- rendering ----
  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `;
  }

  // ---- event handlers ----
  private handleChange(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const { name, value } = input;
    if (name === "username" || name === "password") {
      this.formData = { ...this.formData, [name]: value };
    }
  }

  private handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    this.error = "";

    if (!this.canSubmit) return;

    fetch(this.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.formData),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          const text = await res.text();
          throw new Error(text || "Login failed");
        }
        return res.json();
      })
      .then((json: { token: string }) => {
        const event = new CustomEvent("auth:message", {
          bubbles: true,
          composed: true,
          detail: ["auth/signin", { token: json.token, redirect: this.redirect }],
        });
        this.dispatchEvent(event);
      })
      .catch((err: Error) => {
        this.error = err.message;
      });
  }
}
