// BlogCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src={blog.image} alt={blog.title} />
        <span className="category-tag">{blog.category}</span>
      </div>
      <div className="card-content">
        <h3>{blog.title}</h3>
        <p className="excerpt">{blog.excerpt}</p>
        <div className="card-meta">
          <span>{blog.date}</span>
          <span>{blog.readTime}</span>
        </div>
        <Link to={`/blog/${blog.id}`} className="read-more">Read More</Link>
      </div>
    </div>
  );
};

export default BlogCard;