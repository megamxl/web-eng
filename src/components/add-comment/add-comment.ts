import { showToast } from '../../utils.ts';

import html from "./add-comment.html?raw";
import css from "./styles.css?raw";

export class AddComment extends HTMLElement {

  private shadow!: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

async connectedCallback() {

    const template = document.createElement('template') as HTMLTemplateElement;
    template.innerHTML = `<style>${css}</style>${html}`;
    this.shadow.appendChild(template.content.cloneNode(true));

    // Attach logic
    const form = this.shadow.querySelector('.comment-form') as HTMLFormElement;
    const button = this.shadow.querySelector('.show-hide') as HTMLButtonElement;
    const wrapper = this.shadow.querySelector('.comment-wrapper') as HTMLDivElement;
    const nameField = this.shadow.querySelector('#name') as HTMLInputElement;
    const commentField = this.shadow.querySelector('#comment') as HTMLInputElement;
    const list = this.shadow.querySelector('.comment-container') as HTMLUListElement;

    // Handle submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!nameField.value.trim() || !commentField.value.trim()) {
        showToast('Name and Comment must be filled');
        return;
      }

      const li = document.createElement('li');
      li.tabIndex  = 0
      li.innerHTML = `<p><strong>${nameField.value}</strong></p><p>${commentField.value}</p>`;
      list.appendChild(li);

      nameField.value = '';
      commentField.value = '';
    });

    // Handle show/hide toggle
    wrapper.style.display = 'none';
    button.addEventListener('click', () => {
      const hidden = wrapper.style.display === 'none';
      wrapper.style.display = hidden ? 'block' : 'none';
      button.textContent = hidden ? 'Hide comments' : 'Show comments';
    });
  }
}


customElements.define('add-comment', AddComment);