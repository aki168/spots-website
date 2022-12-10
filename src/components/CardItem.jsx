import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardItem({ name, description, pictureUrl }) {

  const formatDesc = (text) => {
    if (text.length > 55) {
      return text.slice(0, 55) + ' ....'
    }
    return text
  }




  return (
    <div className='col-12 col-lg-4 px-2 mb-2'>
      <Card className='px-0' style={{minHeight:"450px"}}>
        <Card.Img variant="top" src={pictureUrl} />
        <Card.Body>
          <Card.Title className='fw-bold'>{name}</Card.Title>
          <Card.Text>
            {formatDesc(description)}
          </Card.Text>
          <Button variant="success">前往查看</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardItem