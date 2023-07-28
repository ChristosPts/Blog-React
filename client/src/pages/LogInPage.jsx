import React, { useContext, useState } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import axios from 'axios';
import '../styles/forms.css'
import eye from '../styles/eye.svg';
import eyec from '../styles/eye-closed.svg';

function LogInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
  
  const { setUserInfo } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password

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
        localStorage.setItem('isLoggedIn', true); 
        setRedirect(true);
      } else {
        setErrorMessage('Wrong username or password'); // Set error message for incorrect credentials
      }
    } catch (error) {
      
      setErrorMessage('An error occurred during login'); // Set error message for other errors
    }
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
    return <Navigate to={'/'} />;
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="login-page">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message if exists */}
      <form onSubmit={login}>
        <h4>Username</h4>
        <input type="text"
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)} />
        <h4>Password</h4>
        <input type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)} />
        <button
          type='button'
          className='show-hide-btn'
          onClick={() => setShowPassword(!showPassword)}
        >
             {showPassword ? (
            <>
               Hide Password <img src={eyec} alt="Hide" />
            </>
          ) : (
            <>
               Show Password <img src={eye} alt="Show" />
            </>
          )}
          </button>  <hr/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LogInPage;
