import React, {useState} from 'react';
import Main from './Main/Main.jsx'
import Sidebar from './Sidebar/Sidebar.jsx';
import './Body.css'
function Body(){
    return(
    <div className='Body'>
    <Sidebar/>
    <Main/>
    </div>
    
    )
}
    
export default Body