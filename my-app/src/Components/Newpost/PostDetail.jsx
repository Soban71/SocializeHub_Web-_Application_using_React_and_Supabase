import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './PostDetail.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function PostDetail() {
  const navigate = useNavigate();

  const { id } = useParams();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null); // Initialize with null
  const [comment, setComment] = useState('');
  const [thumbsUpCount, setThumbsUpCount] = useState(0);

  useEffect(() => {
    getPost();
    getComments();
  }, [id]);

  async function getPost() {
    try {
      const { data, error } = await supabase.from('post').select('*').eq('id', id).single();

      if (error) {
        throw error;
      }

      if (data != null) {
        setPost(data);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  async function getComments() {
    try {
      const { data, error } = await supabase.from('comments').select('*').eq('post_id', id);

      if (error) {
        throw error;
      }

      if (data != null) {
        setComments(data);
      }
    } catch (err) {
    //  alert(err.message);
    }
  }

  const handleUpdate = () => {
    navigate(`/updatePost/${id}`);
  };

  async function handleDelete() {
    try {
      // Delete comments associated with the post
      await supabase.from('comments').delete().eq('post_id', id);
  
      // Now delete the post
      await supabase.from('post').delete().eq('id', id);
  
      console.log("Deleted successfully");
      alert("Deleted successfully");
      navigate('/'); // or navigate to another appropriate route
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
  
  
  
  const handleCommentSubmit = async () => {
    try {
      // Add the new comment to the database
      const { data, error } = await supabase.from('comments').insert([
        { post_id: id, comment: comment },
      ]);
  
      if (error) {
        throw error;
      }
  
      // Update the local state with the new comment
      setComments(comments ? [...comments, data[0]] : [data[0]]);
      setComment('');
  
      // Refresh comments
      alert('comment posted successfully');
       await getComments(); // Wait for the comments to be fetched before displaying the alert
    } catch (err) {
      setComment(''); // Clear the comment input field
    }
  };
  

  const handleThumbsUp = async () => {
    try {
      setThumbsUpCount(thumbsUpCount + 1);

      await supabase
        .from('post')
        .update({ thumbsUpCount: thumbsUpCount + 1 })
        .eq('id', id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="post-detail-container">
      {post && (
        <div>
          <h2> {post.title}</h2>
          <p><b>Description:</b> {post.description}</p>
          <img src={post.imagesrc} alt={post.title} />

          <div className="thumbs-up-section">
            <button onClick={handleThumbsUp} style={{ marginTop: 20 }}>
              👍 ({thumbsUpCount})
            </button>
          </div>

          <div className="comments-list">
            <h3>Comments:</h3>
            {comments ? (
              <ul>
                {comments.map((c, index) => (
                  <li key={index}>{c.comment}</li>
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          <div className="comment-section">
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Comment</button>
          </div>

         

          <div className="action-buttons">
            <button onClick={handleUpdate}><FontAwesomeIcon icon={faPencil} /></button>
            <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
