import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
function Body(){
    
    const [urls,seturl]=useState([]);
    const [list,setlist] =useState([]);
    const [show,setshow]= useState(false);
    const[showvideo,setshowvideo]= useState(false);

    function handleInput(event){
         seturl([event.target.value]);
    }
    function handleSubmit(){
        const newurl =document.getElementById("link").value;
        document.getElementById("link").value ="";
        seturl(u=>[...u,newurl]);
        
        
        
        
    }

    function geturl(){
        axios.get('http://localhost:5173').then()
    }
    return(
       <div>

        <h1>Extracts fundamental Statcast metrics </h1>
        
        <div>
        
        <input 
            type ="text"
            id="link" 
            placeholder = "Please enter a video link..."
            />
        <button onClick={handleSubmit}  >Analyse </button>
        <ul>
            { 
              urls.map((url,index)=> <li key ={index}>{url} </li>)
        }</ul>
        </div>
        
    
       </div>
    );
}
export default Body2