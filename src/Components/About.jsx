import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import AOS from "aos";
import { FaOm, FaHandsHelping, FaPrayingHands, FaHeart, FaQuoteLeft } from "react-icons/fa";
import about from "../assets/img/bg-3.webp";
import "../assets/css/About.css";
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 10,
      once: true
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>About BookMyYagna | Online Vedic Puja Services</title>
        <meta name="description" content="Learn about BookMyYagna – your trusted platform for booking online pujas with expert pandits & hassle-free Vedic services." />
        <meta name="keywords" content="BookMyYagna, about BookMyYagna, Vedic puja platform, online puja India, expert pandits, Hindu rituals, spiritual services online" />
        <meta property="og:title" content="About BookMyYagna – Online Puja Platform" />
        <meta property="og:description" content="Discover BookMyYagna – your trusted platform for authentic online pujas, performed by experienced pandits across India." />
        <meta property="og:url" content="https://bookmyyagna.com/about-us" />
        <link rel="canonical" href="https://bookmyyagna.com/about-us" />
      </Helmet>

      <section id="about-us" className="about-us-section">
        {/* Sacred Opening */}
        <div className="sacred-opening">
          <div className="om-light">
            <span>ॐ</span>
          </div>
          <h1 className="sacred-title">
            About <span>BookMyYagna</span>
          </h1>
          <p className="sacred-subtitle">Crafted with Devotion. Powered by Technology.</p>
          <div className="sacred-line"></div>
        </div>

        <Container>
          {/* Introduction */}
          <div className="sacred-intro" data-aos="fade-up">
            <p>BookMyYagna is a spiritual service platform powered by <a href="https://innovizetechsolution.com" target="_blank" rel="noopener noreferrer">Innovize Tech Solutions</a> – delivering innovative IT solutions for modern businesses.</p>
            <p>Your trusted platform for online Vedic pujas with experienced Pandits across India.</p>
          </div>

          {/* Sacred Connection */}
          <div className="sacred-connection" data-aos="fade-up">
            <div className="sacred-image-container">
              <img src={about} alt="Authentic Vedic rituals" className="sacred-image" />
              <div className="image-overlay"></div>
            </div>
            <div className="sacred-content">
              <h2>India's Sacred Connection</h2>
              <p>BookMyYagna bridges timeless Vedic rituals with modern convenience, connecting you to verified Brahmin Pandits who perform sacred Hindu rituals with precision and devotion.</p>
              <p>From Satyanarayan Puja to Mahamrityunjay Jaap, we bring authentic spiritual experiences to your doorstep.</p>
            </div>
          </div>

          {/* Divine Purpose */}
          <div className="divine-purpose" data-aos="fade-up">
            <div className="purpose-header">
              <FaOm className="om-icon" />
              <h2>Our Divine Purpose</h2>
            </div>
            <p>We ensure access to authentic spiritual rituals is never compromised, no matter where you are. In today's fast-paced world, we simplify sacred traditions with:</p>
            
            <div className="purpose-grid">
              <div className="purpose-item">
                <div className="purpose-icon">✓</div>
                <span>Hassle-free online booking</span>
              </div>
              <div className="purpose-item">
                <div className="purpose-icon">✓</div>
                <span>Verified Brahmin Pandits</span>
              </div>
              <div className="purpose-item">
                <div className="purpose-icon">✓</div>
                <span>Complete samagri included</span>
              </div>
              <div className="purpose-item">
                <div className="purpose-icon">✓</div>
                <span>Regional tradition adherence</span>
              </div>
            </div>
          </div>

          {/* Sacred Values */}
          <div className="sacred-values" data-aos="fade-up">
            <h2>Why Devotees Trust Us</h2>
            <div className="values-grid">
              <div className="value-card" data-aos="zoom-in">
                <FaOm className="value-icon" />
                <h5>Vedic Authenticity</h5>
                <p>Every ritual follows authentic scriptures with proper Sanskrit mantras</p>
              </div>
              <div className="value-card" data-aos="zoom-in" data-aos-delay="100">
                <FaHandsHelping className="value-icon" />
                <h5>Trusted Pandits</h5>
                <p>Background-verified Brahmin Pandits with decades of experience</p>
              </div>
              <div className="value-card" data-aos="zoom-in" data-aos-delay="200">
                <FaPrayingHands className="value-icon" />
                <h5>Pan-India Service</h5>
                <p>Available in 20+ cities with consistent quality nationwide</p>
              </div>
              <div className="value-card" data-aos="zoom-in" data-aos-delay="300">
                <FaHeart className="value-icon" />
                <h5>Devotion First</h5>
                <p>Heartfelt puja experiences that bring peace and blessings</p>
              </div>
            </div>
          </div>

          {/* Sacred Experiences */}
          <div className="sacred-experiences" data-aos="fade-up">
            <h2>Sacred Experiences</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <p>The Griha Pravesh in Lucknow was perfectly organized. Every detail felt blessed.</p>
                <div className="testimonial-author">- Aryan Verma, Lucknow</div>
              </div>
              <div className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <p>Rudrabhishek during Shravan was performed with such devotion by your Pandit.</p>
                <div className="testimonial-author">- Tanya Deshmukh, Indore</div>
              </div>
              <div className="testimonial-card">
                <FaQuoteLeft className="quote-icon" />
                <p>Arranged Satyanarayan Puja for my parents while I joined virtually from Bengaluru.</p>
                <div className="testimonial-author">- Rohan Bansal, Bengaluru</div>
              </div>
            </div>
          </div>

          {/* Sacred Closing */}
          <div className="sacred-closing" data-aos="fade-up">
            <h2>Your Spiritual Companion</h2>
            <p>BookMyYagna makes Vedic poojas simple, sacred, and seamless. With devotion at our core, we help you take each step closer to the divine.</p>
            <a href="/" className="sacred-cta">
              Begin Your Sacred Journey
              <span>ॐ</span>
            </a>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;