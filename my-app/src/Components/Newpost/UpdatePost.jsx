// UpdatePost.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './UpdatePost.css';

function UpdatePost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    getPost();
  }, [id]);

  async function getPost() {
    try {
      const { data, error } = await supabase.from('post').select('*').eq('id', id).single();

      if (error) {
        throw error;
      }

      if (data != null) {
        setPost(data);
        setTitle(data.title);
        setDescription(data.description);
        setImageSrc(data.imagesrc);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  const handleUpdate = async () => {
    try {
      await supabase.from('post').update({ title, description, imagesrc: imageSrc }).eq('id', id);
      navigate(`/postDetail/${post.id}`)
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="update-post-container">
      {post && (
        <div>
          <h2>Update Post</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="imageSrc">Image Source (Path):</label>
            <input type="text" id="imageSrc" value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} />
          </div>
          <div className="form-group">
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePost;
