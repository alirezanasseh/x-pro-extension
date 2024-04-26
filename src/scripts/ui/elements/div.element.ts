import { IElementProps } from "./type/element.type";

export function Div(props: IElementProps): HTMLDivElement {
  const div = document.createElement("div");
  div.className = props.className ?? "";
  div.id = props.id ?? "";
  div.innerText = props.innerText ?? "";
  return div;
}
