import Layout from './layouts/Layout'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import RegisterPage from './pages/RegisterPage'
import './styles.css'
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path = "/" element = { <Layout/> }>
            <Route index element = { <HomePage/> } />
            <Route path = {'/login'} element = { <LogInPage/> }/>
            <Route path = {'/Register'} element = { <RegisterPage/> }/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
