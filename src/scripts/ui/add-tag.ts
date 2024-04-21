export function AddTag(onClick: () => void) {
  const buttonEl = document.createElement("button");
  buttonEl.className = "add-tag";
  buttonEl.id = "add-tag";
  buttonEl.classList.add("vazirmatn");
  buttonEl.innerText = "+";
  buttonEl.title = "Add tag";
  buttonEl.onclick = onClick;
  return buttonEl;
}
