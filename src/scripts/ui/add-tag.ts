export function AddTag(onClick: () => void) {
  const buttonEl = document.createElement("button");
  buttonEl.className = "vazirmatn add-tag";
  buttonEl.id = "add-tag";
  buttonEl.innerText = "+";
  buttonEl.title = "Add tag";
  buttonEl.onclick = onClick;
  return buttonEl;
}
