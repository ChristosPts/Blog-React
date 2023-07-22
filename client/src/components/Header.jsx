import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

function Header() {
  
  const {setUserInfo,userInfo} = useContext(UserContext)

  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      credentials: 'include',
      withCredentials: true,
    }).then(response => {
      response.json().then(userInfo => {
          setUserInfo(userInfo)
      })
    });
  }, []);
  
  function logout() {
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username

  return (
    <header className='header'>
        <Link to='/' className='logo'>Logo</Link>
        <nav className='navbar'>
            {username && ( 
              <>
                <ul>
                  <li><Link to="/create">Create new post</Link></li>
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
  )
}

export default Header