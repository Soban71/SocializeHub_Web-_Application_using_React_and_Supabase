import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Home() {
  const navigate = useNavigate();


  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getPosts();
  }, []);

 
  async function getPosts() {
    try {
      let query = supabase.from('post').select('*').limit(10);
  
      if (searchTerm) {
        query = query.like('title', `%${searchTerm}%`, { caseSensitive: false });
      }
  
      const { data, error } = await query;
  
      if (error) {
        throw error;
      }
  
      if (data != null) {
        setPosts(data);
      }
    } catch (err) {
      alert(err.message);
    }
  }
  
  
  
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchTerm('');
      setPosts([]);
      getPosts();
      navigate('/');
    } else {
      getPosts();
    }
  };
  
  
  

  return (
    <div className="home-container">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/postDetail/${post.id}`} className="post-card">
            <p style={{ marginBottom: 20 }}>{post.Date}</p>
            <h3>{post.title}</h3>
            <p style={{ marginTop: 10 }}>👍{post.thumbsUpCount}</p>
          </Link>
        ))}
      </div>
      <div className="post-detail">
      </div>
    </div>
  );
}

export default Home;
