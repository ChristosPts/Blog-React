import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
 

  useEffect(() => {
    axios.get('http://localhost:5000/profile', {
      credentials: 'include',
      withCredentials: true,
    })
    .then(response => {
      setUserInfo(response.data);
    })
    .catch(error => {
      // Check if the error is due to unauthorized (401) response
      if (error.response && error.response.status === 401) {
        setUserInfo(null); // User is not logged in
      } else {
        console.error('Error fetching profile:', error);
      }
    });
  }, []);

  const navigate = useNavigate();

  function logout() {
    axios.post('http://localhost:5000/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      setUserInfo(null);
      navigate('/'); // Redirect the user to the home page after logout
    })
    .catch(error => {
      console.error('Error during logout:', error);
    });
  }

  const username = userInfo?.username;

  return (
    <header className='header'>
        <Link to='/' className='logo'>Logo</Link>
        <nav className='navbar'>
            {username && ( 
              <>
                <ul>
                <li>
                  <div className='dropdown'>
                    <button className='dropbtn'>Actions</button>
                    <div className='dropdown-content'>
                      <Link to='/create'>Create New Post</Link>
                      {userInfo && (
                        <Link to={`/profile/${userInfo.id}`}>Profile</Link>
                      )}
                    </div>
                  </div>
                  </li>
                 
                  <li><a onClick={logout}>Logout</a></li>
                </ul>
              </>
            )}
            {!username && ( 
              <>
              <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </ul>
              </>
            )}


           
        </nav>
    </header>
  );
}

export default Header;


