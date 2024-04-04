export function ClearTags() {
  const tagsContainer = document.querySelector(".tags-container");
  if (tagsContainer) {
    tagsContainer.remove();
  }
}
