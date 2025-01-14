import React from "react";
import './Sidebar.css'
import {assets} from '../../assets/assets'
function Sidebar(){

    return(
        <div className='sidebar'>
        <div className="top">
        <img className="menu" src={assets.menu_logo} />
        <div className="Newchat">
            <img src={assets.plus_logo} />
            <p>New search</p>
        </div>
        <div className="recent">
            <p className="RecentTitle">Recent</p>
            <div className="RecentEntry">
                <img src={assets.message_logo} alt="" />
                <p>What is react..</p>
            </div>
        </div>
        </div>
        <div className="bottom">
            <div className="bottomItem">
                Bottom Items
            </div>
        </div>
        </div>
    );

}

export default Sidebar

