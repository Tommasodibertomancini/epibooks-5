import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddComment = (props) => {
  // state = {
  //   comment: {
  //     comment: '',
  //     rate: 1,
  //     elementId: this.props.asin,
  //   },
  // };

  const initialComment = {
    comment: '',
    rate: 1,
    elementId: props.asin,
  };

  const [comment, setComment] = useState({
    ...initialComment,
  });

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments',
        {
          method: 'POST',
          body: JSON.stringify(comment),
          headers: {
            'Content-type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEwODA3ZGI3MzAwMTU0MDYzYWUiLCJpYXQiOjE3MzY3NzM5MjIsImV4cCI6MTczNzk4MzUyMn0.OVzrySUHhFDCw6DReVLpW87EXfMqm4h_3z9n3hgH3jI',
          },
        }
      );
      if (response.ok) {
        alert('Recensione inviata!');
        setComment({
          ...initialComment,
        });
        props.putNewUpdate();
      } else {
        throw new Error('Qualcosa è andato storto');
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setComment({ ...initialComment });
  }, [props.asin]);

  return (
    <div className='my-3'>
      <Form
        onSubmit={(e) => {
          sendComment(e);
        }}
      >
        <Form.Group className='mb-2'>
          <Form.Label>Recensione</Form.Label>
          <Form.Control
            type='text'
            placeholder='Inserisci qui il testo'
            value={comment.comment}
            onChange={(e) =>
              setComment({
                ...comment,
                comment: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Valutazione</Form.Label>
          <Form.Control
            as='select'
            value={comment.rate}
            onChange={(e) =>
              setComment({
                ...comment,
                rate: e.target.value,
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Invia
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
