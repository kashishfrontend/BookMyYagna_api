import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={blog.image} alt={blog.heading} />
        <span className="category-tag">{blog.category}</span>
      </div>
      <div className="card-content">
        <h3>{blog.heading}</h3>
        <p className="excerpt">{blog.description?.substring(0, 100)}...</p>
        <div className="card-meta">
          <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <span>5 min read</span> {/* You can calculate this based on content length if needed */}
        </div>
        <Link to={`/blog/${blog._id}`} className="read-more">Read More</Link>
      </div>
    </div>
  );
};

export default BlogCard;