import React from 'react'
import ReactQuill from 'react-quill';



const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }],
      [{ 'align': [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color',
    'align',
    'lists', 'bullets',
    'link', 'image',
    'clean'
  ]
  

function Editor({value,onChange}) {
  return (
    <ReactQuill value={value}  
                modules={modules} 
                formats={formats}
                onChange={onChange}/>
  )
}

export default Editor