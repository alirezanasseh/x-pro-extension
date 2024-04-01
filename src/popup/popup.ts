import { AuthCheck } from "../scripts/fuctions/auth-check";
import { env } from "../env";

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "reloadPopup") {
    // Reload the popup window
    location.reload();
  }
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
            // Show login state after logout
            showLoginState();
          }
        }
      );
    });

    if (await AuthCheck()) {
      showLoggedInState();
    } else {
      showLoginState();
    }

    function showLoginState() {
      if (loginButton && loggedInSection) {
        loginButton.style.display = "block";
        loggedInSection.style.display = "none";
      }
    }

    function showLoggedInState() {
      if (loginButton && loggedInSection) {
        loginButton.style.display = "none";
        loggedInSection.style.display = "block";
      }
    }
  }
});
