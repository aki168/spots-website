import axios from 'axios';
import { useEffect, useState } from 'react'
import CardItem from '../components/CardItem'

const Home = () => {

  const [spots, setSpots] = useState([])
  
  const fetchSpots = async () => {
    await axios.get("https://spots-website-server.vercel.app/spots")
      .then((res) => {
        if (res?.data) {
          setSpots(res.data)
        }
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchSpots()
  }, [])
  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>台灣景點網 - 首頁</h2>
      <div className='row'>
        {spots.map(item => {
          const { _id, ...props } = item
          return <CardItem key={_id} _id={_id} {...props} />
        })}
      </div>
    </div>
  )
}

export default Home