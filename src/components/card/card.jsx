import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const CardComponent = ({url , title , type , source , user , id}) => {
    return (
      <div className='cardStyle'>
        <Card style={{ width: "18rem", margin: "2rem" }} key={id}>
          <Card.Img variant="top" src={url} width="10rem" heigth="10rem" />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <ul>
                <li><strong>Type: </strong> {type} </li>
                <li><strong>Source: </strong> {source} </li>
                <li><strong>Username: </strong> {user} </li>
              </ul>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>

        {/* <img src={url} width={200} height={200} key={id} alt=""/> */}
      </div>
    );
}

export {CardComponent}