
var browser = browser || chrome;
browser.runtime.sendMessage({
  url: window.location.href
})