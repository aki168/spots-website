import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context';


const Login = () => {
  const navigate = useNavigate()
  const mailRef = useRef()
  const passwordRef = useRef()
  const { setIsAdmin, setToken } = useAuth()

  const goLogin = async (e) => {
    e.preventDefault()
    const mail = mailRef.current.value
    const password = passwordRef.current.value

    await axios.post(`http://localhost:8888/users`, { mail, password })
      .then(async (res) => {
        if (res?.data?.msg === '登入成功') {
          alert('登入成功')
          let { role } = res?.data?.info
          await setIsAdmin(role === 'admin')
          await setToken(res?.data?.info?.tId)
          localStorage.setItem('token', res?.data?.info?.tId)
          
          if (role === 'admin') {
            navigate(`/admin`, { replace: true })
            localStorage.setItem('isAdmin', true)
          }
          if (role === 'user') {
            navigate(`/user-${res?.data?.info?.id}`, { replace: true })
          }
        } else if (res?.data?.msg === '您的帳號或密碼錯誤') {
          alert('您的帳號或密碼錯誤')
        }
      }).catch(err => console.log(err))
  }


  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>台灣景點網 - 登入</h2>
      <Form onSubmit={goLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="輸入email" ref={mailRef} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>密碼</Form.Label>
          <Form.Control type="password" placeholder="輸入密碼" ref={passwordRef} required />
        </Form.Group>
        <Button variant="success" type='submit'>
          送出
        </Button>
      </Form>
    </div>
  )
}

export default Login