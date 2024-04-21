import { env } from "./env";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    if (
      changeInfo.url.startsWith("https://twitter.com/") ||
      changeInfo.url.startsWith("https://x.com/")
    ) {
      chrome.runtime.sendMessage({ action: "showTags" }).then();
    }
    if (changeInfo.url.startsWith(`${env.BACKEND_URL}/auth/twitter/callback`)) {
      chrome.runtime.sendMessage({ action: "login" }).then(() => {
        chrome.tabs.remove(tabId).then();
      });
    }
  }
  return true;
});
