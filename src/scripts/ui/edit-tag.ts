import { Div } from "./elements/div.element";
import { AutoCompleteTag } from "../functions/auto-complete-tag";
import { Button } from "./elements/button.element";
import { Input } from "./elements/input.element";

export interface IEditTag {
  editTag: HTMLDivElement;
  editTagInput: HTMLInputElement;
}

export function EditTagUI(params: {
  id: string;
  name: string;
  save: (id: string, name: string) => void;
  remove: (id: string) => void;
  cancel: () => void;
}): IEditTag {
  const { id, name, save, remove, cancel } = params;

  const tagEl = Div({
    className: "new-tag",
    id: `edit-${id}`,
  });

  const inputEl = Input({
    value: name,
    className: "vazirmatn tag-input",
    onkeyup: AutoCompleteTag,
    onkeydown: (event) => {
      if (event.key !== "Enter") return;
      save(id, inputEl.value);
    },
  });

  const btnSave = Button({
    id: "edit-tag",
    innerText: "✔",
    className: "vazirmatn",
    title: "Save",
    onclick: () => save(id, inputEl.value),
  });

  const btnRemove = Button({
    id: "remove-tag",
    innerText: "🗑",
    className: "vazirmatn",
    title: "Remove tag",
    onclick: () => remove(id),
  });

  const btnCancel = Button({
    id: "cancel-edit-tag",
    innerText: "🗙",
    className: "vazirmatn",
    title: "Cancel",
    onclick: cancel,
  });

  const autoCompleteListEl = Div({
    className: "auto-complete-list",
    id: "auto-complete-list",
  });

  tagEl.appendChild(inputEl);
  tagEl.appendChild(autoCompleteListEl);
  tagEl.appendChild(btnSave);
  tagEl.appendChild(btnCancel);
  tagEl.appendChild(btnRemove);

  return { editTag: tagEl, editTagInput: inputEl };
}
