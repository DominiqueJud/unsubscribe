import {useState} from 'react';
import axios from 'axios'

const ResubscribeForm = ({setNotification})=>{
    const [email, setEmail]= useState('ihre E-Mail')
    const handleSubmit=async (event)=>{
        event.preventDefault()
        console.log(`/api/unsubscribe/${email}`)
        const response= await axios.delete(`/api/unsubscribe/${email}`)
        setNotification(`${email} wurde erfolgreich wieder angemeldet`)
        setTimeout(()=>setNotification(null),5000)
        console.log(response)
        setEmail('')
    }
    return(
        <div className='title-form-container'>
        <h2>Hier können Sie sich erneut für unseren Emailservice anmelden</h2>
        <div className='form-container'>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <input type='email' name='Email' onChange={(event)=>setEmail(event.target.value)} value={email}></input>
            <button type='submit'>Erneut Anmelden</button>
        </form>
        </div>
        </div>
    )

}

export default ResubscribeForm