import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';

const Admin = () => {
  const [spots, setSpots] = useState([])

  const fetchSpots = async () => {
    await axios.get('https://project-test-mi641qsph-aki168.vercel.app/spots')
      .then((res) => {
        if (res?.data) {
          setSpots(res.data)
          console.log(spots)
        }
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchSpots()
  }, [])
  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>後台景點管理</h2>
      <Table responsive="md">
        <thead>
          <tr className='row'>
            <th className='col-1'>編號</th>
            <th className='col-2'>景點名稱</th>
            <th className='col-6'>介紹</th>
            <th className='col-2'> </th>
          </tr>
        </thead>
        <tbody>
          {spots.map(item => {
            const { id, name, description } = item
            return (
              <tr key={id} className='row'>
                <td className='col-1'>{id}</td>
                <td className='col-2'>{name}</td>
                <td className='col-6'>{description}</td>
                <td className='col-2'>
                  <Button className='btn-info me-1 mb-1'>編輯</Button>
                  <Button className='btn-danger'>刪除</Button>
                </td>
              </tr>)})}
        </tbody>
      </Table>
    </div>
  )
}

export default Admin