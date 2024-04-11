import { TagContainer } from "../ui/tag-container";
import { GetTags } from "./get-tags";
import { ITag } from "../types/tag.type";
import { Tag } from "../ui/tag";
import { AddTag } from "../ui/add-tag";
import { create } from "./new-tag";

let url = "";

export function ShowTags() {
  const userNameEl = document.querySelector('[data-testid="UserName"]');
  if (userNameEl) {
    // check if the page is not changed then return
    if (url === window.location.href) {
      return;
    }
    url = window.location.href;
    let tagsContainer = document.querySelector(".tags-container");
    // remove tags container if exists
    if (tagsContainer) {
      tagsContainer.remove();
    }
    tagsContainer = TagContainer();
    userNameEl.after(tagsContainer);
    // Get the tags from the server and show them
    GetTags()
      .then((tags: ITag[]) => {
        tags.forEach((tag) => {
          tagsContainer.appendChild(Tag(tag));
        });
        // Add a button to add a new tag
        tagsContainer.appendChild(AddTag(create));
      })
      .catch((error) => console.error(error));
  }
}
