import React from 'react'
import ReactDOM from 'react-dom/client'

import {BroadCast } from './CustomFunctions'

const Popup = () => {

  return (
    <>
      <div>Popup</div>
      <button onClick={()=>BroadCast("Background","hii")}>To Background</button>
      <button onClick={()=>BroadCast("Popup","hii")}>To Popup</button>
      <button onClick={()=>BroadCast("Content","hii")}>To Content</button>
    </>
  )
}

chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
  console.log({ReceivedBy:"Popup",SendedFrom:msg.from,validReceiver:msg.to==="Popup"});
  sendResponse("ok")
})



const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)
ReactDOM.createRoot(root).render(<Popup />)