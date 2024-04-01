export function NewTag() {
  const newTagEl = document.createElement("div");
  newTagEl.className = "new-tag";
  const inputEl = document.createElement("input");
  inputEl.placeholder = "New tag";
  const buttonEl = document.createElement("button");
  buttonEl.innerText = "✔";
  newTagEl.appendChild(inputEl);
  newTagEl.appendChild(buttonEl);
  return { newTagEl, inputEl };
}
