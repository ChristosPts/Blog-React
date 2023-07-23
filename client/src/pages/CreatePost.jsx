import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

function CreatePost() {

    const [title,setTitle] = useState('')
    const [summary,setSummary] = useState('')
    const [content,setContent] = useState('')
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

    return (
        <div className='create-post'>
        <form>
                <input type="title" placeholder='Title'/>
                <input type="summary" placeholder='Summary'/>
                <input type="file" placeholder='Image'/>
                <ReactQuill value={content}  
                            modules={modules} 
                            formats={formats}/>
                <button className="post">Create Post</button>
        </form>
        </div>
    )
}

export default CreatePost