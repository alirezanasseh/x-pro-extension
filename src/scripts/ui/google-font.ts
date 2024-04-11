export function GoogleFont() {
  const head = document.getElementsByTagName("head")[0];
  if (head) {
    const existingLink = document.querySelector(
      "link[href='https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap']"
    );
    if (!existingLink) {
      const fontLinks = new Array(3).fill(document.createElement("link"));
      fontLinks[0].rel = "preconnect";
      fontLinks[0].href = "https://fonts.googleapis.com";
      fontLinks[1].rel = "preconnect";
      fontLinks[1].href = "https://fonts.gstatic.com";
      fontLinks[2].rel = "stylesheet";
      fontLinks[2].href =
        "https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap";
      head.append(...fontLinks);
    }
  }
}
