import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="py-3 bg-dark text-white mb-0">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3 ">
      <li className="nav-item"><Link to={'/'} className="nav-link px-2 text-white">Home</Link></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white">About</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Contact</a></li>
      <li className="nav-item">
        <Link to={'https://github.com/ChristosPts'} 
              className="nav-link px-2 text-white" 
              target="_blank">
                Github
        </Link>
      </li>
    </ul>
    <p className="text-center pt-3">© TechWise - No rights reserved</p>
  </footer>
  )
}

export default Footer