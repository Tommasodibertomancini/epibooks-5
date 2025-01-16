import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';


const SingleBook = (props) => {
  // state = {
  //   selected: false,
  // };
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    props.putSelectedBook(props.book.asin);
  };

  const checkSelection = () => {
    if (props.selectedBookAsin === props.book.asin) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  useEffect(() => {
    checkSelection();
  }, [props.selectedBookAsin]);

  return (
    <>
      <Card
        onClick={() => {
          handleClick();
        }}
        style={{ border: selected ? '3px solid red' : 'none' }}
        data-testid='singleBookElement'
      >
        <Card.Img variant='top' src={props.book.img} />
        <Card.Body>
          <Card.Title style={{ color: 'black' }}>{props.book.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleBook;