import { useState } from "react";
import axios from "axios"


const UnsubscribeForm= ({setNotification})=>{
    const [unsubscribeText, setUnsubscribeText]=useState('ihre E-Mail')
  
    const handleUnsubscribeSubmit= async (event)=>{
      event.preventDefault()
      console.log(unsubscribeText)
      const response= await axios.post('/api/unsubscribe',{email:unsubscribeText,reason:'Default'})
      setNotification(`${unsubscribeText} wurde erfolgreich abgemeldet`)
      setTimeout(()=>setNotification(null),5000)
      console.log(response)
      setUnsubscribeText('')
    }
  
    return(
      <>
      <div className='title-form-container'>
      <h2>Hier können sie sich definitve von weiteren E-Mails abmelden</h2>
      <div className='form-container'>
      <form onSubmit={(event)=>{handleUnsubscribeSubmit(event)}}>
        <input type="email" name='email' value={unsubscribeText} onChange={(event)=>{setUnsubscribeText(event.target.value)}}/>
        <button type="submit" >Abmelden</button>
  
      </form></div></div></>)
  }

export default UnsubscribeForm