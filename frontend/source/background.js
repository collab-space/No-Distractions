// eslint-disable-next-line import/no-unassigned-import
const watch_urls = ["*://*.facebook.com/*"]

window.pages = {}

var browser = browser || chrome;

function redirect(request) {
  console.log("url intercepted: " + request.url);
  return { redirectUrl: browser.runtime.getURL("focus.html") };
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: watch_urls },
  ["blocking"]
);
