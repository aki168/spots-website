import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Button} from 'react-bootstrap';
import { useEffect } from 'react';

function MyNav({ token, isAdmin, setToken }) {
  let lToken = localStorage.getItem('token')
  let lAdmin = localStorage.getItem('isAdmin')
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
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
                <Nav.Link href={lAdmin ? '/#/admin' : '/#/user-:userId'}>
                  { lAdmin ? '後台管理' : '會員中心'}
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