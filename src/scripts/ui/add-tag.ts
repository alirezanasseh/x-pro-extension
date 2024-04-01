export function AddTag(onClick: () => void) {
  const buttonEl = document.createElement("button");
  buttonEl.className = "add-tag";
  buttonEl.innerText = "+";
  buttonEl.onclick = onClick;
  return buttonEl;
}
