import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
 

function Post({ title, summary, cover, _id, createdAt, author }) {
  return (
  <div className="posts">
      <div className="post">
        <Link to={`/post/${_id}`}>
          <div className="post-image">
            <img src={`http://localhost:5000/${cover}`} alt="" />
          </div>
        </Link>
        <div className="post-info">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          {author && (
            <p> by  <span>
              <Link to={`/profile/${author._id}`} className="author">
                {author.username}
              </Link> </span>
            </p>
          )}
          <p className='summary'>{summary}</p>
          <time> {format(new Date(createdAt), 'd MMM, yyyy | HH:mm')} </time>

        </div>
      </div>
    </div>
  );
}

export default Post;