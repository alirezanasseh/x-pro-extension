import { env } from "../../env";

export async function GetCookie(cookieName: string) {
  if (typeof chrome === "undefined" || !chrome.cookies) {
    throw new Error("Chrome object or chrome.cookies is not available");
  }
  if (!cookieName) {
    throw new Error("Cookie name is required");
  }
  const cookie = await chrome.cookies.get({
    url: env.BACKEND_URL,
    name: cookieName,
  });
  return cookie?.value;
}
