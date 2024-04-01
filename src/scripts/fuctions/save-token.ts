export async function SaveToken(token: string) {
  await chrome.storage.sync.set({ token: token });
}
