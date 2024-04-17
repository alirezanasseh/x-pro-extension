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
  tagEl.className = "new-tag";

  const inputEl = document.createElement("input");
  inputEl.value = name;
  inputEl.className = "vazirmatn";
  inputEl.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    save(id, inputEl.value);
  });

  const btnSave = document.createElement("button");
  btnSave.id = "edit-tag";
  btnSave.innerText = "✔";
  btnSave.className = "vazirmatn";
  btnSave.onclick = () => save(id, inputEl.value);

  const btnRemove = document.createElement("button");
  btnRemove.id = "remove-tag";
  btnRemove.innerText = "❌";
  btnRemove.className = "vazirmatn";
  btnRemove.onclick = () => remove(id);

  tagEl.appendChild(inputEl);
  tagEl.appendChild(btnSave);
  return { editTag: tagEl, editTagInput: inputEl };
}
