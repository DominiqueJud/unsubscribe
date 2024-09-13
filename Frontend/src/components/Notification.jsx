import React from "react";

const Notification = ({notification}) =>{
    if(notification){
    return(<h1 style={{display:'flex',padding:'3px', justifyContent:'space-around', border:'1x solid black', color:'green'}}>{notification}</h1>)}
    else{
        return(<></>)
    }
}

export default Notification