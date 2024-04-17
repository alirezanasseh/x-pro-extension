import { EditTag } from "../functions/edit-tag";

export function Tag(params: { id: string; name: string }) {
  const { id, name } = params;
  const tagsEl = document.createElement("div");
  tagsEl.className = "tag";
  tagsEl.classList.add("vazirmatn");
  tagsEl.innerText = name;
  tagsEl.id = id;
  tagsEl.onclick = () => {
    EditTag(id);
  };
  return tagsEl;
}
