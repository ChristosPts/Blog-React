// AuthorProfile.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import Post from '../components/Post';
 
function AuthorProfile() {
  const { authorId } = useParams(); // Access the authorId from the URL params
  const [author, setAuthor] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch the author's profile data and posts
    axios
      .get(`http://localhost:5000/profile/${authorId}`)
      .then((response) => {
        const { author, posts } = response.data;
        setAuthor(author);
        setPosts(posts);
      })
      .catch((error) => {
        console.error('Error fetching author profile:', error);
      });
  }, [authorId]); // Use authorId as a dependency for the useEffect hook

  return (
    <div>
      <h2>Author Profile: {author}</h2>
      <div className="author-posts">
        {posts.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            summary={post.summary}
            cover={post.cover}
            _id={post._id}
            createdAt={post.createdAt}
            author={post.author}
          />
        ))}
      </div>
    </div>
  );
}

export default AuthorProfile;
