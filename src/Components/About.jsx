import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AOS from "aos";
import { FaOm, FaHandsHelping, FaPrayingHands, FaHeart } from "react-icons/fa";
import about from "../assets/img/bg-3.webp";
import "../assets/css/About.css";
import { Helmet } from 'react-helmet-async';
const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <>
      <Helmet>
        <title>About BookMyYagna | Online Vedic Puja Services in India</title>
        <meta name="description" content="Learn about BookMyYagna – your trusted platform for booking authentic Vedic pujas online. Expert pandits, personalized rituals, and hassle-free service." />
        <meta name="keywords" content="BookMyYagna, about BookMyYagna, Vedic puja platform, online puja India, expert pandits, Hindu rituals, spiritual services online" />
        <meta property="og:title" content="About Us | BookMyYagna - Your Trusted Online Puja Partner" />
        <meta property="og:description" content="Learn more about BookMyYagna, India’s most trusted online puja booking platform. We are committed to bringing divine rituals to your doorstep with authenticity and convenience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bookmyyagna.com/about-us" />
        <meta property="og:image" content="https://bookmyyagna.com/images/about-og-image.jpg" />
        <link rel="canonical" href="https://bookmyyagna.com/about-us" />
      </Helmet>
      <section id="about-us" className="about-us-section">
        <Container>
          {/* Section Title */}
          <div className="section-title text-center" data-aos="fade-down">
            <div className="ornament-line">
              <span className="om-symbol">ॐ</span>
            </div>
            <h2>
              About <span className="text-gradient">BookMyYagna</span>
            </h2>
            <p className="pb-3">
              Your trusted platform for online Vedic pujas with experienced
              Pandits across India.
            </p>
          </div>

          {/* Mission & Vision */}
          <Row className="align-items-center mb-5">
            <Col md={6} data-aos="fade-right">
              <img
                src={about}
                alt="Beautiful illuminated Hindu temple symbolizing BookMyYagna's authentic Vedic rituals and spiritual puja services"
                className="img-fluid rounded shadow"
              />
            </Col>
            <Col md={6} data-aos="fade-left">
              <h3 className="mb-3">Our Divine Mission</h3>
              <p style={{ textAlign: "justify" }}>
                At BookMyYagna, our mission is to simplify and preserve the rich
                traditions of Sanatan Dharma by offering authentic Hindu rituals
                online. We connect you with qualified, verified Vedic Pandits who
                perform pujas with strict adherence to Vedic scriptures and
                traditions.
              </p>
              <p style={{ textAlign: "justify" }}>
                Whether it’s a Satyanarayan Puja, Griha Pravesh, Rudrabhishek,
                Navgraha Shanti, or Mahamrityunjay Jaap, we bring the ceremony to
                your home with complete samagri, mantras, and spiritual guidance.
              </p>
              <ul>
                <li style={{ listStyle: "none" }}>✅ Transparent pricing</li>
                <li style={{ listStyle: "none" }}>
                  ✅ Multi-city service coverage (20+ cities)
                </li>
                <li style={{ listStyle: "none" }}>
                  ✅ Fully customizable ritual packages
                </li>
                <li style={{ listStyle: "none" }}>
                  ✅ Verified Brahmin Pandits with years of experience
                </li>
              </ul>
            </Col>
            <div className="mt-5">
              <h3 className="text-center fs-1">
                🔱 Why Devotees Trust BookMyYagna
              </h3>
            </div>
          </Row>
          {/* Features / Values */}

          <Row className="text-center">
            <Col md={3} sm={6} className="mb-4" data-aos="zoom-in">
              <div className="about-icon-box">
                <FaOm className="about-icon" />
                <h5> Rooted in Vedic Tradition</h5>
                <p style={{ textAlign: "justify" }}>
                  Every ritual is performed using authentic Vedic scriptures and
                  sacred Sanskrit mantras, ensuring spiritual accuracy and
                  blessings.
                </p>
              </div>
            </Col>
            <Col
              md={3}
              sm={6}
              className="mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="about-icon-box">
                <FaHandsHelping className="about-icon" />
                <h5>Trusted, Verified Pandits</h5>
                <p style={{ textAlign: "justify" }}>
                  All our Pandits are highly experienced, background-verified, and
                  trained in Hindu Shastras with decades of experience in
                  spiritual services.
                </p>
              </div>
            </Col>
            <Col
              md={3}
              sm={6}
              className="mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="about-icon-box">
                <FaPrayingHands className="about-icon" />
                <h5>Pan-India Service Network</h5>
                <p style={{ textAlign: "justify" }}>
                  We currently offer our puja services entirely online, allowing
                  devotees from over 20+ Indian cities to conveniently book and
                  perform rituals from the comfort of their homes.
                </p>
              </div>
            </Col>
            <Col
              md={3}
              sm={6}
              className="mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="about-icon-box">
                <FaHeart className="about-icon" />
                <h5> Bhakti-Driven Approach</h5>
                <p style={{ textAlign: "justify" }}>
                  Our focus is to deliver meaningful, heartfelt puja experiences
                  that bring peace, positivity, and blessings into your home.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
const styles = {
  section: {
    backgroundColor: "#fffaf3",
    padding: "60px 0",
  },
  titleContainer: {
    textAlign: "center",
    marginBottom: "40px",
  },
  omSymbol: {
    fontSize: "2rem",
    color: "#fc466b",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    background: "linear-gradient(to right, #fc466b, #3f5efb)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  description: {
    color: "#555",
    maxWidth: "700px",
    margin: "0 auto",
    paddingBottom: "20px",
  },
  img: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
  },
  missionTitle: {
    fontSize: "1.75rem",
    marginBottom: "15px",
  },
  paragraph: {
    textAlign: "justify",
    marginBottom: "15px",
    color: "#444",
  },
  iconBox: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    marginBottom: "30px",
  },
  icon: {
    fontSize: "2rem",
    color: "#fc466b",
    marginBottom: "10px",
  },
  iconTitle: {
    fontWeight: "600",
    marginBottom: "8px",
    fontSize: "1.1rem",
  },
  iconDesc: {
    color: "#666",
    fontSize: "0.95rem",
  },
};
export default AboutUs;
