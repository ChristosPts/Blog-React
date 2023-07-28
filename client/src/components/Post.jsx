import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
 

function Post({ title, summary, cover, _id, createdAt, author }) {
  return (
<div className="posts">
  <div className="post card flex-grow-1 ">
    <Link to={`/post/${_id}`}>
      <div className="post-image card-img-top">
        <img src={`http://localhost:5000/${cover}`} alt="" />
      </div>
    </Link>
    <div className="post-info px-3 pt-2 pb-3">
      <Link to={`/post/${_id}`}>
        <h4 className="card-title mb-0">{title}</h4>
      </Link>
      {author && (
        <p className='mb-2'> by <span>
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