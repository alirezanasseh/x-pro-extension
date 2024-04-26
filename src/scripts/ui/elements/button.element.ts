import { IElementProps } from "./type/element.type";

export function Button(props: IElementProps): HTMLButtonElement {
  const button = document.createElement("button");
  button.className = props.className ?? "";
  button.id = props.id ?? "";
  button.innerText = props.innerText ?? "";
  button.title = props.title ?? "";
  button.onclick = props.onclick ?? null;
  return button;
}
