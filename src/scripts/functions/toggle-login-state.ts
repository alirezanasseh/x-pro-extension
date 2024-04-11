import { AuthCheck } from "./auth-check";

export async function ToggleLoginState() {
  const loginButton = document.getElementById("loginButton");
  const loggedInSection = document.getElementById("loggedIn");

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
    console.log("showLoggedInState", { loginButton, loggedInSection });
    if (loginButton && loggedInSection) {
      loginButton.style.display = "none";
      loggedInSection.style.display = "block";
    }
  }
}
