import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context';

const Register = () => {
  const navigate = useNavigate()
  const mailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()
  const { setIsAdmin, setToken } = useAuth()

  const goRegister = async (e) => {
    e.preventDefault()
    const mail = mailRef.current.value
    const password = passwordRef.current.value
    const name = nameRef.current.value

    await axios.post(`http://localhost:8888/register`, { mail, password, name, role:"user" })
      .then(async (res) => {
        if (res?.data?.msg === '註冊成功') {
          alert('註冊成功')
          navigate(`/`, { replace: true })
        } else if (res?.data?.msg === '您已經註冊過囉') {
          alert('您已經註冊過囉')
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>台灣景點網 - 註冊</h2>
      <Form onSubmit={goRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>暱稱</Form.Label>
          <Form.Control type="text" placeholder="輸入您的暱稱" ref={nameRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="輸入email" ref={mailRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>密碼</Form.Label>
          <Form.Control type="password" placeholder="輸入密碼" ref={passwordRef} />
        </Form.Group>
        <Button variant="success" type="submit">
          送出
        </Button>
      </Form>
    </div>
  )
}

export default Register