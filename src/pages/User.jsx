import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import CardItem from '../components/CardItem'

const User = () => {
  const [spots, setSpots] = useState([])

  const fetchSpots = async () => {
    const requests = [
      'https://project-test-mi641qsph-aki168.vercel.app/spots',
      'https://project-test-chbyxl4da-aki168.vercel.app/users'
    ]
    await axios.all([...requests.map(url => axios.get(url))])
      .then((res) => {
        const spotsData = res[0].data
        const userData = res[1].data
        let pickList = userData[0].spotList
        let matchedSpots = []
        spotsData.forEach(item => {
          if (item.id in { 2: '', 5: '' }) {
            matchedSpots.push(item)
          }
        })
        setSpots(matchedSpots)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchSpots()
  }, [])
  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>會員中心 - 收藏列表</h2>
      <div className='row'>
        {spots.map(item => {
          const { id, ...props } = item
          return <CardItem key={id} {...props} />
        })}
      </div>
    </div>
  )
}

export default User