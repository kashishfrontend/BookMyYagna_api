// BlogsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../BlogsSection/Blogs'; 
import '../../assets/css/BlogsPage.css';
import blog1 from '../../assets/img/bg--2.webp';
import cta from '../../assets/img/Diwali- Lamp-Ceremony.webp'
import { FaCalendarAlt } from 'react-icons/fa';

const BlogsPage = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Easy Remedies for Mangal Dosha Peace",
       image: blog1,
      excerpt: "Learn powerful remedies to pacify Mangal Dosha in your horoscope...",
      category: "Astrology",
      date: "Aug 15, 2023",
      readTime: "5 min read"
    },
      {
      id: 2,
      title: "5 Easy Remedies for Mangal Dosha Peace",
       image: blog1,
      excerpt: "Learn powerful remedies to pacify Mangal Dosha in your horoscope...",
      category: "Astrology",
      date: "Aug 15, 2023",
      readTime: "5 min read"
    },  {
      id: 3,
      title: "5 Easy Remedies for Mangal Dosha Peace",
       image: blog1,
      excerpt: "Learn powerful remedies to pacify Mangal Dosha in your horoscope...",
      category: "Astrology",
      date: "Aug 15, 2023",
      readTime: "5 min read"
    },  {
      id: 4,
      title: "5 Easy Remedies for Mangal Dosha Peace",
       image: blog1,
      excerpt: "Learn powerful remedies to pacify Mangal Dosha in your horoscope...",
      category: "Astrology",
      date: "Aug 15, 2023",
      readTime: "5 min read"
    },  {
      id: 5,
      title: "5 Easy Remedies for Mangal Dosha Peace",
       image: blog1,
      excerpt: "Learn powerful remedies to pacify Mangal Dosha in your horoscope...",
      category: "Astrology",
      date: "Aug 15, 2023",
      readTime: "5 min read"
    },
    // Add 5 more blog objects similarly
    // ... (total 6 blogs)
  ];

  return (
    <div className="blogs-page" style={{marginTop:"100px"}}>
      <div className="container">
        <h1>Latest Blogs</h1>
        <div className="blogs-grid">
          {blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="pagination">
          <button className="prev">Previous</button>
          <span className="page-numbers">1 of 5</span>
          <button className="next">Next</button>
        </div>

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
                <Link to="/consultation" className="cta-button primary">
                  Book Consultation Now
                </Link>
                <Link to="/remedies" className="cta-button secondary">
                  Explore Free Remedies
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