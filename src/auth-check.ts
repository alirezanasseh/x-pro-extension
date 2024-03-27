export function AuthCheck (): Promise<boolean> {
  // Check if the user is already logged in (by checking for JWT cookie)
  return new Promise((resolve) => {
    chrome.cookies.get({ url: 'http://localhost:8000', name: 'xpro_token' }, function(cookie) {
      resolve(cookie !== null);
    });
  })
}