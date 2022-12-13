import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import CardItem from '../components/CardItem'

const User = () => {
  const token = localStorage.getItem('token')
  const [spots, setSpots] = useState([])

  const fetchSpots = async () => {
    const authData = axios.post('https://spots-website-server.vercel.app/auth', { token })
    const getSpots = axios.get('https://spots-website-server.vercel.app/spots')

    await axios.all([authData, getSpots]).then(axios.spread((...res) => {
      const userSpotList = res[0].data?.info?.spotList
      const spotsData = res[1].data
      let list = []
      spotsData.forEach(item => {
        userSpotList.forEach(sId => {
          if (item._id === sId) {
            list.push(item)
          }
        })
      })
      setSpots(list)
    })
    )
  }

  useEffect(() => {
    fetchSpots()
  }, [])
  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>會員中心 - 收藏列表</h2>
      <div className='row'>
        {spots.length >= 1 ?
          spots.map(item => {
            const { id, ...props } = item
            return <CardItem key={id} id={id} {...props} />
          }) :
          <div className='alert alert-warning w-100'>目前尚未有收藏景點</div>
        }
      </div>
    </div>
  )
}

export default User