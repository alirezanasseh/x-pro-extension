export function HideOnClickOutside(element: HTMLElement) {
  const outsideClickListener = (event: any) => {
    if (!element.contains(event.target) && isVisible(element)) {
      // or use: event.target.closest(selector) === null
      element.style.display = "none";
      removeClickListener();
    }
  };

  const removeClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };

  document.addEventListener("click", outsideClickListener);
}

const isVisible = (elem: HTMLElement) =>
  !!elem &&
  !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
