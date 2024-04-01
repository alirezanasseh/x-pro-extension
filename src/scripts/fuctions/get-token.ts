export async function GetToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof chrome === "undefined" || !chrome.storage) {
      reject("Chrome object or chrome.storage is not available");
      return;
    }

    chrome.storage.sync.get("token", function (data) {
      resolve(data.token);
    });
  });
}
