import { useState, useEffect } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Outlet,
  Navigate
} from 'react-router-dom';
import { useAuth, AuthContext } from './context';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import Admin from './pages/Admin';
import Spot from './pages/Spot';
import Navbar from './components/MyNav'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/" />
}


function App() {
  const [token, setToken] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <HashRouter>
      <AuthContext.Provider value={{ token, setToken, isAdmin, setIsAdmin }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/spot-:spotId' element={<Spot />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/user' element={<User />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </HashRouter>
  )
}

export default App
