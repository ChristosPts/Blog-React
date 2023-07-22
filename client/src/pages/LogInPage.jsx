import React, { useContext, useState } from 'react'
import {Navigate} from "react-router-dom"
import { UserContext } from '../UserContext'


function LogInPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  async function login(e) {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data); // Update the user info in the context
        setRedirect(true);
      } else {
        alert('wrong username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  }
  
  

  if (redirect) {
    return <Navigate to = {'/'} />
  }

  return (
    <div className="login">  
    <h1>Login</h1>
        <form onSubmit={login}>
            <input type="text" 
                   placeholder='Username' 
                   value={username} 
                   onChange={ e => setUsername(e.target.value) }/>
            <input type="password" 
                   placeholder='Password'
                   value={password} 
                   onChange={ e => setPassword(e.target.value) }/>
            <button>Login</button>
        </form>
    </div>
  )
}

export default LogInPage