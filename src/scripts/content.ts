import { TagContainer } from "./ui/tag-container";
import { GetTags } from "./functions/get-tags";
import { ITag } from "./types/tag.type";
import { Tag } from "./ui/tag";
import { AddTag } from "./ui/add-tag";
import { create } from "./functions/new-tag";
import { ClearTags } from "./functions/clear-tags";
import { GetUsername } from "./functions/get-username";

let lastUserNameEl: Element | null = null;
let lastUserName: string | null = null;

export function ShowTags(force: boolean = false) {
  const userNameEl = document.querySelector('[data-testid="UserName"]');
  const userName = GetUsername();
  if (
    !userNameEl ||
    (userNameEl === lastUserNameEl && userName === lastUserName && !force)
  )
    return;
  lastUserNameEl = userNameEl;
  lastUserName = userName;
  if (userNameEl) {
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
        if (!tags) return;
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
  switch (message.action) {
    case "showTags":
      ShowTags(true);
      break;
    case "clearTags":
      ClearTags();
      break;
    default:
      break;
  }
  return true;
});

const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      ShowTags();
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
