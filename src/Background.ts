import { GetDataFromChromeStorage } from "./CustomFunctions"

console.log("👨🏿‍🔬 Backdround Service Worker MainFile Executed");


chrome.runtime.onInstalled.addListener(() => {
    console.log("👨🏿‍🔬 Backdround Service Worker Installed");
    GetDataFromChromeStorage("CollectedJobs", []).then((data) => {
        console.log(data)
        chrome.action.setBadgeText({ text: data.length.toString() })
        chrome.action.setBadgeBackgroundColor({ color: "#000000" })
    })
});


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log({ ReceivedBy: "Background", SendedFrom: msg.from, validReceiver: msg.to === "Background" });
    sendResponse("ok")
})
chrome.storage.onChanged.addListener((changes, areaName) => {
    console.log("Storage Changed")
    console.log(changes, areaName);
    if ("CollectedJobs" in changes) {
        GetDataFromChromeStorage("CollectedJobs",[]).then((data) => {
            chrome.action.setBadgeText({ text: data.length.toString() })
        });
    }
});