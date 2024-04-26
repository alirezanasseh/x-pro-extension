export interface IElementProps {
  className?: string;
  id?: string;
  title?: string;
  innerText?: string;
  placeholder?: string;
  onkeydown?: (event: KeyboardEvent) => void;
  onkeyup?: (event: KeyboardEvent) => void;
  onclick?: () => void;
}
