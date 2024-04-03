import { ShowTags } from "./functions/show-tags";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "showTags") {
    console.log("showTags");
    ShowTags();
  }
  sendResponse({ message: "received" });
});
