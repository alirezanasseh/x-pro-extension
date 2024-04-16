export async function SaveToStorage(key: string, value: any) {
  if (typeof chrome === "undefined" || !chrome.storage) {
    throw new Error("Chrome object or chrome.storage is not available");
  }
  if (!key) {
    throw new Error("Key is required");
  }
  await chrome.storage.sync.set({ [key]: value });
}
