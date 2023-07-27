import React, { useContext, useState } from 'react';
import axios from 'axios'; // Import Axios
import { Navigate } from 'react-router-dom';
import '../styles/loginRegister.css'
import { UserContext } from '../UserContext';
import eye from '../styles/eye.svg';
import eyec from '../styles/eye-closed.svg';


function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [redirect, setRedirect] = useState(false);

  async function register(e) {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please enter the same password in both fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        password,
      });

      if (response.status === 200) {
        setRedirect(true);

      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Name already taken');
      } else {
        alert('An error occurred. Please try again later.');
      }
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === true) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='register-page'>
      <h1>Register</h1>
     
      <form action='' onSubmit={register}>
        <h4>Username</h4>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      
        <h4>Password</h4>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

         
        <h4>Confirm Password</h4>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>

    </div>
  );
}

export default RegisterPage;
