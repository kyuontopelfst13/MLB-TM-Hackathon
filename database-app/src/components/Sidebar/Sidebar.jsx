import React from "react";
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { useState } from "react";
function Sidebar(){

    const [extended,setExtended]= useState(false)

    function handleInput(event){
        seturl([event.target.value]);
   }



    return(
        <div className='sidebar'>
        <div className="top">
        <img onClick={()=>setExtended(prev => !prev)} className='menu' src={assets.menu_logo} />
        <div className="Newchat">
            <img src={assets.plus_logo} />
            {extended?<p>New search</p>:null}
        </div>
        {extended
        ?<div className="recent">
            <p className="RecentTitle">Recent</p>
            <div className="RecentEntry">
                <img src={assets.message_logo} alt="" />
                <p>What is react..</p>
            </div>
        </div>
        :null
        }
        
        </div>
        <div className="bottom">
            <div className="bottomItem RecentEntry">
                <img src={assets.settings_logo} alt="" />
                {extended?<p>Settings</p>:null}
            </div>
        </div>
        </div>
    );

}

export default Sidebar

