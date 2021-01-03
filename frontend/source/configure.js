
var browser = browser || chrome;

const urlForm = document.getElementById("urlForm")
urlForm.onsubmit = async (e) => {
  e.preventDefault()
  const url = document.getElementById("urlForm_url").value
  const limit = document.getElementById("urlForm_limit").value
  console.log(`will add url: ${url}`)

  browser.runtime.sendMessage({
    action: "addrecord",
    url: url,
    limit: limit,
    flags: 0
  })
}

const renderWatchList = (message) => {
  let watchlistbody = document.getElementById("watchlist_body")[0]

}

const handleError = (error) => {

}

const getAll = document.getElementById("getAll")
getAll.addEventListener("click", getWatchlist);
function getWatchlist() {

  console.log("will get data")
  browser.runtime.sendMessage({
    action: "getallrecords"
  }).then(renderWatchList, handleError)
}