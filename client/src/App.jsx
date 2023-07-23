import { UserContextProvider } from './UserContext'
import Layout from './layouts/Layout'
import CreatePost from './pages/CreatePost'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'
import './styles.css'
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <UserContextProvider>   
      <Routes>
        <Route path = "/" element = { <Layout/> }>
            <Route index element = { <HomePage/> } />
            <Route path = {'/login'} element = { <LogInPage/> }/>
            <Route path = {'/register'} element = { <RegisterPage/> }/>
            <Route path = {'/create'} element = { <CreatePost/> }/>
        </Route>
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
