import { useState } from 'react'
import UnsubscribeForm from './components/UnsubscribeForm'
import logo from './WGW-Logo.jpg'
import ResubscribeForm from './components/ResubscribeForm'





function App() {
  const [count, setCount] = useState(0)


  return (
    <><header>
      <div style={{ width: '100%', height: '100px', border: '1px solid black' }}>
          <img src={logo} href='http://www.wgw-ict.ch' style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}>
          </img>
      </div>
    </header>
      <h2>Wenn sie keine weiteren E-Mails von uns erhalten möchten, können Sie sich unten abmelden.<br />
        Dann werden sie nicht mehr von uns per E-Mail kontaktiert.</h2>
        <div className='forms-container'>
      <UnsubscribeForm />
      <ResubscribeForm />
      </div>
    </>
  )
}

export default App
