import { env } from "./env";
import { ShowTags } from "./scripts/functions/show-tags";

let url = "";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url && url !== tab.url) {
    url = tab.url || url;
    if (
      url.startsWith("https://twitter.com/") ||
      url.startsWith("https://x.com/")
    ) {
      chrome.tabs.sendMessage(tabId, { action: "showTags" });
    }
    if (url.startsWith(`${env.BACKEND_URL}/auth/twitter/callback`)) {
      chrome.tabs.remove(tabId);
      chrome.runtime.sendMessage({ action: "login" }).then(() => {
        ShowTags();
      });
    }
  }
  return true;
});
//
// chrome.runtime.onInstalled.addListener(async () => {
//   for (const cs of chrome?.runtime?.getManifest()?.content_scripts || []) {
//     for (const tab of await chrome.tabs.query({ url: cs.matches })) {
//       if (tab?.url?.match(/(chrome|chrome-extension):\/\//gi)) {
//         continue;
//       }
//       chrome.scripting.executeScript({
//         files: cs.js || [],
//         target: { tabId: tab?.id || 0, allFrames: cs.all_frames },
//         injectImmediately: cs.run_at === "document_start",
//       });
//     }
//   }
// });
