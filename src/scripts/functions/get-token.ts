import { GetCookie } from "./get-cookie";

export async function GetToken(): Promise<string> {
  if (typeof chrome === "undefined" || !chrome.storage) {
    throw new Error("Chrome object or chrome.storage is not available");
  }
  const data = await chrome.storage.sync.get("token");
  return data?.token || ((await GetCookie()) as string);
}
