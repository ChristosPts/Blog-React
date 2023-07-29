import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function truncateSummary(summary, limit) {
  const words = summary.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return summary;
}

function Post({ title, summary, cover, _id, createdAt, author }) {
  const truncatedSummary = truncateSummary(summary, 20);
  
  return (
  
    <div className="card my-3 pb-2" >
      <Link to={`/post/${_id}`}>
        <div className="card-img-top">
          <img src={`http://localhost:5000/${cover}`} alt="" />
        </div>
      </Link>
      <div className="card-body d-flex flex-column ">
        <Link to={`/post/${_id}`}>
          <h4 className="card-title">{title}</h4>
        </Link>
        {author && (
          <h5> by <span>
            <Link to={`/profile/${author._id}`}>
              {author.username}
            </Link> </span>
          </h5>
        )}
        <p>{truncatedSummary}</p>
        <div className="mt-auto">
          <time>{format(new Date(createdAt), 'd MMM, yyyy | HH:mm')}</time>
        </div>
      </div>
    </div>
  
  );
}

export default Post;