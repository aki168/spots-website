import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';

function CardItem({id, name, description, pictureUrl }) {

  const formatDesc = (text) => {
    if (text.length > 35) {
      return text.slice(0, 35) + ' ....'
    }
    return text
  }

  // const goToItem = (e) => {
  //   console.log(e.target.id)
  // }




  return (
    <div className='col-12 col-lg-4 px-2 mb-2'>
      <Card className='px-0' style={{ minHeight: "450px" }}>
        <Card.Img variant="top" src={pictureUrl} />
        <Card.Body>
          <Card.Title className='fw-bold'>{name}</Card.Title>
          <Card.Text>
            {formatDesc(description)}
          </Card.Text>
          <NavLink to={`/spot-${id}`}>
            <Button id={id} variant="success">前往查看</Button>
          </NavLink>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardItem