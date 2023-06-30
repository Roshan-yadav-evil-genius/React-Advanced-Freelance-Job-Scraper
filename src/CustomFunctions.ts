
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

export const GetDataFromChromeStorage = (key) => {
	return new Promise((resolve, reject) => {
		chrome.storage.local.get([key], (result) => {
			let data = Boolean(Object.keys(result).length) ? result[key] : null
			resolve(data)
		})
	})
}


export const SaveValueInChromeStorage = (key, value) => {
	chrome.storage.local.set({ [key]: value })
}

export const UpdateValueInChromeStorage = (key, value, overWrite = true) => {
	GetDataFromChromeStorage(key).then((data) => {
		if (overWrite) {
			SaveValueInChromeStorage(key, value)
		} else {
			chrome.storage.local.get([key], (result) => {
				let prevdata = Boolean(Object.keys(result).length) ? result[key] : []
				let newData = prevdata.concat(value);
				chrome.storage.local.set({ [key]: newData })
			})
		}
	})
}

export const UpdateExtensionBadge = () => {
	GetDataFromChromeStorage("CollectedJobs").then((data) => {
		if (data === null || data===undefined) {
			chrome.action.setBadgeText({ text: "0" })
		}else{
		// check if data is aarray or not
			chrome.action.setBadgeText({ text: JSON.stringify(data.length) })
		}
	})
}
