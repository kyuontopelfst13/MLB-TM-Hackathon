import React, { useContext } from "react";
import './Main.css'
import {assets} from '../../../assets/assets'
import {Context} from '../../../context/Context'
function Main(){
   const {onSent,recentPrompt,showRes,load,resultdata,setInput,input} =useContext(Context);


      
   return(

   <div className="main">
      <div className="nav">
         
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