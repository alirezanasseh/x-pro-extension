import { env } from "../env";
import { ClearTags } from "../scripts/functions/clear-tags";
import { ToggleLoginState } from "../scripts/functions/toggle-login-state";
import { DeleteAccount } from "../scripts/functions/delete-account";
import { SaveToStorage } from "../scripts/functions/save-to-storage";
import { GetCookie } from "../scripts/functions/get-cookie";

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(async function (message) {
  if (message.action === "login") {
    const tokenName = env.TOKEN;
    const displayNameName = env.DISPLAY_NAME;
    const token = await GetCookie(tokenName);
    const displayName = await GetCookie(displayNameName);
    await SaveToStorage(tokenName, token);
    await SaveToStorage(displayNameName, displayName);
    ToggleLoginState().then();

    // Send a message to the content script to show tags
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0] && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "showTags" });
      }
    });
  }
  return true;
});

document.addEventListener("DOMContentLoaded", async function () {
  const twitterButton = document.getElementById("twitterButton");
  const loggedInSection = document.getElementById("loggedIn");
  const logoutButton = document.getElementById("logoutButton");
  const deleteAccount = document.getElementById("deleteAccount");
  if (twitterButton && logoutButton && loggedInSection) {
    twitterButton.addEventListener("click", function () {
      chrome.windows.create({
        url: `${env.BACKEND_URL}/auth/twitter`,
        type: "popup",
        width: 800,
        height: 600,
      });
    });

    logoutButton.addEventListener("click", async function () {
      await chrome.cookies.remove({
        url: env.BACKEND_URL,
        name: env.TOKEN,
      });
      await chrome.cookies.remove({
        url: env.BACKEND_URL,
        name: env.DISPLAY_NAME,
      });
      await chrome.storage.sync.remove(env.TOKEN);
      await chrome.storage.sync.remove(env.DISPLAY_NAME);
      ToggleLoginState().then();
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs[0] && tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "clearTags" });
        }
      });
    });
  }
  if (deleteAccount) {
    deleteAccount.addEventListener("click", async function () {
      DeleteAccount().then();
    });
  }
  ToggleLoginState().then();
});
