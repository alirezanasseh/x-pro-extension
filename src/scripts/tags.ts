import { Tag } from "./ui/tag";
import { AddTag } from "./ui/add-tag";
import { TagContainer } from "./ui/tag-container";
import { newTag } from "./fuctions/new-tag";

export function showTags() {
  const userNameEl = document.querySelector('[data-testid="UserName"]');
  if (userNameEl) {
    // check if the element with class 'tag' already exists
    const tags = document.querySelector(".tag");
    if (tags) {
      return;
    }
    // add tags container
    const tagsContainer = TagContainer();
    userNameEl.after(tagsContainer);
    // Get the tags from the server and show them
    tagsContainer.appendChild(Tag({ id: "1", name: "tag1" }));
    // Add a button to add a new tag
    tagsContainer.appendChild(AddTag(newTag));
  }
}

const observer = new MutationObserver(showTags);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
