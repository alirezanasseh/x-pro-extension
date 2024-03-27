let tagsVisible = false;

export function showTags() {
  if (tagsVisible) {
    return;
  }
  const userNameEl = document.querySelector('[data-testid="UserName"]');
  if (userNameEl) {
    const tagsEl = document.createElement("h1");
    tagsEl.innerText = "TAGS";
    tagsEl.style.color = "yellow";
    userNameEl.after(tagsEl);
    tagsVisible = true;
  }
}

const observer = new MutationObserver(showTags);
observer.observe(document.body, {
  childList: true,
  subtree: true,
});
