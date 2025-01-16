import SingleBook from './SingleBook';
import CommentArea from './CommentArea';
import { Col, Form, Row } from 'react-bootstrap';

import '/public/assets/css/bookList.css';
import { useState } from 'react';

const BookList = (props) => {
  // state = {
  //   searchQuery: '',
  //   selectedBookAsin: '',
  // };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookAsin, setSelectedBookAsin] = useState('');

  const putSelectedBook = (newBookAsin) => {
    setSelectedBookAsin(newBookAsin);
  };

  return (
    <>
      <Row className='justify-content-center mt-5'>
        <Col xs={12} md={4} className='text-center'>
          <Form.Group>
            <Form.Control
              type='search'
              placeholder='Cerca un libro'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className='g-2 mt-3 position-relative'>
        <Col md={9}>
          <Row>
            {props.books
              .filter((b) => b.title.toLowerCase().includes(searchQuery))
              .map((b) => (
                <Col
                  xs={12}
                  md={3}
                  className='mb-3'
                  key={b.asin}
                  data-testid='singleBookItem'
                >
                  <SingleBook
                    book={b}
                    selectedBookAsin={selectedBookAsin}
                    putSelectedBook={putSelectedBook}
                  />
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={3} className='commentCol ps-3'>
          <CommentArea asin={selectedBookAsin} />
        </Col>
      </Row>
    </>
  );
};

export default BookList;