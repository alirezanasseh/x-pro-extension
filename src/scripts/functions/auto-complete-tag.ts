import { SearchTags } from "./search-tags";
import { AutoCompleteItem } from "../ui/auto-complete-item";
import { HideOnClickOutside } from "./click-outside";

function EmptyAutoCompleteList(autoCompleteList: HTMLElement) {
  while (autoCompleteList.firstChild) {
    autoCompleteList.removeChild(autoCompleteList.firstChild);
  }
}

export async function AutoCompleteTag(event: KeyboardEvent) {
  const input = event.target as HTMLInputElement;
  const value = input.value;
  if (value.length < 3) {
    const autoCompleteList = document.getElementById("auto-complete-list");
    if (!autoCompleteList) return;
    EmptyAutoCompleteList(autoCompleteList);
    autoCompleteList.style.display = "none";
    return;
  }
  const tags = await SearchTags(value);
  const autoCompleteList = document.getElementById("auto-complete-list");
  if (!autoCompleteList) return;
  EmptyAutoCompleteList(autoCompleteList);
  if (!tags || tags.length === 0) {
    return;
  }
  autoCompleteList.style.display = "block";
  HideOnClickOutside(autoCompleteList);
  tags.forEach((tag) => {
    const autoCompleteItem = AutoCompleteItem(tag.name);
    autoCompleteItem.onclick = () => {
      input.value = tag.name;
      EmptyAutoCompleteList(autoCompleteList);
      autoCompleteList.style.display = "none";
    };
    autoCompleteList.appendChild(autoCompleteItem);
  });
}
