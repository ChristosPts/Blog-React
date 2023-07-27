import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import image from '../styles/artificial-intelligenceai-svgrepo-com.svg';

function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
 

  useEffect(() => {
    axios
      .get('http://localhost:5000/profile', {
        credentials: 'include',
        withCredentials: true,
      })
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
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
    axios
      .post('http://localhost:5000/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        setUserInfo(null);
        navigate('/'); // Redirect the user to the home page after logout
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  }

  const username = userInfo?.username;
 

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-secondary px-5 py-2">
        
        <Link to='/' className="navbar-brand d-flex ">
        <img src={image} alt='logo'/> TechWise  
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbarOffcanvasLg">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1">
              {username && (
              <>
              <li className="nav-item dropdown me-4">
                <a className="text-dark dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li> <Link className="dropdown-item" to='/create'>Create New Post</Link> </li>
                  <li> <Link className="dropdown-item" to={`/profile/${userInfo.id}`}>Profile</Link> </li>
                </ul>
              </li>
                <li className="nav-item"><a onClick={logout}>Logout</a> </li>
              </>
              )}
              {!username && (
              <>
                <li> <Link className="nav-item text-dark me-4" to='/login'>Login</Link> </li>
                <li> <Link className="nav-item text-dark" to='/register'>Register</Link> </li>
            </>
          )}
            </ul>
          </div>
        </div>
      </nav>

    </header>
  );
}

export default Header;