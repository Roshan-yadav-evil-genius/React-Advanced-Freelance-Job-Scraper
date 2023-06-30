import {UpdateExtensionBadge} from "./CustomFunctions"

console.log("👨🏿‍🔬 Backdround Service Worker id : 1");

chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
    console.log({ReceivedBy:"Background",SendedFrom:msg.from,validReceiver:msg.to==="Background"});
    sendResponse("ok")
    if(msg.data.action==="UpdateExtensionBadge"){
        UpdateExtensionBadge()
    }
})