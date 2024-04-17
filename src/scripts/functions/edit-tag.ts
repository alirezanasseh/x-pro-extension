import { env } from "../../env";
import { EditTagUI } from "../ui/edit-tag";

async function save(id: string, name: string) {
  const response = await fetch(`${env.BACKEND_URL}/tags`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name }),
  });
  if (!response.ok) return null;
  return response.json();
}

async function remove(id: string) {
  const response = await fetch(`${env.BACKEND_URL}/tags/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) return null;
  return response.json();
}

export function EditTag(id: string) {
  const tagEl = document.getElementById(id);
  if (!tagEl) return;
  const tagName = tagEl.innerText;

  const { editTag, editTagInput } = EditTagUI({
    id,
    name: tagName,
    save: async (id, name) => {
      if (!name || name === tagName) {
        tagEl.innerText = tagName;
        tagEl.replaceWith(tagEl);
        return;
      }
      const tag = await save(id, name);
      if (!tag) {
        tagEl.innerText = tagName;
        tagEl.replaceWith(tagEl);
        return;
      }
      tagEl.innerText = name;
      tagEl.replaceWith(tagEl);
    },
    remove: async (id) => {
      const response = await remove(id);
      if (!response) return;
      tagEl.remove();
    },
  });

  tagEl.replaceWith(editTag);
  editTagInput.focus();
}
