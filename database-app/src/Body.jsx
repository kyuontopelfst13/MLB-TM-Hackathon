import React, {useState} from 'react';
import ReactPlayer from 'react-player';
function Body(){
    
    const [url,seturl]=useState("");
    const [list,setlist] =useState([]);
    const [show,setshow]= useState(false);
    const[showvideo,setshowvideo]= useState(false);
    function handleInputChange(event){
          seturl(event.target.value);
    }
    function analyse_url(event){
        //keep previous result and prevent refresh.
        event.preventDefault();

        const entry = {url}
        if(url){
        setlist((ls)=>[...ls,entry])
        seturl("")
        setshow(true)
        setshowvideo(true)
        }
    }
    return(
       <div>

        <h2>Extracts fundamental Statcast metrics </h2>
        <div>
        <form onSubmit={ analyse_url}>
            <input 
            name= "url" 
            placeholder = "Please enter a video link..."
            value= {url}
            onChange ={handleInputChange}/>
        <button className= "analyse-button">
        Analyse
        </button>
        </form>
        </div>
        {show?<h2>Your have typed a video link :</h2> :null}
        {
              list.map(
                (a)=>
                <div>
                    <a href={a.url}>{a.url}</a>
                </div>    
            )
        }
        <div>
        ##### need to fix the problem of video not showing. 
        {showvideo?<video src={url}/> : null}
        </div>
       </div>
    );
}
export default Body