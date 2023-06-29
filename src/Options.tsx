import React,{useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import { SendMsgToPage,SendMessageToRuntime,BroadCast } from './CustomFunctions'



const Options = () => {

  return (
    <>
      <div>options</div>
      <button onClick={()=>BroadCast("Background","hii")}>To Background</button>
      <button onClick={()=>BroadCast("Popup","hii")}>To Popup</button>
      <button onClick={()=>BroadCast("Content","hii")}>To Content</button>
    </>
  )
}

chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
  console.log({ReceivedBy:"Options",SendedFrom:msg.from,validReceiver:msg.to==="Options"});
  sendResponse("ok")
})

const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)
ReactDOM.createRoot(root).render(<Options />)