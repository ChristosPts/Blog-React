import React, { useState } from 'react'

function RegisterPage() {

  const [username, setUsername] = useState ('')
  const [password, setPassword] = useState ('')

  async function register (e) {
    e.preventDefault()
    await fetch('http://localhost:5000/register', {
        method: 'POST',
        body: JSON.stringify ({username,password}),
        headers: {'Content-Type' : 'application/json'},
    }) 
  }

  return (
    <div className="register">
        <h1>Register</h1>  
        <form action="" onSubmit={register}>
            <input type="text" 
                   placeholder='Username'
                   value={username}
                   onChange={e => setUsername(e.target.value) }/>
            <input type="password" 
                   placeholder='Password'
                   value={password}
                   onChange={e => setPassword(e.target.value) }/>
 
            <button>Register</button>
        </form>
    </div>
  )
}

export default RegisterPage