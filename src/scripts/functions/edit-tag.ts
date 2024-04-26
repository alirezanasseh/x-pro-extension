import { env } from "../../env";
import { EditTagUI } from "../ui/edit-tag";
import { AddTag } from "../ui/add-tag";
import { create } from "./new-tag";
import { GetFromStorage } from "./get-from-storage";

async function save(id: string, name: string) {
  const token = await GetFromStorage(env.TOKEN);
  const response = await fetch(`${env.BACKEND_URL}/tags`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, name }),
  });
  if (!response.ok) return null;
  return response.json();
}

async function remove(id: string) {
  const token = await GetFromStorage(env.TOKEN);
  const response = await fetch(`${env.BACKEND_URL}/tags/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) return null;
  return response.json();
}

function showAddTag() {
  const tagsContainer = document.querySelector(".tags-container");
  if (tagsContainer) {
    tagsContainer.appendChild(AddTag(create));
  }
}

export function EditTag(id: string) {
  const tagEl = document.getElementById(id);
  if (!tagEl) return;

  // Hide new tag input
  const newTagEl = document.getElementById("new-tag");
  if (newTagEl) newTagEl.remove();

  const tagName = tagEl.innerText;
  const addTagEl = document.getElementById("add-tag");
  if (addTagEl) addTagEl.remove();

  const { editTag, editTagInput } = EditTagUI({
    id,
    name: tagName,
    save: async (id, name) => {
      const editTag = document.getElementById(`edit-${id}`);
      if (!editTag) {
        showAddTag();
        return;
      }
      if (!name || name === tagName) {
        tagEl.innerText = tagName;
        editTag.remove();
        tagEl.style.display = "block";
        showAddTag();
        return;
      }
      const tag = await save(id, name);
      if (!tag) {
        tagEl.innerText = tagName;
        editTag.remove();
        tagEl.style.display = "block";
        showAddTag();
        return;
      }
      tagEl.innerText = name;
      editTag.remove();
      tagEl.style.display = "block";
      showAddTag();
    },
    remove: async (id) => {
      const response = await remove(id);
      if (!response) return;
      editTag.remove();
      tagEl.remove();
      showAddTag();
    },
  });

  tagEl.after(editTag);
  tagEl.style.display = "none";
  editTagInput.focus();
}
