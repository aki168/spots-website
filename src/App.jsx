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
import Navbar from './components/MyNav'

const Layout = ({token}) => {
  return (
    <>
      <Navbar isLogin={token}/>
      <Outlet />
    </>
  )
}

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth()
  return token ? <Outlet /> : <Navigate to="/login" replace />
}

function App() {
  const [token, setToken] = useState('')

  return (
    <HashRouter>
      <AuthContext.Provider value={{ token }}>
        <Routes>
          <Route path='/' element={<Layout token={token}/>}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoute/>}>
              <Route path='/user' element={<User />} />
              <Route path='/admin' element={<Admin />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </HashRouter>
  )
}

export default App
