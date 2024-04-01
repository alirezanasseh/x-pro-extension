// Send a message to the popup script
import { env } from "./env";

function sendMessageToPopup(action: string) {
  chrome.runtime.sendMessage({ action });
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.url &&
    changeInfo.url.startsWith(`${env.BACKEND_URL}/auth/twitter/callback`)
  ) {
    chrome.tabs.remove(tabId);
    sendMessageToPopup("reloadPopup");
  }
});
