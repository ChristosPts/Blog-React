import React, { useEffect, useState } from 'react'
import Post from '../components/Post'

function HomePage() {

  const [posts,setPosts] = useState('')

  useEffect(() => {
   fetch('http://localhost:5000/post',).then(response => {
      response.json().then(posts => { 
        setPosts(posts)
      })
    })
  },[])

  return (
    <>
       {posts.length > 0 && posts.map(post => (
          <Post key={post._id} {...post}/>
       ))}
    </>
  )
}

export default HomePage