import React from 'react'

function LogInPage() {
  return (
    <div className="login">  
    <h1>Login</h1>
        <form action="">
            <input type="text" placeholder='Username'/>
            <input type="password" placeholder='Password'/>
            <button>Login</button>
        </form>
    </div>
  )
}

export default LogInPage