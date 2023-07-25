import React, { useContext, useState } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import axios from 'axios';

function LogInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        const data = response.data;
        setUserInfo(data); // Update the user info in the context
        setRedirect(true);
      } else {
        setErrorMessage('Wrong username or password'); // Set error message for incorrect credentials
      }
    } catch (error) {
      
      setErrorMessage('An error occurred during login'); // Set error message for other errors
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="login">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message if exists */}
      <form onSubmit={login}>
        <input type="text"
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)} />
        <input type="password"
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LogInPage;
