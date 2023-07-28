import { format, isValid } from 'date-fns';
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
       // console.error('Error fetching post:', error);
        navigate('/');
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

  if (!postInfo) {
    return null;
  }

  return (
    <div className='post-page my-5 pt-3'>
      <h2>{postInfo.title}</h2>
      <h5>{postInfo.summary}</h5>
      
      <div className="author-info d-flex justify-content-between align-items-center mb-2">
        <div>
          <span className="me-2">by</span> 
          <Link to={`/profile/${postInfo.author._id}`} className="author">
            {postInfo.author?.username}
          </Link>
        </div>
              
        {userInfo && userInfo.id === postInfo.author?._id && (
          <div className="d-flex align-items-center">
            <Link className='edit-btn me-3' to={`/edit/${postInfo._id}`}>Edit</Link>
            <button className='delete-btn' title='Delete post' onClick={handleDelete}><i className="bi bi-trash"></i></button>
          </div>
        )}
      </div>

     
      <img className="mb-2" src={`http://localhost:5000/${postInfo.cover}`} alt="" />
      <time > {format(new Date(postInfo.createdAt), 'd MMM, yyyy | HH:mm')} </time>
      <p className="mt-3" dangerouslySetInnerHTML={{ __html: postInfo.content }}></p>
    </div>
  );
}

export default PostPage;
