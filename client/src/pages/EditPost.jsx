import React, { useContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import axios from 'axios';
import { UserContext } from '../UserContext';

function EditPost() {
  const { id,authorId } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isAuthor, setIsAuthor] = useState(); 
  
  const { userInfo } = useContext(UserContext);
  const uname = userInfo?.username;

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

  const MIN_TITLE_WORDS = 2;
  const MIN_SUMMARY_WORDS = 5;
  const MAX_SUMMARY_WORDS = 100;
  const MIN_CONTENT_WORDS = 50;
  const MAX_CONTENT_WORDS = 1000;

  function validateFields() {
    const titleWords = title.split(' ').filter(Boolean).length;
    const summaryWords = summary.split(' ').filter(Boolean).length;
    const contentWords = content.split(' ').filter(Boolean).length;

    if (titleWords < MIN_TITLE_WORDS) {
      alert(`Title must have at least ${MIN_TITLE_WORDS} words`);
      return false;
    }

    if (summaryWords < MIN_SUMMARY_WORDS || summaryWords > MAX_SUMMARY_WORDS) {
      alert(`Summary must have between ${MIN_SUMMARY_WORDS} and ${MAX_SUMMARY_WORDS} words.`);
      return false;
    }

    if (contentWords < MIN_CONTENT_WORDS || contentWords > MAX_CONTENT_WORDS) {
      alert(`Content must have between ${MIN_CONTENT_WORDS} and ${MAX_CONTENT_WORDS} words.`);
      return false;
    }
    return true;
  }

  async function updatePost(e) {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

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
  console.log(isAuthor)
  if (isAuthor === false || uname === undefined) {
     return <Navigate to={'/'} />;
  } 

  return (
    <div className='post-editor py-5'>
        <h1 className='text-center py-3'>Editing {title}</h1>
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