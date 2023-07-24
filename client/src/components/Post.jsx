import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Post({ title, summary, cover, _id, createdAt, author }) {
  return (
    <div className="post">
      <Link to={`/post/${_id}`}>
        <div className="post-image">
          <img src={`http://localhost:5000/${cover}`} alt="" />
        </div>
      </Link>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        {author && (
          <p className="info">
            <Link to={`/author/${author._id}`} className='author'>
              {author.username}
            </Link>
            <time> {format(new Date(createdAt), 'd MMM, yyyy | HH:mm')} </time>
          </p>
        )}
        <p className='summary'>{summary}</p>
      </div>
    </div>
  );
}

export default Post;