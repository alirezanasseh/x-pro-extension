import { NewTag } from "../ui/new-tag";
import { Tag } from "../ui/tag";
import { env } from "../../env";
import { GetUsername } from "./get-username";
import { GetToken } from "./get-token";

async function sendTagToServer(tag: string) {
  const token = await GetToken();
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

export function newTag() {
  const addTag = document.querySelector(".add-tag");
  if (addTag) {
    const newTag = NewTag();
    addTag.before(newTag.newTagEl);
    newTag.inputEl.focus();
    newTag.inputEl.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        try {
          const tagId = await sendTagToServer(newTag.inputEl.value);
          const tag = Tag({
            id: tagId,
            name: newTag.inputEl.value,
          });
          newTag.newTagEl.before(tag);
          newTag.newTagEl.remove();
          (addTag as HTMLElement).hidden = false;
        } catch (error) {
          console.error(error);
        }
      }
    });
    // hide add tag button
    (addTag as HTMLElement).hidden = true;
  }
}
