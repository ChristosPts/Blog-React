import React from 'react'
import { formatISO9075,format } from 'date-fns' 

function Post({ title, summary, cover, content, createdAt, author }) {
  return (
    <div className="post">
      <div className="post-image">
        <img src={'http://localhost:5000/'+cover} alt="" />
      </div>
      <div className="texts">
        <h2>{title}</h2>
        {author && (
          <p className="info">
            <a className='author'>{author.username}</a>
            <time> {format(new Date(createdAt), 'd MMM, yyyy | HH:mm')} </time>
          </p>
        )}
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
}

export default Post