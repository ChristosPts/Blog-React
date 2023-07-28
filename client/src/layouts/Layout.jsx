import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function Layout() {
  return (
    <>    
        <Header/>
        <main className='container'>
           <div className="row ">
            <Outlet/>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default Layout