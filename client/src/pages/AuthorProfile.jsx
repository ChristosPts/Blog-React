import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Post from '../components/Post';

function AuthorProfile() {
  const { authorId } = useParams();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [author, setAuthor] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/profile/${authorId}`)
      .then((response) => {
        const { author, posts } = response.data;
        setAuthor(author);
        setPosts(posts);
      })
      .catch((error) => {
        console.error('Error fetching author profile:', error);
        navigate('/');
      });
  }, [authorId]);

  
  function logout() {
    axios
      .post('http://localhost:5000/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        setUserInfo(null);
        navigate('/'); // Redirect the user to the home page after logout
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  }

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? Deleting your account will also delete all of your posts.'
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/profile/${authorId}`)
        .then(() => {
          // Clear the user info and set isLoggedIn to false
          setUserInfo(null);
          localStorage.setItem('isLoggedIn', false);
          // Logout the user after successful deletion
          logout();
        })
        .catch((error) => {
          console.error('Error deleting user profile:', error);
        });
    } else {
      // Do nothing if the user cancels the deletion
    }
  };



  return (
    <>
      <h1 className='mt-5'>{author}'s Posts</h1>
      {userInfo && userInfo.id === authorId && (
        <button className="delete-profile-btn" onClick={handleDeleteAccount}>Delete</button>
      )}
      <div className="author-posts d-flex flex-wrap justify-content-center">
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
    </>
  );
}

export default AuthorProfile;
