chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "options",
    title: "Extension Options",
    contexts: ["action"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "options") {
    chrome.runtime.openOptionsPage();
  }
});