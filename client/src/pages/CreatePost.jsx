import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';
import axios from 'axios';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    try {
      const response = await axios.post('http://localhost:5000/post', data, {
        withCredentials: true
      });

      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className='create-post'>
      <form onSubmit={createNewPost}>
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
        <button className="post">Create Post</button>
      </form>
    </div>
  )
}

export default CreatePost;