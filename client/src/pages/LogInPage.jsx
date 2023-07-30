import React, { useContext, useState } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import axios from 'axios';
import '../styles/forms.css'
import eye from '../styles/imgs/eye.svg';
import eyec from '../styles/imgs/eye-closed.svg';

function LogInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
  
  const { setUserInfo,userInfo } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const uname = userInfo?.username;

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
        setUserInfo(data); 
        setRedirect(true);
      } else {
        setErrorMessage('Wrong username or password'); 
      }
    } catch (error) {
      setErrorMessage('An error occurred during login'); 
    }
  }

  if (redirect || uname !== undefined) { return <Navigate to={'/'} /> }
  
  return (
    <div className="login-page">
      <h1>Login</h1>
      {errorMessage && <div className="error-message">{errorMessage} </div>}
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
            <> Hide Password <img src={eyec} alt="Hide" /> </>
          ) : (
            <> Show Password <img src={eye} alt="Show"/> </>
          )}
          </button>  
          <hr/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LogInPage;