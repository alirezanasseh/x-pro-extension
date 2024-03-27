// Send a message to the popup script
function sendMessageToPopup(action: string) {
  chrome.runtime.sendMessage({ action });
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.startsWith('http://localhost:8000/auth/twitter/callback')) {
    chrome.tabs.remove(tabId);
    sendMessageToPopup('reloadPopup');
  }
});
