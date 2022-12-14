import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react'
import Table from 'react-bootstrap/Table';

const Row = ({ item, delSpot, fetchSpots }) => {
  const { _id, name, description, pictureUrl } = item
  const [isEdit, setEdit] = useState(false)
  const [submitEdit, setSubmitEdit] = useState(false)
  const nameRef = useRef()
  const desRef = useRef()
  const urlRef = useRef()

  const updateSpot = async () => {
    const name = nameRef.current.value
    const description = desRef.current.value

    await axios.patch('https://spots-website-server.vercel.app/spots', { objectId: _id, name, description })
      .then(res => {
        if (res?.data?.msg === '修改成功') {
          alert('修改成功')
        } else {
          alert('網路不穩定，請稍後在試')
        }
      })
    setEdit(false)
    setSubmitEdit(true)
  }

  const toggleEdit = () => {
    setEdit(prev => !prev)
  }

  useEffect(() => {
    fetchSpots()
  }, [submitEdit])
  return (
    <tr className='row'>
      <td className='col-1'><span style={{ fontSize: "4px" }}>{_id.slice(-6)}</span></td>
      <td className='col-1'>
        {
          isEdit ?
            <textarea ref={nameRef}>{name}</textarea>
            :
            name
        }
      </td>
      <td className='col-5'>
        {
          isEdit ?
            <textarea ref={desRef} className='w-100' >{description}</textarea>
            :
            description
        }
      </td>
      <td className='col-3 overflow-auto'>
        {
          isEdit ?
            <textarea placeholder={pictureUrl} ref={urlRef} className='w-100' >{pictureUrl}</textarea>
            :
            <>
              <p style={{ fontSize: "4px" }} className='w-50'>
                {pictureUrl}
              </p>
            </>
        }
      </td>
      <td className='col-2'>
        <Button
          onClick={toggleEdit}
          className={`btn-${isEdit ? 'light' : 'info'} me-1 mb-1`} >
          {isEdit ? '取消' : '編輯'}
        </Button>
        {isEdit ?
          <Button
            className='btn-success' 
            onClick={updateSpot}
          >
            送出
          </Button>
          :
          <Button
            className='btn-danger' id={_id}
            onClick={delSpot}
          >
            刪除
          </Button>
        }
      </td>
    </tr>
  )
}


const Admin = () => {
  const spotRef = useRef()
  const infoRef = useRef()
  const urlRef = useRef()
  const [spots, setSpots] = useState([])

  const addSpot = async (e) => {
    e.preventDefault()
    const name = spotRef.current.value
    const description = infoRef.current.value
    const pictureUrl = urlRef.current.value

    await axios.post('https://spots-website-server.vercel.app/spots', { name, description, pictureUrl })
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
    await axios.get('https://spots-website-server.vercel.app/spots')
      .then((res) => {
        if (res?.data) {
          setSpots(res.data)
        }
      }).catch(err => console.log(err))
  }

  const delSpot = async (e) => {
    const objectId = e.target.id
    console.log(objectId)
    await axios.delete('https://spots-website-server.vercel.app/spots', { data: { objectId } })
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
  }, [])
  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>後台景點管理</h2>
      <Table responsive="md mb-3">
        <thead>
          <tr className='row'>
            <th className='col-1'>ID</th>
            <th className='col-1'>景點名稱</th>
            <th className='col-5'>介紹</th>
            <th className='col-3'>圖片網址</th>
            <th className='col-2'> </th>
          </tr>
        </thead>
        <tbody>
          {spots.map(item => (
            <Row key={item._id} item={item} delSpot={delSpot} fetchSpots={fetchSpots} />
          ))}
        </tbody>
      </Table>

      <Form onSubmit={addSpot} className='bg-light p-3 w-50'>
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