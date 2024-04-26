import { Div } from "./elements/div.element";

export function AutoCompleteItem(tag: string): HTMLDivElement {
  return Div({
    className: "vazirmatn auto-complete-item",
    innerText: tag,
  });
}
