import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNav({ isLogin }) {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='fw-bold'>台灣景點網</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#/">首頁</Nav.Link>
            {isLogin ?
              <>
                <Nav.Link href="/#/user">會員專區</Nav.Link>
                <Nav.Link href="/#/admin">後臺管理</Nav.Link>
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