import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ posts, setFilteredPosts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    setFilteredPosts(filteredPosts);
  };
  

 

  return (
    <div className="navbar">
      <div className="left-section">
        <span className="title">HistoryHub</span>
       
      </div>

      <div className="right-section">
        <Link to="/">Home</Link>
        <Link to="/NewPost">Create Post</Link>
      </div>
    </div>
  );
};

export default Navbar;
