import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import axios from 'axios';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/post')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div className='d-flex flex-wrap justify-content-center'>
      {posts.length > 0 && posts.map(post => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  )
}

export default HomePage;