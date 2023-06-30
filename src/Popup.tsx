import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BroadCast,
  GetDataFromChromeStorage,
  UpdateValueInChromeStorage,
  SaveValueInChromeStorage,
  UpdateExtensionBadge
} from "./CustomFunctions";
import { FaPlay, FaPause } from "react-icons/fa";
import "./Popup.css";

const Popup = () => {
  const [isScraping, setisScraping] = useState(false);
  const [isScrapingCurrentPage, setisScrapingCurrentPage] = useState(false);

  GetDataFromChromeStorage("isScraping").then((res) => {
    if (res != null) {
      setisScraping(res);
    } else {
      SaveValueInChromeStorage("isScraping", false);
      GetDataFromChromeStorage("isScraping").then((res) => console.log(res));
    }
  });
  GetDataFromChromeStorage("isScrapingCurrentPage").then((res) => {
    if (res != null) {
      setisScrapingCurrentPage(res);
    } else {
      SaveValueInChromeStorage("isScrapingCurrentPage", false);
      GetDataFromChromeStorage("isScrapingCurrentPage").then((res) =>
        console.log(res)
      );
    }
  });

  const StartScraping = () => {
    if (isScraping) {
      BroadCast("Popup", { action: "StopScraping" });
      UpdateValueInChromeStorage("isScraping", false);
      setisScraping(!isScraping);
      return;
    } else {
      BroadCast("Popup", { action: "StartScraping" });
      UpdateValueInChromeStorage("isScraping", true);
      setisScraping(!isScraping);
    }
  };

  const ScrapeCurrentPage = () => {
    if (isScrapingCurrentPage) {
      BroadCast("Popup", { action: "StopCurrentPageScraping" });
      UpdateValueInChromeStorage("isScrapingCurrentPage", false);
      setisScrapingCurrentPage(!isScrapingCurrentPage);
      return;
    } else {
      BroadCast("Popup", { action: "StartCurrentPageScraping" });
      UpdateValueInChromeStorage("isScrapingCurrentPage", true);
      setisScrapingCurrentPage(!isScrapingCurrentPage);
    }
  };

  const ClearCollectedJobs=()=>{
    // UpdateValueInChromeStorage("CollectedJobs", [],);
    chrome.storage.local.clear(()=>{
      console.log("Storage Cleared");
      chrome.action.setBadgeText({ text:"0"})
    });

  }

  return (
    <>
      <div className="popupBody">
        <div className="actionPannel">
          <button
            onClick={StartScraping}
            disabled={isScrapingCurrentPage}>
            {isScraping ? <>Stop</> : <>Start</>} Scraping
            {isScraping ? <FaPause /> : <FaPlay />}
          </button>
          <button
            onClick={ScrapeCurrentPage}
            disabled={isScraping}>
            {isScrapingCurrentPage ? (
              <>Scraping....</>
            ) : (
              <>Scrape Current Page</>
            )}
          </button>
          <button
            onClick={ClearCollectedJobs}
            disabled={isScraping}>
            Clear data
          </button>
        </div>
      </div>
    </>
  );
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log({
    ReceivedBy: "Popup",
    SendedFrom: msg.from,
    validReceiver: msg.to === "Popup",
  });
  sendResponse("ok");
});

const root = document.createElement("div");
root.id = "root";
document.body.insertBefore(root, document.body.firstChild);
ReactDOM.createRoot(root).render(<Popup />);
