import { env } from "../../env";
import { ClearTags } from "./clear-tags";
import { ToggleLoginState } from "./toggle-login-state";
import { GetCookie } from "./get-cookie";

export async function DeleteAccount() {
  // Confirm account deletion
  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }
  const token = await GetCookie("token");
  // Remove cookies
  const removedTokenCookie = await chrome.cookies.remove({
    url: env.BACKEND_URL,
    name: env.COOKIE_TOKEN,
  });
  if (!removedTokenCookie) {
    throw new Error("Error removing token cookie");
  }
  const removedDisplayNameCookie = await chrome.cookies.remove({
    url: env.BACKEND_URL,
    name: env.COOKIE_DISPLAY_NAME,
  });
  if (!removedDisplayNameCookie) {
    throw new Error("Error removing display name cookie");
  }
  // Remove token and display name from storage
  await chrome.storage.sync.remove("token");
  await chrome.storage.sync.remove("displayName");
  ClearTags();
  ToggleLoginState().then();
  // Send delete request to the backend
  fetch(`${env.BACKEND_URL}/api/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error deleting account");
    }
    return response.json();
  });
}
