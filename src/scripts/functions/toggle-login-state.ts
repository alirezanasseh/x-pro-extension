import { AuthCheck } from "./auth-check";
import { GetFromStorage } from "./get-from-storage";
import { env } from "../../env";

export async function ToggleLoginState() {
  const loginSection = document.getElementById("login");
  const loggedInSection = document.getElementById("loggedIn");

  if (await AuthCheck()) {
    showLoggedInState();
  } else {
    showLoginState();
  }

  function showLoginState() {
    if (loginSection && loggedInSection) {
      loginSection.style.display = "flex";
      loggedInSection.style.display = "none";
    }
  }

  async function showLoggedInState() {
    if (loginSection && loggedInSection) {
      loginSection.style.display = "none";
      loggedInSection.style.display = "flex";
      const displayNameElement = document.getElementById("displayName");
      const displayName = await GetFromStorage(env.DISPLAY_NAME);
      if (displayNameElement && displayName) {
        displayNameElement.innerText = displayName;
      }
    }
  }
}
