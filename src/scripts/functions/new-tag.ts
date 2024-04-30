import { NewTag } from "../ui/new-tag";
import { Tag } from "../ui/tag";
import { env } from "../../env";
import { GetUsername } from "./get-username";
import { GetFromStorage } from "./get-from-storage";

function showAddTag() {
  const addTagEl = document.getElementById("add-tag");
  if (addTagEl) (addTagEl as HTMLElement).hidden = false;
}

async function sendTagToServer(tag: string) {
  tag = tag.trim();
  if (!tag) {
    return;
  }
  const token = await GetFromStorage(env.TOKEN);
  const url = `${env.BACKEND_URL}/tags/add`;
  const username = GetUsername();
  if (!username) {
    throw new Error("No username found");
  }
  const data = {
    name: tag,
    onUsername: username,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Error adding tag");
  }
  const addedTag = await response.json();
  return addedTag.id as string;
}

export function create() {
  const addTag = document.querySelector(".add-tag");
  if (addTag) {
    const { newTagEl, inputEl } = NewTag({
      save: async (name) => {
        try {
          const tagId = await sendTagToServer(name);
          if (tagId) {
            const tag = Tag({
              id: tagId,
              name,
            });
            newTagEl.before(tag);
          }
          newTagEl.remove();
          showAddTag();
        } catch (error) {
          console.error(error);
        }
      },
      cancel: () => {
        newTagEl.remove();
        showAddTag();
      },
    });
    addTag.before(newTagEl);
    inputEl.focus();
    (addTag as HTMLElement).hidden = true;
  }
}
