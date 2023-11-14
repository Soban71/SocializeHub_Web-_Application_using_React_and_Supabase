import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import './NewPost.css';

const NewPosts = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insert post with image URL into the 'post' table
      const { data, error } = await supabase.from('post').insert({
        title: title,
        description: description,
        imagesrc: imageSrc,
        Date: dateTime,
      }).single();

      if (error) throw error;

      window.alert('Post submitted successfully!');
      window.location.reload();
    } catch (err) {
      console.error('Error submitting post:', err);
    }
  };

  return (
    <div className="new-posts-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageSrc">Image Source (Path):</label>
          <input
            type="text"
            id="imageSrc"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date and Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewPosts;
