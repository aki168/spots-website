import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams, NavLink } from 'react-router-dom';

const Spot = () => {
  let { spotId } = useParams();
  const [spot, setSpot] = useState({
    id: 0,
    name: '',
    pictureUrl: '',
    description: ''
  })

  const fetchSpot = async () => {
    await axios.get('http://localhost:8888/spots')
      .then((res) => {
        if (res?.data) {
          let spotIdNum = Number(spotId)
          const [takeSpot] = res.data.filter(item => item.id === spotIdNum)
          setSpot(takeSpot)
        }
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetchSpot()
  }, [])

  return (
    <div className='container py-3'>
      <h2 className='text-dark p-3'>景點詳情 - {spot.name}</h2>
      <div className='row justify-content-center'>
        <div className='col-8 px-2 mb-2'>
          <Card className='px-0' style={{ minHeight: "450px" }}>
            <Card.Img variant="top" src={spot.pictureUrl} />
            <Card.Body>
              <Card.Title className='fw-bold'>{spot.name}</Card.Title>
              <Card.Text>
                {spot.description}
              </Card.Text>
            </Card.Body>
          </Card>
        <NavLink to="/" className='row'>
          <Button className='btn btn-secondary btn-sm my-2'>返回</Button>
        </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Spot