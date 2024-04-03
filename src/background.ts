import { env } from "./env";
import { ShowTags } from "./scripts/functions/show-tags";

let url = "";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && url !== tab.url && changeInfo.status === "complete") {
    url = tab.url || url;
    console.log({ tabId, changeInfo, tab });
    if (url.startsWith("https://twitter.com/")) {
      chrome.tabs.sendMessage(tabId, { action: "showTags" }, (response) => {
        console.log({ response });
      });
    }
    // if (url.startsWith(`${env.BACKEND_URL}/auth/twitter/callback`)) {
    //   chrome.tabs.remove(tabId);
    //   chrome.runtime.sendMessage({ action: "reloadPopup" }, (response) => {
    //     console.log({ response });
    //   });
    // }
    // if (
    //   url.startsWith("https://twitter.com/") ||
    //   url.startsWith("https://x.com/")
    // ) {
    //   chrome.runtime.sendMessage({ action: "showTags" }, (response) => {
    //     console.log({ response });
    //   });
    // }
  }
  return true;
});
