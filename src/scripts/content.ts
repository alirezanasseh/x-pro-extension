import { ShowTags } from "./functions/show-tags";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "showTags") {
    const observer = new MutationObserver(ShowTags);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
  sendResponse({ message: "received" });
});
