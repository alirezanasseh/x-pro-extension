export async function GetFromStorage(key: string) {
  if (typeof chrome === "undefined" || !chrome.storage) {
    throw new Error("Chrome object or chrome.storage is not available");
  }
  if (!key) {
    throw new Error("Key is required");
  }
  const value = await chrome.storage.sync.get(key);
  return value[key];
}
