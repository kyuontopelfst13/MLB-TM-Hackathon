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


    async function onSent(prompt) {
        setresultdata
       await run(input)
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