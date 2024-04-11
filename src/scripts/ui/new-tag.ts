export interface INewTag {
  newTagEl: HTMLDivElement;
  inputEl: HTMLInputElement;
}

export function NewTag(clickFunc: (newTag: INewTag) => void): INewTag {
  const newTagEl = document.createElement("div");
  newTagEl.className = "new-tag";
  const inputEl = document.createElement("input");
  inputEl.placeholder = "New tag";
  inputEl.className = "vazirmatn";
  const buttonEl = document.createElement("button");
  buttonEl.id = "add-tag";
  buttonEl.innerText = "✔";
  buttonEl.className = "vazirmatn";
  buttonEl.onclick = () => clickFunc({ newTagEl, inputEl });
  newTagEl.appendChild(inputEl);
  newTagEl.appendChild(buttonEl);
  return { newTagEl, inputEl };
}
