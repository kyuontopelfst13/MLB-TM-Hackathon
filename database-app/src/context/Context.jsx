import { createContext, useState } from "react";
import run from "../Config/gemini";

export const Context = createContext();

function Contextprovider(props){
    const [input,setInput] =useState("");
    const [recentPrompt, setRecentPrompt]=useState("");
    const [prevPrompts,setPrevPrompts] =useState([]);
    const [showRes,setShowRes] =useState(false);
    const [load,setload] =useState(false);
    const [resultdata,setresultdata] =useState("");

    function delayPara (index,nextWord){
        setTimeout(function(){
            setresultdata(prev=>prev+nextWord)
        },75*index)
    }
    async function onSent(prompt) {
        setresultdata("");
        setload(true);
        setShowRes(true);
        setRecentPrompt(input)
        setPrevPrompts(prev=>[...prev,input])
        const response = await run(input)
        let resArray = response.split("**");
        let newRes ="";
        for(let i=0; i< resArray.length; i++){
            if(i===0 || i%2 !== 1){
                newRes += resArray[i];
            }
            else{
                newRes += "<b>"+resArray[i]+"</b>"
            }
        }
        let newRes2 =newRes.split("*").join("</br>")
        let newresArray =newRes2.split(" ");
        for(let j =0; j< newresArray.length; j++){
            const thenextWord =newresArray[j];
            delayPara(j,thenextWord+" ")

        }
        setload(false)
        setInput("")

    }
    const contextValue ={
          prevPrompts,
          setPrevPrompts,
          onSent,
          setRecentPrompt,
          recentPrompt,
          showRes,
          load,
          resultdata,
          input,
          setInput,
          

    }
    
    return(
        <Context.Provider value={contextValue}>
            {props .children}
          
        </Context.Provider>
    );

}
export default Contextprovider