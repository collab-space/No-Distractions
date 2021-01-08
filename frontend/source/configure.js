
var browser = browser || chrome;

const urlForm = document.getElementById("urlForm")

// TODO
function matchpatternFormatter(url) {
  return url
}

urlForm.onsubmit = async (e) => {
  e.preventDefault()
  const url = document.getElementById("urlForm_url").value
  const limit = document.getElementById("urlForm_limit").value
  console.log(`will add url: ${url}`)

  browser.runtime.sendMessage({
    action: "addrecord",
    matchpattern: url,
    url: url,
    dailylimit: limit,
    flags: 0
  })
}

function renderWatchList(data) {
  // let watchlist = document.getElementById("watchlist").getElementsByTagName('tbody')[0];
  // var new_tbody = document.createElement('tbody');
  // Object.fromEntries(Object.entries(data).map(([k, v]) => {
  //   console.log(k, v)

  //   let newrow = new_tbody.insertRow()
  //   let url = newrow.insertCell(0)
  //   let daily = newrow.insertCell(1)
  //   let usage = newrow.insertCell(2)
  //   url.appendChild(document.createTextNode(v.url))
  //   daily.appendChild(document.createTextNode(v.dailylimit))
  //   usage.appendChild(document.createTextNode(v.current))

  // }));
  // watchlist.parentNode.replaceChild(new_tbody, watchlist)
}

const getAll = document.getElementById("getAll")
getAll.addEventListener("click", getWatchlist);
function getWatchlist() {

  console.log("will get data")
  var sending = browser.runtime.sendMessage({
    action: "getallrecords"
  },
    (response) => {
      renderWatchList(response.response)
    }
  )
}