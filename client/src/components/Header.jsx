import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:5000/profile', {
      withCredentials: true,
    })
    .then(response => {
      setUserInfo(response.data);
    })
    .catch(error => {
      console.error('Error fetching profile:', error);
    });
  }, []);

  function logout() {
    axios.post('http://localhost:5000/logout', null, {
      withCredentials: true,
    })
    .then(() => {
      setUserInfo(null);
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
        {username ? (
          <ul>
            <li><Link to="/create">Create new post</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        ) : (
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;