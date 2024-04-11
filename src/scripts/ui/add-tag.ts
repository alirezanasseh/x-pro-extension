export function AddTag(onClick: () => void) {
  const buttonEl = document.createElement("button");
  buttonEl.className = "add-tag";
  buttonEl.classList.add("vazirmatn");
  buttonEl.innerText = "+";
  buttonEl.onclick = onClick;
  return buttonEl;
}
