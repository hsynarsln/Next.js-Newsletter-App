import { useContext, useEffect, useState } from 'react';
import NotificationContext from '../../store/notification-context';
import CommentList from './comment-list';
import classes from './comments.module.css';
import NewComment from './new-comment';

function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setLoading(true);
      fetch('/api/comments/' + eventId)
        .then(res => res.json())
        .then(data => {
          setComments(data.comments);
          setLoading(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored in a database.',
      status: 'pending'
    });
    // send data to API
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return res.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was saved',
          status: 'success'
        });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'There was an error registering for newsletter.',
          status: 'error'
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !loading && <CommentList items={comments} />}
      {showComments && loading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
