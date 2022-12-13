import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { useEffect,useState } from 'react';
import { useAuth } from '../context';


function MyNav() {

  const { token, setToken } = useAuth()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/#/" className='fw-bold'>台灣景點網</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#/">首頁</Nav.Link>
            { token ?
              <>
                <Nav.Link href='/#/user-:userId'>
                  會員中心
                </Nav.Link>
                <Nav.Link href='/#/admin'>
                  後台管理
                </Nav.Link>
                <Button className='btn btn-outline-secondary btn-light ms-5 btn-sm' onClick={logout}>登出</Button>
              </>
              :
              <>
                <Nav.Link href="/#/login">登入</Nav.Link>
                <Nav.Link href="/#/register">註冊</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;