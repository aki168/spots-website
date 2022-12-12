import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNav({ isLogin, isAdmin }) {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='fw-bold'>台灣景點網</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#/">首頁</Nav.Link>
            {isLogin ?
              <Nav.Link href={isAdmin ? '/#/admin' : '/#/user-:userId'}>
                {isAdmin ? '後台管理' : '會員中心'}
              </Nav.Link>
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