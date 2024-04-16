import { TagContainer } from "./ui/tag-container";
import { GetTags } from "./functions/get-tags";
import { ITag } from "./types/tag.type";
import { Tag } from "./ui/tag";
import { AddTag } from "./ui/add-tag";
import { create } from "./functions/new-tag";

let tagsAreVisible = false;
let url = "";

export function ShowTags() {
  if (url !== window.location.href) {
    tagsAreVisible = false;
    url = window.location.href;
  }
  if (tagsAreVisible) return;
  const userNameEl = document.querySelector('[data-testid="UserName"]');
  if (userNameEl) {
    tagsAreVisible = true;
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

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "showTags") {
    ShowTags();
  }
  return true;
});

const observer = new MutationObserver(ShowTags);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
