document.getElementById("configure").addEventListener('click', function () {
    chrome.tabs.create({url: "configure.html"})
})