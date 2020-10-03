const ballsack = document.querySelector("button");
const ballsacktwo = document.querySelector("#ballsack");

ballsack.addEventListener("click", readTabs);

ballsacktwo.addEventListener("click", () => {
    ballsacktwo.style.backgroundColor = "red";
})

function readTabs() {
    let querying = browser.tabs.query({currentWindow: true});
    querying.then(getUrls, onError);
}

function getUrls(tabs) {
    let arr = [];
    for(let tab of tabs) {
        arr.push(tab.url);
    }
    ballsacktwo.innerHTML = arr[0];
    return arr;
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function saveUrls(urls) {
    ballsack.style.backgroundColor = "blue";
    ballsack.innerHTML = arr[0];
}
  