import React from "react";
import './Main.css'
import {assets} from '../../../assets/assets'
function Main(){
   return(

   <div className="main">
      <div className="nav">
         <p>VisionBase</p>
      </div>
      <div className="mainContainer">
         <div className="greetmessage">
            <p><span>Hello, how I can help you today?</span></p>
         </div>
         <div className="mainBottom">
            <div className="searchbox">
               <input type="text" placeholder="Enter a video link here... ^v^" />
               <div>
                  <img src={assets.send_logo} alt="" />
               </div>
            </div>
            <p className="bottomInfo">
               Data are retrieved from the archieve database.
            </p>
         </div>
      </div>
   </div>
   )
}
export default Main