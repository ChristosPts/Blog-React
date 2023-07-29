import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function Layout() {
  return (
    <>    
        <Header/>
        <main className='container h-100'>
           <div className="row h-100 py-5">
            <Outlet/>
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default Layout