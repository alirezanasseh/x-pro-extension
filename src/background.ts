import { env } from "./env";

let url = "";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && url !== tab.url && changeInfo.status === "complete") {
    url = tab.url || url;
    if (
      url.startsWith("https://twitter.com/") ||
      url.startsWith("https://x.com/")
    ) {
      chrome.tabs.sendMessage(tabId, { action: "showTags" });
    }
    if (url.startsWith(`${env.BACKEND_URL}/auth/twitter/callback`)) {
      chrome.tabs.remove(tabId);
      chrome.runtime.sendMessage({ action: "reloadPopup" });
    }
  }
  return true;
});
