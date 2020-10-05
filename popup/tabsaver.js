const load = document.querySelector("#load");
const save = document.querySelector("#save");
const input = document.querySelector("#input");
const selection = document.querySelector("select");
const refresh = document.querySelector("#refresh");
let userTextInput = null;
let userSelectInput = null;

save.addEventListener("click", () => {
    save.style.backgroundColor = "red";
    let querying = browser.tabs.query({currentWindow: true});
    querying.then(saveTabs, onError);
    save.style.backgroundColor = "red";
    loadSessions();
});

load.addEventListener("click", async () => {
    load.style.backgroundColor = "blue";
    let urls = await loadUrls();
    createTabs(urls);
});

input.addEventListener("blur", saveInput, true);

selection.addEventListener("blur", saveSessionInput, true);

refresh.addEventListener("click", () => {
    loadSessions();
});

function saveTabs(tabs) {
    let urls = getUrls(tabs);
    let contentToStore = {};
    let key = (userTextInput) ? userTextInput : '0';
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
    if(userSelectInput) {
        let urls = await browser.storage.local.get(userSelectInput);
        return urls[userSelectInput];
    }
    else {
        alert("No session selected");
    }
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
    userTextInput = input.value;
}

async function loadSessions() {
    let sessions = await browser.storage.local.get(null)
    for(let key in sessions)  {
        let option = document.createElement("option");
        option.setAttribute("value", key);
        option.textContent = key;
        selection.appendChild(option);
    }
}

function saveSessionInput() {
    userSelectInput = selection.value;
}  