import { useEffect, useState } from 'react'
import { UserContextProvider } from './UserContext'
import Layout from './layouts/Layout'
import AuthorProfile from './pages/AuthorProfile'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import PostPage from './pages/PostPage'
import RegisterPage from './pages/RegisterPage'
import {Route, Routes} from "react-router-dom"
 

function App() {
  return (
    <div className='App'>
      <UserContextProvider>   
      <Routes>
        <Route path = "/" element = { <Layout/> }>
            <Route index element = {<HomePage/>}/>
            <Route path = {'/login'} element = {<LogInPage/>}/>
            <Route path = {'/register'} element = {<RegisterPage/>}/>
            <Route path = {'/create'} element = {<CreatePost/>}/>
            <Route path = {'/post/:id'} element = {<PostPage/>}/>
            <Route path = {'/edit/:id'} element = {<EditPost/>}/>
            <Route path={'/profile/:authorId'} element={<AuthorProfile />} />
            <Route path='*' element={<HomePage/>} /> 
        </Route>
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
