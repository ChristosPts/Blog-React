import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';



const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [{ 'font': [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color','background',
  'align',
  'font',
  'lists', 'bullets',
  'link', 'image',
  'clean'
]

function CreatePost() {

    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [files,setFiles] = useState('')
    const [redirect,setRedirect] = useState('')

    async function createNewPost (e) {
      const data = new FormData()
      data.set('title',title)
      data.set('summary', summary)
      data.set('content',content)
      data.set('file', files[0])

      e.preventDefault();
      const response = await fetch('http://localhost:5000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
      })

      if(response.ok) {
        setRedirect(true)
      }

    }

    if(redirect) {
      return <Navigate to = {'/'}/>
    }

    return (
        <div className='create-post'>
        <form onSubmit={createNewPost}>
            <input type="title" 
                    placeholder='Title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>
            <input type="summary" 
                    placeholder='Summary'
                    value={summary}
                    onChange={e => setSummary(e.target.value)}/>
            <input type="file" 
                    placeholder='Image'
                    onChange={e => setFiles(e.target.files)}/>
            <ReactQuill value={content}  
                        modules={modules} 
                        formats={formats}
                        onChange={newValue => setContent(newValue)}/>
            <button className="post">Create Post</button>
        </form>
        </div>
    )
}

export default CreatePost