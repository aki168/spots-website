import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>台灣景點網 - 登入</h2>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="輸入email" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>密碼</Form.Label>
        <Form.Control type="password" placeholder="輸入密碼" />
      </Form.Group>
      <Button variant="success" type="submit">
        送出
      </Button>
    </Form>
    </div>
  )
}

export default Login