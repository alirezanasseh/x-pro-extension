import { env } from "../env";
import { ClearTags } from "../scripts/functions/clear-tags";
import { ToggleLoginState } from "../scripts/functions/toggle-login-state";
import { DeleteAccount } from "../scripts/functions/delete-account";

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "login") {
    ToggleLoginState().then();
  }
  return true;
});

document.addEventListener("DOMContentLoaded", async function () {
  const loginLink = document.getElementById("loginLink");
  const loggedInSection = document.getElementById("loggedIn");
  const logoutButton = document.getElementById("logoutButton");
  const deleteAccount = document.getElementById("deleteAccount");
  if (loginLink && logoutButton && loggedInSection) {
    loginLink.addEventListener("click", function () {
      chrome.windows.create({
        url: `${env.BACKEND_URL}/auth/twitter`,
        type: "popup",
        width: 800,
        height: 600,
      });
    });

    logoutButton.addEventListener("click", function () {
      // Clear JWT cookie
      chrome.cookies.remove(
        { url: env.BACKEND_URL, name: env.COOKIE_NAME },
        function (removedCookie) {
          if (removedCookie) {
            // Remove token from chrome storage
            chrome.storage.sync.remove("token", function () {
              ClearTags();
              ToggleLoginState();
            });
          }
        }
      );
    });
  }
  if (deleteAccount) {
    deleteAccount.addEventListener("click", async function () {
      DeleteAccount().then();
    });
  }
  ToggleLoginState().then();
});
