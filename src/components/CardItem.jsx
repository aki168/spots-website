import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context';

function CardItem({ _id, name, description, pictureUrl }) {

  const { token, setToken, isAdmin, setIsAdmin } = useAuth()

  const [isLike, setLike] = useState(false)
  const toggleLink = () => {
    setLike(prev => !prev)
  }

  const formatDesc = (text) => {
    if (text.length > 35) {
      return text.slice(0, 35) + ' ....'
    }
    return text
  }

  const UserOnlyPart = () => {
    return (
      isLike ?
        <Button variant="light" onClick={toggleLink}>取消收藏</Button>
        :
        <Button variant="dark" onClick={toggleLink}>加入收藏</Button>
    )
  }


  return (
    <div className='col-12 col-lg-4 px-2 mb-2'>
      <Card className='px-0' style={{ minHeight: "450px" }}>
        <Card.Img variant="top" src={pictureUrl ? pictureUrl : 'https://fakeimg.pl/350x200/'} />
        <Card.Body>
          <Card.Title className='fw-bold'>{name}</Card.Title>
          <Card.Text>
            {formatDesc(description)}
          </Card.Text>
          <div className='d-flex justify-content-between'>
            <NavLink to={`/spot-${_id}`}>
              <Button id={_id} variant="success">前往查看</Button>
            </NavLink>
            {
              (token && !isAdmin) && <UserOnlyPart/>
            }
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardItem