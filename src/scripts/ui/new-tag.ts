import { Div } from "./elements/div.element";
import { Input } from "./elements/input.element";
import { Button } from "./elements/button.element";
import { AutoCompleteTag } from "../functions/auto-complete-tag";

export interface INewTag {
  newTagEl: HTMLDivElement;
  inputEl: HTMLInputElement;
}

export function NewTag(clickFunc: (newTag: INewTag) => void): INewTag {
  const newTagEl = Div({
    className: "new-tag",
    id: "new-tag",
  });
  const inputEl = Input({
    className: "vazirmatn tag-input",
    placeholder: "New tag",
    onkeyup: AutoCompleteTag,
  });
  const buttonEl = Button({
    id: "add-tag",
    innerText: "✔",
    className: "vazirmatn",
    title: "Save",
    onclick: () => clickFunc({ newTagEl, inputEl }),
  });
  const autoCompleteListEl = Div({
    className: "auto-complete-list",
    id: "auto-complete-list",
  });
  newTagEl.appendChild(inputEl);
  newTagEl.appendChild(buttonEl);
  newTagEl.appendChild(autoCompleteListEl);
  return { newTagEl, inputEl };
}
