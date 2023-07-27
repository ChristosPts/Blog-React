import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>    
        <Header/>
        <main className='container'>
            <Outlet/>
        </main>
    </>
  )
}

export default Layout