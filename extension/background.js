// bonsai-obs — 現在タブ数をバッジ表示
chrome.tabs.query({}, (tabs) => {
  const n = tabs.length;
  chrome.action.setBadgeText({ text: String(n) });
  chrome.action.setBadgeBackgroundColor({ color: "#2f9e44" });
});

chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);

function updateBadge() {
  chrome.tabs.query({}, (tabs) => {
    chrome.action.setBadgeText({ text: String(tabs.length) });
  });
}