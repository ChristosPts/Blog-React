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
           setUserInfo(null);
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
    <div className='older-section h-100 d-flex flex-column align-items-center py-5'>
      <div className="row older-section d-flex flex-wrap justify-content-center ">
          
      <div className="d-flex justify-content-between align-items-center">
        <h1>{author}'s Posts</h1>
        <h4> {userInfo && userInfo.id === authorId && (
          <a title='Delete Account' className='dlt-acc-btn' onClick={handleDeleteAccount}>Delete</a>
        )} </h4>
     </div>
      <hr/>
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