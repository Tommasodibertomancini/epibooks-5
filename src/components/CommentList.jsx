import { ListGroup } from 'react-bootstrap';
import SingleComment from './SingleComment';

const CommentList = (props) => {
  return (
    <>
      {props.commentsToShow.length > 0 ? (
        <ListGroup style={{ color: 'black' }} className='mt-2'>
          {props.commentsToShow.map((comment) => (
            <SingleComment
              comment={comment}
              key={comment._id}
              setNewUpdate={props.putNewUpdate}
              data-testid='singleComment'
            />
          ))}
        </ListGroup>
      ) : (
        <h4 className='px-5 text-secondary'>No comment has been left yet</h4>
      )}
    </>
  );
};

export default CommentList;