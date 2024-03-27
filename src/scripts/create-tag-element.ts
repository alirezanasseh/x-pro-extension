export function CreateTagElement(name: string) {
  const tagsEl = document.createElement("div");
  tagsEl.className = 'tag';
  tagsEl.innerText = name;
  return tagsEl;
}
