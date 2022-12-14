import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../context';
import axios from 'axios';


function MyNav() {

  const { token, setToken, isAdmin, setIsAdmin } = useAuth()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  const checkAuth = async () => {
    await axios.post('https://spots-website-server.vercel.app/auth', { token })
      .then((res) => {
        if (res.data?.info) {
          const { role } = res?.data?.info
          setIsAdmin(role === 'admin')
        }
      })
  }

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setToken(localStorage.getItem('token'))
      checkAuth()
    }
  }, [token])


  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className='fw-bold'>台灣景點網</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink className='text-dark text-decoration-none' to="/">首頁</NavLink>
            </Nav.Link>
            {token ?
              <>
                {
                  isAdmin ?
                    <Nav.Link>
                      <NavLink className='text-dark text-decoration-none' to='/admin'>
                        後台管理
                      </NavLink>
                    </Nav.Link>
                    :
                    <Nav.Link>
                      <NavLink className='text-dark text-decoration-none' to='/user'>
                        會員中心
                      </NavLink>
                    </Nav.Link>
                }
                <Button className='btn btn-outline-secondary btn-light ms-5 btn-sm' onClick={logout}>登出</Button>
              </>
              :
              <>
                <Nav.Link>
                  <NavLink className='text-dark text-decoration-none' to="/login">登入</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink className='text-dark text-decoration-none' to="/register">註冊</NavLink>
                </Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;