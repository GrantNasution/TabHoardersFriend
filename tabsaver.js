const load = document.querySelector("#load");
const save = document.querySelector("#save");
const input = document.querySelector("#input");
let userInput = null;


console.log("loaded");

save.addEventListener("click", () => {
    save.style.backgroundColor = "red";
    let querying = browser.tabs.query({currentWindow: true});
    querying.then(saveTabs, onError);
    save.style.backgroundColor = "red";
});

load.addEventListener("click", async () => {
    load.style.backgroundColor = "blue";
    let urls = await loadUrls();
    createTabs(urls);
});

input.addEventListener("blur", saveInput, true);

function saveTabs(tabs) {
    let urls = getUrls(tabs);
    let contentToStore = {};
    let key = (userInput) ? userInput : '0';
    contentToStore[key] = urls;
    browser.storage.local.set(contentToStore);
}

function getUrls(tabs) {
    let arr = [];
    for(let tab of tabs) {
        arr.push(tab.url);
    }
    return arr;
}

function onError(error) {
    console.log(`Error: ${error}`);
}

async function loadUrls() {
    let urls = await browser.storage.local.get('0');
    return urls['0'];
}

function createTabs(urls) {
    for(let i = 0; i < urls.length; ++i) {
        browser.tabs.create({url: urls[i]}).then(onCreated, onError);
    }
}

function onCreated(tab) {
    console.log(`Created new tab: ${tab.id}`);
}

function saveInput() {
    save.style.backgroundColor = "green";
    userInput = input.value;
}
  