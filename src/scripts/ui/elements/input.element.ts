import { IElementProps } from "./type/element.type";

export function Input(props: IElementProps): HTMLInputElement {
  const input = document.createElement("input");
  input.className = props.className ?? "";
  input.id = props.id ?? "";
  input.placeholder = props.placeholder ?? "";
  input.title = props.title ?? "";
  input.onkeyup = props.onkeyup ?? null;
  input.onkeydown = props.onkeydown ?? null;
  return input;
}
