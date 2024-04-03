function extractTwitterUsername(url: string) {
  const pattern = /https?:\/\/(?:twitter|x)\.com\/(\w+)(?:\/|#\w+|$)/;
  const match = url.match(pattern);
  if (match) {
    return match[1];
  } else {
    return null;
  }
}

export function GetUsername() {
  let url = window.location.href;
  if (!url) url = document.URL;
  return extractTwitterUsername(url);
}
