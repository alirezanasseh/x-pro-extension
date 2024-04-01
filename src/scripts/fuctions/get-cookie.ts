import { env } from "../../env";
import { SaveToken } from "./save-token";

export function GetCookie() {
  return new Promise((resolve, reject) => {
    if (typeof chrome === "undefined" || !chrome.cookies) {
      reject("Chrome object or chrome.cookies is not available");
      return;
    }

    chrome.cookies.get(
      { url: env.BACKEND_URL, name: env.COOKIE_NAME },
      async (cookie) => {
        if (cookie) {
          await SaveToken(cookie.value as unknown as string);
          resolve(cookie);
        } else {
          reject("Cookie not found");
        }
      }
    );
  });
}
