import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import axios from 'axios';

function EditPost() {
  const { id,authorId } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [cover, setCover] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isAuthor, setIsAuthor] = useState(null); 
  
  useEffect(() => {
    axios.get(`http://localhost:5000/post/${id}`)
      .then(response => {
        const postInfo = response.data;
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
  
        axios.get('http://localhost:5000/profile', { withCredentials: true })
          .then(response => {
            const userId = response.data.id;
            if (userId === postInfo.author?._id) {
              setIsAuthor(true);
            } else {
              setIsAuthor(false);
            }
          })
      })
      .catch(error => {
        console.error('Error fetching post. You do not have access');
      });
  }, []);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    try {
      const response = await axios.put(`http://localhost:5000/post/${id}`, data, {
        withCredentials: true
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />
  }

 

  if (isAuthor === false) {
   
     return <Navigate to={'/'} />;
  } 

  
  return (
    <div className='create-post'>
      <form onSubmit={updatePost}>
        <input type="title"
          placeholder='Title'
          value={title}
          onChange={e => setTitle(e.target.value)} />
        <input type="summary"
          placeholder='Summary'
          value={summary}
          onChange={e => setSummary(e.target.value)} />
        <input type="file"
          placeholder='Image'
          onChange={e => setFiles(e.target.files)} />
        <Editor onChange={setContent} value={content} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default EditPost;