import { AuthCheck } from "./auth-check";

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
      loginSection.style.display = "block";
      loggedInSection.style.display = "none";
    }
  }

  function showLoggedInState() {
    if (loginSection && loggedInSection) {
      loginSection.style.display = "none";
      loggedInSection.style.display = "block";
    }
  }
}
