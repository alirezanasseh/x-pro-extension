import { env } from "./env";

let url = "";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && url !== tab.url) {
    url = tab.url || url;
    if (
      url.startsWith("https://twitter.com/") ||
      url.startsWith("https://x.com/")
    ) {
      chrome.runtime.sendMessage({ action: "showTags" }).then();
    }
    if (url.startsWith(`${env.BACKEND_URL}/auth/twitter/callback`)) {
      chrome.runtime.sendMessage({ action: "login" }).then(() => {
        chrome.tabs.remove(tabId).then();
      });
    }
  }
  return true;
});
