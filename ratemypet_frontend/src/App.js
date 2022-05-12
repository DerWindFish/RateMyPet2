import './App.css'
import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import { GetPets } from './services/PetServices'
import Spalsh from './pages/Spalsh'
import HomePage from './pages/HomePage'
import Nav from './components/Nav'
import Pets from './pages/Pets'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import UserOptions from './pages/UserOptions'




function App() {

  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [pet, setPet] = useState([])

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  useEffect(() => {
    const getTheAnimals = async () => {
      const data = await GetPets()
      setPet(data)
    }
    getTheAnimals()
  }, [])

  return (
    <div className='App'>
      <Nav 
        authenticated={authenticated}
        user={user}
      />
      <Routes>
        <Route path='/' element={<Spalsh />} />
        <Route path='/homepage' element={<HomePage />} />
        {/* <Route path='/ratethepets' element={<Pets />} /> */}
        <Route path='/login' element={<LoginPage 
          setUser={setUser}
          user={user}
          authenticated={authenticated}
          toggleAuthenticated={toggleAuthenticated}
        />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user_options' element={<UserOptions />} />
      </Routes>
    </div>
  )
}

export default App
