import { SendMessageToRuntime,UpdateValueInChromeStorage,Job, BroadCast } from "./CustomFunctions";

console.log("👨‍🌾 Content Script");


let CollectedJobs: Job[] = [];
let ScrapingIsAllowed = false;

const ExtractData = (container) => {
	let job = {
		Title: container.querySelector("h2").innerText,
		Budget: container
			.querySelector(".BudgetUpgradeWrapper-budget div")
			.innerText.replace("Budget", "")
			.trim(),
		Tech: container
			.querySelector("fl-bit[data-margin-bottom='xsmall']")
			.innerText.split("\n"),
		shortDesc: container.querySelector("[data-max-lines] div"),
		bidCount: container.querySelector(".BidEntryData fl-bit"),
		Averagebid: container.querySelector(".AverageBid-amount div"),
		UploadedAt: container.querySelector("span[data-color='dark']"),
		url: container.closest("a").href,
	};
	CollectedJobs.push(job);
};

const GetPageNo = () => {
	var params = new URLSearchParams(window.location.href);
	var pageNo = params.get("page");
	return pageNo ? parseInt(pageNo) : 1;
};

const Scrape = (ContinueScraping = true) => {
	if (!ScrapingIsAllowed) {
		console.log("Scraper Stoped");
		return null;
	}
	if (document.querySelector("fl-project-contest-card")) {
		console.log("✅ Projects Loaded");
		if (ContinueScraping) {
			console.log("👩‍💻 Scraping Page No: ", GetPageNo());
			document.querySelectorAll("fl-project-contest-card").forEach((job) => ExtractData(job));
			UpdateValueInChromeStorage("CollectedJobs",CollectedJobs,false);
			CollectedJobs=[]
			let nextPageBtn = document.querySelector("fl-bit.PaginationItem[data-show-mobile]:nth-of-type(4) button") as HTMLButtonElement;
			if (!nextPageBtn.disabled) {
				nextPageBtn.click()
				console.log("Navigating to Next Page 👉");
				Scrape(true)
			} else {
				console.log("👩‍💻 No More Pages");
				ScrapingIsAllowed = false
			}

		}
	} else {
		// Element doesn't exist, wait and check again
		console.log("👩‍💻 Waiting....");
		setTimeout(() => Scrape(ContinueScraping), 1000); // Check again after 1 second (adjust the delay as needed)
	}
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	console.log({
		ReceivedBy: "Content",
		SendedFrom: msg.from,
		msg: msg.data,
		validReceiver: msg.to === "Content",
	});
	sendResponse("ok");

	switch (msg.data.action) {
		case "StartScraping":
			console.log("👩‍💻 Start Scraping");
			ScrapingIsAllowed = true;
			Scrape();
			break;
		case "StopScraping":
			console.log("👩‍💻 Stop Scraping");
			ScrapingIsAllowed = false;
			break;
		case "StartCurrentPageScraping":
			console.log("👩‍💻 Start Current Page Scraping");
			break;
		case "StopCurrentPageScraping":
			console.log("👩‍💻 Stop Current Page Scraping");
			break;
		default:
			console.log("👩‍💻 No Action Found");
			break;
	}
});
