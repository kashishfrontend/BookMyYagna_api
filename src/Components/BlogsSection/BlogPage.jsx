import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogsSection/Blogs'; 
import '../../assets/css/BlogsPage.css';
import cta from '../../assets/img/Diwali- Lamp-Ceremony.webp';
import { FaCalendarAlt } from 'react-icons/fa';
import  axios from '../../Api/axios/axios_config';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/blogs/getAllBlogs');
      
      if (response.data.success) {
        setBlogs(response.data.data);
        // Calculate total pages based on number of blogs
        setTotalPages(Math.ceil(response.data.data.length / 6)); // Assuming 6 blogs per page
      } else {
        throw new Error(response.data.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Calculate blogs to show for current page
  const blogsPerPage = 6;
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  if (loading) {
    return (
      <div className="blogs-page" style={{marginTop: "100px"}}>
        <div className="container">
          <div className="loading">Loading blogs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogs-page" style={{marginTop: "100px"}}>
        <div className="container">
          <div className="error">Error: {error}</div>
          <button onClick={fetchBlogs} className="retry-button">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-page" style={{marginTop: "100px"}}>
      <div className="container">
        <h1>Latest Blogs</h1>
        <div className="blogs-grid">
          {currentBlogs.length > 0 ? (
            currentBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))
          ) : (
            <div className="no-blogs">No blogs available.</div>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="prev" 
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-numbers">Page {currentPage} of {totalPages}</span>
            <button 
              className="next" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        <div className="blog-cta">
          <div className="cta-container">
            <div className="cta-image">
              <img src={cta} alt="Astrology Consultation" />
            </div>
            <div className="cta-content">
              <span className="cta-tag">Personalized Guidance</span>
              <h2>Struggling with planetary challenges?</h2>
              <p>Our Vedic astrologers provide customized remedies and solutions based on your unique birth chart.</p>
              <ul className="cta-benefits">
                <li><FaCalendarAlt /> 30+ years of astrological experience</li>
                <li><FaCalendarAlt /> 100% authentic Vedic methods</li>
                <li><FaCalendarAlt /> Practical, actionable solutions</li>
              </ul>
              <div className="cta-button-group">
                <Link to="/contact" className="cta-button primary">
                  Book Consultation Now
                </Link>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;