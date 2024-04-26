import { Div } from "./elements/div.element";
import { AutoCompleteTag } from "../functions/auto-complete-tag";

export interface IEditTag {
  editTag: HTMLDivElement;
  editTagInput: HTMLInputElement;
}

export function EditTagUI(params: {
  id: string;
  name: string;
  save: (id: string, name: string) => void;
  remove: (id: string) => void;
}): IEditTag {
  const { id, name, save, remove } = params;

  const tagEl = document.createElement("div");
  tagEl.id = `edit-${id}`;
  tagEl.className = "new-tag";

  const inputEl = document.createElement("input");
  inputEl.value = name;
  inputEl.className = "vazirmatn tag-input";
  inputEl.onkeyup = AutoCompleteTag;
  inputEl.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    save(id, inputEl.value);
  });

  const btnSave = document.createElement("button");
  btnSave.id = "edit-tag";
  btnSave.innerText = "✔";
  btnSave.className = "vazirmatn";
  btnSave.title = "Save";
  btnSave.onclick = () => save(id, inputEl.value);

  const btnRemove = document.createElement("button");
  btnRemove.id = "remove-tag";
  btnRemove.innerText = "X";
  btnRemove.className = "vazirmatn";
  btnRemove.title = "Remove tag";
  btnRemove.onclick = () => remove(id);

  const autoCompleteListEl = Div({
    className: "auto-complete-list",
    id: "auto-complete-list",
  });

  tagEl.appendChild(inputEl);
  tagEl.appendChild(autoCompleteListEl);
  tagEl.appendChild(btnSave);
  tagEl.appendChild(btnRemove);
  return { editTag: tagEl, editTagInput: inputEl };
}
