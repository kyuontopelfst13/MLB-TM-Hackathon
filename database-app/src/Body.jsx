import React, {useState} from 'react';
import Main from './components/Main/Main.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx';
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