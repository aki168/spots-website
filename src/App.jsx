import { useState, useEffect } from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Outlet,
  Navigate
  // NavLink,
  // useNavigate,
  // useParams,
} from 'react-router-dom';
import { useAuth, AuthContext } from './context';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'
import Admin from './pages/Admin';
import Spot from './pages/Spot';
import Navbar from './components/MyNav'

const Layout = ({ token, isAdmin }) => {
  return (
    <>
      <Navbar isLogin={token} isAdmin={isAdmin} />
      <Outlet />
    </>
  )
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

// const ParseRole = () => {
//   const { isAdmin } = useAuth()
//   return isAdmin ? <Route path='/admin' element={<Admin />} /> : <Route path='/user-:userId' element={<User />} />
// }

function App() {
  const [token, setToken] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <HashRouter>
      <AuthContext.Provider value={{ token, setToken, isAdmin, setIsAdmin}}>
        <Routes>
          <Route path='/' element={<Layout token={token} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}>
            <Route path='/' element={<Home />} />
            <Route path='/spot-:spotId' element={<Spot />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/admin' element={<Admin />} />
              <Route path='/user-:userId' element={<User />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </HashRouter>
  )
}

export default App
