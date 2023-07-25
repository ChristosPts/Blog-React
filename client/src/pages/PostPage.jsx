import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import axios from 'axios';

function PostPage() {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/${id}`)
      .then((response) => {
        setPostInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, []);

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/post/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          // Post deleted successfully, navigate to homepage or other page
          navigate(`/profile/${userInfo.id}`);
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        });
    }
  };

  if (!postInfo) return '';

  return (
    <div className='post-page'>
      <h2>{postInfo.title}</h2>
      <time> {format(new Date(postInfo.createdAt), 'd MMM, yyyy | HH:mm')} </time>
      <h4>by {postInfo.author?.username}</h4>
      {userInfo && userInfo.id === postInfo.author?._id && (
        <div>
          <Link className='edit-btn' to={`/edit/${postInfo._id}`}>Edit</Link>
          <button className='delete-btn' onClick={handleDelete}>Delete</button>
        </div>
      )}
      <img src={`http://localhost:5000/${postInfo.cover}`} alt="" />
      <p dangerouslySetInnerHTML={{ __html: postInfo.content }}></p>
    </div>
  );
}

export default PostPage;
