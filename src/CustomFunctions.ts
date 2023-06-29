export const SendMsgToPage = (from,msg) => {
	console.log("Sending Message To Page");
	chrome.tabs.query({}, (tabs) => {
		tabs.forEach((tab) => {
			if (tab.url && tab.id) {
				if (tab.url.includes("https://")) { // select tabs contain string "https://" in url
					chrome.tabs.sendMessage(tab.id, { from: from, to: "Content", data: msg }, (response) => { console.log("Sended"); });
				}
			}
		});
	});
};
export const SendMessageToRuntime = (from:string,to:string,data) => {
	console.log("Sending",{ from: from, to: to, data: data })
	chrome.runtime.sendMessage({ from: from, to: to, data: data });
}

export const BroadCast=(from,data)=>{
	SendMessageToRuntime(from,"Everyone",data)
	SendMsgToPage(from,data)
}

