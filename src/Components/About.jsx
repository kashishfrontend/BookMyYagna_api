import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AOS from 'aos';
import { FaOm, FaHandsHelping, FaPrayingHands, FaHeart } from 'react-icons/fa';
import about from '../assets/img/bg-3.png'
const AboutUs = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section id="about-us" className="about-us-section my-5" style={{padding:"42px 0"}}>
            <Container>
                {/* Section Title */}
                <div className="section-title text-center" data-aos="fade-down">
                    <div className="ornament-line">
                        <span className="om-symbol">ॐ</span>
                    </div>
                    <h2>About <span className="text-gradient">BookMyYagna</span></h2>
                    <p className="pb-3">
                        Your trusted platform for authentic Vedic rituals, guided by experienced Pandits and rooted in centuries-old traditions.
                    </p>
                </div>

                {/* Mission & Vision */}
                <Row className="align-items-center mb-5">
                    <Col md={6} data-aos="fade-right">
                        <img
                            src={about} // Replace with your image path
                            alt="Pooja Ceremony"
                            className="img-fluid rounded shadow"
                        />
                    </Col>
                    <Col md={6} data-aos="fade-left">
                        <h3 className="mb-3">Our Divine Mission</h3>
                        <p style={{ textAlign: 'justify' }}>
                            At BookMyYagna, our mission is to simplify and preserve the sacred traditions of Sanatan Dharma.
                            We bring spiritual services directly to your home by connecting you with qualified, verified Pandits for every Vedic ritual —
                            whether it's a Griha Pravesh, Satyanarayan Katha, Rudra Abhishek, or Navagraha Shanti.
                        </p>
                        <p style={{ textAlign: 'justify' }}>
                            With transparent pricing, reliable support, and customizable packages, we ensure your spiritual journey remains pure and hassle-free.
                        </p>
                    </Col>
                </Row>

                {/* Features / Values */}
                <Row className="text-center">
                    <Col md={3} sm={6} className="mb-4" data-aos="zoom-in">
                        <div className="about-icon-box">
                            <FaOm className="about-icon" />
                            <h5>Rooted in Tradition</h5>
                            <p>Every ritual is performed as per authentic Vedic scriptures.</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-4" data-aos="zoom-in" data-aos-delay="100">
                        <div className="about-icon-box">
                            <FaHandsHelping className="about-icon" />
                            <h5>Trusted Pandits</h5>
                            <p>Handpicked experts with years of spiritual experience.</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-4" data-aos="zoom-in" data-aos-delay="200">
                        <div className="about-icon-box">
                            <FaPrayingHands className="about-icon" />
                            <h5>Pan India Services</h5>
                            <p>We serve 20+ cities with in-person and online pooja options.</p>
                        </div>
                    </Col>
                    <Col md={3} sm={6} className="mb-4" data-aos="zoom-in" data-aos-delay="300">
                        <div className="about-icon-box">
                            <FaHeart className="about-icon" />
                            <h5>Devotion First</h5>
                            <p>Our priority is to bring genuine bhakti into every home.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );

};
const styles = {
  section: {
    backgroundColor: '#fffaf3',
    padding: '60px 0',
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  omSymbol: {
    fontSize: '2rem',
    color: '#fc466b',
    marginBottom: '10px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '10px',
    background: 'linear-gradient(to right, #fc466b, #3f5efb)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  description: {
    color: '#555',
    maxWidth: '700px',
    margin: '0 auto',
    paddingBottom: '20px',
  },
  img: {
    width: '100%',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  },
  missionTitle: {
    fontSize: '1.75rem',
    marginBottom: '15px',
  },
  paragraph: {
    textAlign: 'justify',
    marginBottom: '15px',
    color: '#444',
  },
  iconBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'center',
    marginBottom: '30px',
  },
  icon: {
    fontSize: '2rem',
    color: '#fc466b',
    marginBottom: '10px',
  },
  iconTitle: {
    fontWeight: '600',
    marginBottom: '8px',
    fontSize: '1.1rem',
  },
  iconDesc: {
    color: '#666',
    fontSize: '0.95rem',
  },
};


export default AboutUs;
