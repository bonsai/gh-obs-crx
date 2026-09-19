// bonsai-obs popup — 現在タブから GitHub repo 名を抽出
async function main() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const el = document.getElementById("repo");
  if (!tab?.url) return;

  const m = /github\.com\/([^/]+\/[^/?#]+)/.exec(tab.url);
  if (m) {
    el.textContent = m[1];
  } else {
    try {
      const u = new URL(tab.url);
      el.textContent = u.hostname.replace(/^www\./, "");
    } catch {
      el.textContent = tab.url;
    }
  }

  document.getElementById("copy").addEventListener("click", async () => {
    await navigator.clipboard.writeText(tab.url);
    const b = document.getElementById("copy");
    b.textContent = "コピーした ✅";
    setTimeout(() => (b.textContent = "URL をコピー"), 1200);
  });
}

main();