import { TagContainer } from "../ui/tag-container";
import { GetTags } from "./get-tags";
import { ITag } from "../types/tag.type";
import { Tag } from "../ui/tag";
import { AddTag } from "../ui/add-tag";
import { newTag } from "./new-tag";

export function ShowTags() {
  const userNameEl = document.querySelector('[data-testid="UserName"]');
  console.log(userNameEl);
  if (userNameEl) {
    // check if the add button already exists
    const tagElements = document.querySelector(".add-tag");
    if (tagElements) {
      return;
    }
    // add tags container
    const tagsContainer = TagContainer();
    userNameEl.after(tagsContainer);
    // Get the tags from the server and show them
    // GetTags()
    //   .then((tags: ITag[]) => {
    //     console.log(tags);
    //     tags.forEach((tag) => {
    //       tagsContainer.appendChild(Tag(tag));
    //     });
    //     // Add a button to add a new tag
    //     tagsContainer.appendChild(AddTag(newTag));
    //   })
    //   .catch((error) => console.error(error));
  }
}
