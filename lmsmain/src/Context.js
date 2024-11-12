import { createContext,useState } from "react";

export const Datacontext=createContext();

const Context=({children})=>{console.log('context reloded')
    const [logedin, setLogedin] = useState();
    const [Usertype,setUsertype] = useState();
    const[userid,setuserId]=useState();
    const [log,setLog]=useState(false);
    const [hamburger,sethamburger] = useState(true);
   
    return <Datacontext.Provider value={{logedin, setLogedin , log,setLog,setuserId,hamburger,sethamburger,Usertype,setUsertype}}>{children}</Datacontext.Provider>
};

export default Context;