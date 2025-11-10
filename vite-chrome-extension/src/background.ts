chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "options") {
    chrome.runtime.openOptionsPage();
  }
});