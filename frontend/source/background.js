// eslint-disable-next-line import/no-unassigned-import
let watch_urls = ["*://*.facebook.com/*"]
// const watch_urls = []

window.pages = {}


var browser = browser || chrome;

browser.storage.local.clear()

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
// // url (key)
// // matchpattern
// // daily limit
// // current
// // created on
// // flags

function addStoreEntry(url, trackobject) {
  var storingurl = browser.storage.local.set({ [url]: trackobject }, () => {
    if (browser.runtime.lastError) {
      console.error(`unable to register url ${url} in tracklist`)
    } else {
      console.log(`adding url ${url}`)
      browser.webRequest.onBeforeRequest.removeListener(watchListener)
      watch_urls.push(trackobject["matchpattern"])
      console.log(watch_urls)
      watchListener = browser.webRequest.onBeforeRequest.addListener(
        redirect,
        { urls: watch_urls },
        ["blocking"]
      );
    }
  })
}

function deleteStoreEntry(url) {
  let store = browser.storage.local.remove(url)
  store.then(
    () => console.log(`removed url:${url}`),
    (err) => console.err(`unable to delete url ${url}, err: ${err}`))
}

function handleMessage(request, sender, sendResponse) {

  switch (request.action) {
    case 'addrecord':
      console.log(`will add record to database, url: ${request.url}, limit: ${request.limit}`)
      addStoreEntry(request.matchpattern, {
        matchpattern: request.matchpattern,
        url: request.url,
        dailylimit: request.dailylimit,
        current: request.current || "0"
      })

      return true;
      break
    case 'getallrecords':
      console.log("will get all records")
      browser.storage.local.get(null, (data) => {
        if (browser.runtime.lastError) {
          console.error(`unable to retrieve tracklist`)
        } else {
          console.log(data)
          sendResponse({ response: data })
        }
      })
      return true;
    default:
      console.log("unhandled request action")
  }
}

browser.runtime.onMessage.addListener(handleMessage);
