export function Tag(params: { id: string; name: string }) {
  const { id, name } = params;
  const tagsEl = document.createElement("div");
  tagsEl.className = "tag";
  tagsEl.innerText = name;
  tagsEl.id = id;
  return tagsEl;
}
