import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const spotRef = useRef()
  const infoRef = useRef()
  const urlRef = useRef()
  const [spots, setSpots] = useState([])
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const name = spotRef.current.value
    const description = infoRef.current.value
    const pictureUrl = urlRef.current.value

    await axios.post('http://localhost:8888/spots', { name, description, pictureUrl })
      .then(res => {
        if (res?.data?.msg === '新增成功') {
          alert('新增成功')
          fetchSpots()
        } else {
          alert('網路不穩定，請稍後在試')
        }
      }).catch(err => console.log(err))
  }

  const fetchSpots = async () => {
    await axios.get('http://localhost:8888/spots')
      .then((res) => {
        if (res?.data) {
          setSpots(res.data)
          console.log(spots)
        }
      }).catch(err => console.log(err))
  }

  const delSpot = async (e) => {
    const objectId = e.target.id
    console.log(objectId)
    await axios.delete('http://localhost:8888/spots', { data: { objectId } })
      .then(res => {
        if (res?.data?.msg === '刪除成功') {
          alert('刪除成功')
          fetchSpots()
        } else {
          alert('網路不穩定，請稍後在試')
        }
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchSpots()
    if (!localStorage.getItem('isAdmin')) {
      navigate(`/`, { replace: true })
    }
  }, [])
  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>後台景點管理</h2>
      <Table responsive="md mb-3">
        <thead>
          <tr className='row'>
            <th className='col-2'>ID</th>
            <th className='col-2'>景點名稱</th>
            <th className='col-6'>介紹</th>
            <th className='col-2'> </th>
          </tr>
        </thead>
        <tbody>
          {spots.map(item => {
            const { _id, name, description } = item
            return (
              <tr key={_id} className='row'>
                <td className='col-2'><span style={{ fontSize: "4px" }}>{_id.slice(-6)}</span></td>
                <td className='col-2'>{name}</td>
                <td className='col-6'>{description}</td>
                <td className='col-2'>
                  <Button
                    className='btn-info me-1 mb-1' id={_id}>
                    編輯
                  </Button>
                  <Button
                    className='btn-danger' id={_id}
                    onClick={delSpot}
                  >
                    刪除
                  </Button>
                </td>
              </tr>)
          })}
        </tbody>
      </Table>

      <Form onSubmit={onSubmit} className='bg-light p-3 w-50'>
        <h3>GO 新增景點</h3>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>景點名稱</Form.Label>
          <Form.Control placeholder="輸入景點名稱" ref={spotRef} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>介紹</Form.Label>
          <Form.Control as='textarea' placeholder="輸入景點介紹" ref={infoRef} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="pictureUrl">
          <Form.Label>圖片網址</Form.Label>
          <Form.Control placeholder="輸入景點圖片網址" ref={urlRef} />
        </Form.Group>
        <Button className='text-light fw-bold btn-outline-info w-100 mb-2' type='submit'>
          新增景點
        </Button>
      </Form>
    </div>
  )
}

export default Admin