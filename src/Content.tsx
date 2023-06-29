import React from 'react'
import ReactDOM from 'react-dom/client'
import { SendMessageToRuntime } from './CustomFunctions'

console.log("👨‍🌾 Content Script 2");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    console.log({ ReceivedBy: "Content", SendedFrom: msg.from, validReceiver: msg.to });
    sendResponse("ok")
})


const Content = () => {
  return (
    <div>
        <h1>Content</h1>
      <button onClick={()=>SendMessageToRuntime("Content","Popup","hii")}>To Popup</button>
    </div>
  )
}



const root = document.createElement('div')
root.id = 'root'
document.body.insertBefore(root, document.body.firstChild)
ReactDOM.createRoot(root).render(<Content />)