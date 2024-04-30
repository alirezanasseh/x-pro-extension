import { Div } from "./elements/div.element";
import { Input } from "./elements/input.element";
import { Button } from "./elements/button.element";
import { AutoCompleteTag } from "../functions/auto-complete-tag";
import { HideOnClickOutside } from "../functions/click-outside";

export function NewTag(params: {
  save: (name: string) => void;
  cancel: () => void;
}) {
  const { save, cancel } = params;

  const newTagEl = Div({
    className: "new-tag",
    id: "new-tag",
  });
  const inputEl = Input({
    className: "vazirmatn tag-input",
    placeholder: "New tag",
    onkeyup: AutoCompleteTag,
    onkeydown: (event) => {
      if (event.key !== "Enter") return;
      save(inputEl.value);
    },
  });
  const btnAdd = Button({
    id: "add-tag",
    innerText: "✔",
    className: "vazirmatn",
    title: "Save",
    onclick: () => save(inputEl.value),
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
  HideOnClickOutside(autoCompleteListEl);

  newTagEl.appendChild(inputEl);
  newTagEl.appendChild(btnAdd);
  newTagEl.appendChild(btnCancel);
  newTagEl.appendChild(autoCompleteListEl);

  return {
    newTagEl,
    inputEl,
  };
}
