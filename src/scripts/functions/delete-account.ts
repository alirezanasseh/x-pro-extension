import { GetToken } from "./get-token";
import { env } from "../../env";
import { ClearTags } from "./clear-tags";
import { ToggleLoginState } from "./toggle-login-state";

export async function DeleteAccount() {
  // Confirm account deletion
  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }
  const token = await GetToken();
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
