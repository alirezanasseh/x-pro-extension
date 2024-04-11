import { env } from "../env";
import { ClearTags } from "../scripts/functions/clear-tags";
import { ToggleLoginState } from "../scripts/functions/toggle-login-state";

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "login") {
    ToggleLoginState().then();
  }
  return true;
});

document.addEventListener("DOMContentLoaded", async function () {
  const loginButton = document.getElementById("loginButton");
  const loggedInSection = document.getElementById("loggedIn");
  const logoutButton = document.getElementById("logoutButton");
  if (loginButton && logoutButton && loggedInSection) {
    loginButton.addEventListener("click", function () {
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
  ToggleLoginState().then();
});
