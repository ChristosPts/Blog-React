// HomePage.jsx
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

  // Separate the posts into two arrays: recentPosts and otherPosts
  const recentPosts = posts.slice(0,4);
  const otherPosts = posts.slice(4);

  return (
    <div className='py-5 h-100 d-flex flex-column align-items-center'>
      
     
      <div className='row latest-section d-flex '>
      <h1>Latest News</h1> <hr/>
        <div className='col-lg-8 d-flex flex-column  '>
          {recentPosts.length > 0 && recentPosts.slice(0, 2).map(post => (
            <Post key={post._id} {...post}/>
          ))}
        </div>
        <div className='col-lg-4 d-flex flex-column '>
          {recentPosts.length > 0 && recentPosts.slice(2).map(post => (
            <Post key={post._id} {...post}/>
          ))}
        </div>
      </div>

      
      
     
        <div className='row older-section d-flex flex-wrap justify-content-center '>
        <h1 className='mt-5'>Older Posts</h1> <hr/>
          {otherPosts.length > 0 && otherPosts.map(post => (
            <Post key={post._id} {...post} />
          ))}
        </div>
    </div>
  );
}

export default HomePage;
