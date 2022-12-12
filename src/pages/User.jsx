import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import CardItem from '../components/CardItem'

const User = () => {
  const [spots, setSpots] = useState([])

  let lToken = localStorage.getItem('token')

  const fetchSpots = async () => {
    const requests = [
      'http://localhost:8888/spots',
      'http://localhost:8888/users'
    ]
    await axios.all([...requests.map(url => axios.get(url))])
      .then((res) => {
        const spotsData = res[0].data
        const userData = res[1].data.filter(item => item._id === lToken)
        let pickList = userData[0].spotList
        let matchedSpots = spotsData.filter(item => {
          return pickList.includes(item._id) === true
        })
        // let matchedSpots = []
        // spotsData.forEach(item => {
        //   if (item.id in { 2: '', 5: '' }) {
        //     matchedSpots.push(item)
        //   }
        // })
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