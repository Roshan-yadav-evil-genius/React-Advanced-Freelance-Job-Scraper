
export interface Job {
	Title: string;
	Budget: string;
	Tech: string[];
	shortDesc: string;
	bidCount: string;
	Averagebid: string;
	url: string;
}



export const SendMsgToPage = (from, msg) => {
	console.log("Sending Message To Page");
	chrome.tabs.query({}, (tabs) => {
		tabs.forEach((tab) => {
			if (tab.url && tab.id) {
				if (tab.url.includes("freelancer.com")) { // select tabs contain string "https://" in url
					chrome.tabs.sendMessage(tab.id, { from: from, to: "Content", data: msg }, (response) => { console.log(response); });
				}
			}
		});
	});
};
export const SendMessageToRuntime = (from: string, to: string, data) => {
	chrome.runtime.sendMessage({ from: from, to: to, data: data });
}

export const BroadCast = (from, msg) => {
	SendMessageToRuntime(from, "Everyone", msg)
	SendMsgToPage(from, msg)
}

export const GetDataFromChromeStorage = (key, defaultvalue) => {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get([key], (result) => {
			if (key in result) {
				resolve(result[key])
			} else {
				console.log(`Initializing : ${key} with default value : ${defaultvalue}`)
				resolve(defaultvalue)
				SaveValueInChromeStorage(key, defaultvalue)
			}
		})
	})
}


export const SaveValueInChromeStorage = (key, value) => {
	chrome.storage.local.set({ [key]: value })
}

export const UpdateValueInChromeStorage = (key, value, overWrite = true) => {
	GetDataFromChromeStorage(key, []).then((data) => {
		if (overWrite) {
			SaveValueInChromeStorage(key, value)
		} else {
			let newData = data.concat(value);
			SaveValueInChromeStorage(key, newData)
		}
	})
}

