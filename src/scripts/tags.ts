import { CreateTagElement } from './create-tag-element';

export function showTags() {
  const userNameEl = document.querySelector('[data-testid="UserName"]');
  if (userNameEl) {
    // check if the element with class 'tag' already exists
    const tags = document.querySelector('.tag');
    if (tags) {
      return;
    }
    // add tags container
    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags-container';
    userNameEl.after(tagsContainer);
    const tagsEl = CreateTagElement('Tag 1');
    tagsContainer.appendChild(tagsEl);
  }
}

const observer = new MutationObserver(showTags);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
