import { env } from "../../env";
import { ClearTags } from "./clear-tags";
import { ToggleLoginState } from "./toggle-login-state";
import { GetFromStorage } from "./get-from-storage";

export async function DeleteAccount() {
  // Confirm account deletion
  if (
    !confirm(
      "Are you sure you want to delete your account?\n" +
        "By deleting your account, all your tags will be deleted and cannot be recovered."
    )
  ) {
    return;
  }
  const token = await GetFromStorage(env.TOKEN);
  // Remove cookies
  const removedTokenCookie = await chrome.cookies.remove({
    url: env.BACKEND_URL,
    name: env.TOKEN,
  });
  if (!removedTokenCookie) {
    throw new Error("Error removing token cookie");
  }
  const removedDisplayNameCookie = await chrome.cookies.remove({
    url: env.BACKEND_URL,
    name: env.DISPLAY_NAME,
  });
  if (!removedDisplayNameCookie) {
    throw new Error("Error removing display name cookie");
  }
  // Remove token and display name from storage
  await chrome.storage.sync.remove(env.TOKEN);
  await chrome.storage.sync.remove(env.DISPLAY_NAME);
  ClearTags();
  ToggleLoginState().then();
  // Send delete request to the backend
  fetch(`${env.BACKEND_URL}/users`, {
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
