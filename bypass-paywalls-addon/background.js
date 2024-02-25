// background.js

import browser from "webextension-polyfill";

// Function to inject content script into the active tab
const injectContentScript = async () => {
  const [activeTab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (activeTab) {
    await browser.tabs.executeScript(activeTab.id, {
      file: "content.js",
    });
  }
};

// Function to modify headers and impersonate user agent
const modifyHeaders = (details) => {
  const newHeaders = new Headers(details.requestHeaders);
  newHeaders.set(
    "User-Agent",
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
  );

  return { requestHeaders: newHeaders };
};

// Add listener for browser action click
browser.browserAction.onClicked.addListener(async (tab) => {
  // Reload the current tab to trigger content script
  await browser.tabs.reload(tab.id);

  // Add listener for webRequest to modify headers
  browser.webRequest.onBeforeSendHeaders.addListener(
    modifyHeaders,
    { urls: ["https://10minemail.com/*"] },
    ["blocking", "requestHeaders"]
  );

  // Inject the content script
  await injectContentScript();
});
