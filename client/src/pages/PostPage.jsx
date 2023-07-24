import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PostPage() {
    const {id} = useParams()
    const [postInfo, setPostInfo] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo)
            })
        })
    }, [])
    console.log(postInfo)
    if(!postInfo) return '';

    return (
        <div className='post-page'>
           <h2>{postInfo.title}</h2>
           <time> {format(new Date(postInfo.createdAt), 'd MMM, yyyy | HH:mm')} </time>
            <h4>by {postInfo.author.username}</h4>
           <img src = {`http://localhost:5000/${postInfo.cover}`} alt="" />
            <p dangerouslySetInnerHTML={{__html:postInfo.content}}></p>
        </div>
    )
}

export default PostPage