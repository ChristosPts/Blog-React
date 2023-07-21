import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='header'>
        <Link to='/' className='logo'>Logo</Link>
        <nav className='navbar'>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header