import React, { useContext } from "react";
import './Sidebar.css'
import {assets} from '../../../assets/assets'
import { useState } from "react";
import { Context } from "../../../context/Context";
function Sidebar(){

    const [extended,setExtended]= useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newSearch} =useContext(Context)
    async function loadPrompt(prompt){
        setRecentPrompt(prompt)
        await onSent(prompt)

    }


    return(
        <div className='sidebar'>
        <div className="top">
        <img onClick={()=>setExtended(prev => !prev)} className='menu' src={assets.menu_logo} />
        <div onClick={()=>newSearch()}className="Newsearch">
            <img src={assets.plus_logo} />
            {extended?<p>New search</p>:null}
        </div>
        {extended
        ?<div className="recent">
            <p className="RecentTitle">Recent</p>
            {prevPrompts.map(function (item,index){
                return(
                    <div onClick={()=>loadPrompt(item)} className="RecentEntry">
                        <img src={assets.message_logo} alt="" />
                        <p>{item.slice(0,15)} ...</p>
                    </div>
                )

            })}
            
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

