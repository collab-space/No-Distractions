// eslint-disable-next-line import/no-unassigned-import
let watch_urls = ["*://*.facebook.com/*"]
// const watch_urls = []

window.pages = {}

var browser = browser || chrome;

function redirect(request) {
  console.log("url intercepted: " + request.url);
  return { redirectUrl: browser.runtime.getURL("focus.html") };
}

let watchListener = browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: watch_urls },
  ["blocking"]
);


// objectstorage
// url
// matchpattern
// daily limit
// current
// created on
// flags

function addStoreEntry(url, trackobject) {
  browser.storage.local
    .set({ url, trackobject })
    .then(() => console.log(`adding url ${url}`))
    .catch((err) => console.log(`unable to add url ${url}, err : ${err}`))
}

function deleteStoreEntry(url) {
  browser.storage.local
    .remove(url)
    .then(() => console.log(`removed url:${url}`))
    .catch((err) => console.err(`unable to delete url ${url}, err: ${err}`))

}

function handleMessage(request, sender, sendResponse) {

  switch (request.action) {
    case 'addrecord':
      console.log(`will add record to database, url: ${request.url}, limit: ${request.limit}`)
      break
    case 'getallrecords':
      console.log("will get all records")
      break
    default:
      console.log("unhandled request action")
  }
}

browser.runtime.onMessage.addListener(handleMessage);
