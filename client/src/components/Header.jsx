import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';
import image from '../styles/imgs/artificial-intelligenceai-svgrepo-com.svg';

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

  const username = userInfo?.username;
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

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark px-5 py-2">
        
        <Link to='/' className="navbar-brand d-flex ">
          <img src={image} alt='logo'/> TechWise  
        </Link>
        
        <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-start bg-dark text-white" tabIndex="-1" id="navbarOffcanvasLg">
        <div className="offcanvas-header" data-bs-theme="dark">
          <h3 className="offcanvas-title" id="offcanvasNavbarLabel">
            <Link to='/' className="navbar-brand d-flex ">
              <img src={image} alt='logo'/> TechWise  
            </Link>
          </h3>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
          <div className="offcanvas-body text-white">
            <ul className="navbar-nav justify-content-end flex-grow-1 text-white">
              <li><a className="dropdown-item me-4" href="#">About Us</a></li>
              <li><a className="dropdown-item me-4" href="#">Contact Us</a></li>
              {username && (
              <>
              <li className="nav-item dropdown me-4 ">
                <a className="text-dark dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {username}
                </a>
                <ul className="dropdown-menu text-white">
                  <li> <Link className="dropdown-item" to='/create'>Create New Post</Link> </li>
                  <li> <Link className="dropdown-item" to={`/profile/${userInfo.id}`}>Profile</Link> </li>
                 
                </ul>
              </li>
                <li className="nav-item"><a onClick={logout}>Logout</a> </li>
              </>
              )}
              {!username && (
              <>
                <li> <Link className="nav-item text-white me-4" to='/login'>Login</Link> </li>
                <li> <Link className="nav-ite text-white" to='/register'>Register</Link> </li>
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