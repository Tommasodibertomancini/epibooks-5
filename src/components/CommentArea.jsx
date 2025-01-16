import CommentList from './CommentList';
import AddComment from './AddComment';
import Error from './Error';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

const CommentArea = (props) => {
  // state = {
  //   comments: [],
  //   isLoading: true,
  //   isError: false,
  //   newUpdate: false,
  // };

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [newUpdate, setNewUpdate] = useState(false);

  const getBook = async () => {
    setIsLoading(true);
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + props.asin,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzEwODA3ZGI3MzAwMTU0MDYzYWUiLCJpYXQiOjE3MzY3NzM5MjIsImV4cCI6MTczNzk4MzUyMn0.OVzrySUHhFDCw6DReVLpW87EXfMqm4h_3z9n3hgH3jI',
          },
        }
      );
      if (response.ok) {
        let commentsArr = await response.json();
        setComments(commentsArr);
        setIsLoading(false);
        setIsError(false);
      } else {
        setIsLoading(false);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const putNewUpdate = () => {
    setNewUpdate(!newUpdate);
  };

  useEffect(() => {
    getBook();
  }, [props.asin, newUpdate]);

  return (
    <div className='text-center' data-testid='commentAreaId'>
      {isLoading && <Spinner animation='border' variant='success' />}
      {isError && !isLoading && <Error />}
      {props.asin && !isLoading && (
        <>
          <AddComment
            asin={props.asin}
            newUpdate={newUpdate}
            putNewUpdate={putNewUpdate}
          />
          <CommentList
            commentsToShow={comments}
            newUpdate={newUpdate}
            putNewUpdate={putNewUpdate}
          />
        </>
      )}
    </div>
  );
};

export default CommentArea;