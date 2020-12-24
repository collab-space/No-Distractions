const watch_urls=["www.facebook.com", "www.youtube.com"]

window.pages = {}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  window.pages[request.url] = request.url
  var checked = new URL(request.url).hostname
  watch_urls.forEach(function(page){
   if(page.includes(checked)){
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        chrome.tabs.update(tabs[0].id, {url:'Focus.html'});
       })
      
   }
    
  })
})

// chrome.browserAction.onClicked.addListener(function (tab) {
//   chrome.tabs.create({url: 'Focus.html'})
// })