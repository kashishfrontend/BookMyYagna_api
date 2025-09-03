import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { FaHome, FaSearch, FaUserCircle, FaCalendarAlt, FaCheckCircle, FaShieldAlt, FaBoxOpen, FaBook, FaHeadset } from 'react-icons/fa';
import { Link } from "react-router-dom";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const ScaredBooking = () => {
  return (
    <>
      <Helmet>
        <title>How to Book Puja Online - Simple Steps | BookMyYagna</title>
        <meta
          name="description"
          content="Learn how to easily book puja services online in just a few steps. Find trusted pandits and complete your spiritual rituals with BookMyYagna."
        />
        <meta
          name="keywords"
          content="how to book puja online, puja booking steps, online pandit booking, sacred rituals, BookMyYagna"
        />
        <meta property="og:title" content="How to Book Puja Online - Simple Steps | BookMyYagna" />
        <meta
          property="og:description"
          content="Step-by-step guide to booking authentic puja services at BookMyYagna. Connect with trusted pandits for your spiritual needs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://api.bookmyyagna.com/how-to-book" />
        <meta property="og:image" content="https://api.bookmyyagna.com/images/puja-booking-steps.jpg" />
        <link rel="canonical" href="https://api.bookmyyagna.com/how-to-book" />
      </Helmet>
    
      <section
        style={{ backgroundColor: "#FFF8F5", color: "#333", marginTop:"80px", padding: "3rem 0" }}
        id="book-sacred"
      >
        <Container>
          {/* OM Symbol */}
          <div
            style={{ textAlign: "center", marginBottom: "1.5rem" }}
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <span
              style={{
                fontSize: "2.5rem",
                fontFamily: "serif",
                fontWeight: "bold",
                color: "#FF7722"
              }}
            >
              ॐ
            </span>
          </div>

          {/* Section Heading */}
          <motion.div
            style={{ textAlign: "center", marginBottom: "3rem" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariants}
          >
            <h2 style={{ fontWeight: "bold", fontSize: "2.5rem", marginBottom: "1rem", color: "#333" }}>
              How to Book Your Sacred Puja in <span style={{ color: "#FF7722" }}>4 Simple Steps ✨</span>
            </h2>
            <p style={{ fontSize: "1.25rem", color: "#555" }}>
              Experience Divine Blessings with Our Easy Booking Process
            </p>
          </motion.div>

          {/* Steps Section */}
          <Row style={{ justifyContent: "center", marginBottom: "3rem" }}>
            <Col lg={10}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
              >
                <div>
                  {/* Step 1 */}
                  <div style={{ backgroundColor: "#FFF5EE", borderLeft: "4px solid #FF7722", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ backgroundColor: "#FF7722", color: "white", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" }}>
                        <FaHome size={20} />
                      </div>
                      <h4 style={{ color: "#FF7722", margin: 0 }}>Step 1: Visit BookMyYagna</h4>
                    </div>
                    <p style={{ fontSize: "1.25rem", color: "#555" }}>
                      Go to our official website <a href="https://bookmyyagna.com" target="_blank" rel="noopener noreferrer" style={{ color: "#FF7722" }}>https://bookmyyagna.com</a> and explore our services. You'll find information about various pujas, yagnas, and our verified pandits.
                    </p>
                  </div> 

                  {/* Step 2 */}
                  <div style={{ backgroundColor: "#FFF5EE", borderLeft: "4px solid #FF7722", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ backgroundColor: "#FF7722", color: "white", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" }}>
                        <FaSearch size={18} />
                      </div>
                      <h4 style={{ color: "#FF7722", margin: 0 }}>Step 2: Browse Puja Services</h4>
                    </div>
                    <p style={{ fontSize: "1.25rem", color: "#555" }}>
                      Navigate to the 'Puja Services' section where you'll find our complete list of rituals. Each puja includes detailed information about its significance, required materials, and duration.
                    </p>
                    <ul style={{ fontSize: "1.25rem", color: "#555" }}>
                      <li><FaCalendarAlt style={{ color: "#FF7722", marginRight: "8px" }} /> Select pujas for specific occasions</li>
                      <li><FaCheckCircle style={{ color: "#FF7722", marginRight: "8px" }} /> Choose healing rituals for spiritual cleansing</li>
                      <li><FaBook style={{ color: "#FF7722", marginRight: "8px" }} /> Find daily worship ceremonies</li>
                    </ul>
                  </div>

                  {/* Step 3 */}
                  <div style={{ backgroundColor: "#FFF5EE", borderLeft: "4px solid #FF7722", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ backgroundColor: "#FF7722", color: "white", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" }}>
                        <FaUserCircle size={18} />
                      </div>
                      <h4 style={{ color: "#FF7722", margin: 0 }}>Step 3: Login & Select Package</h4>
                    </div>
                    <p style={{ fontSize: "1.25rem", color: "#555" }}>
                      To proceed with booking, you'll need to login to your account. After login, select your preferred puja package which includes:
                    </p>
                    <ul style={{ fontSize: "1.25rem", color: "#555" }}>
                      <li><FaShieldAlt style={{ color: "#FF7722", marginRight: "8px" }} /> Verified pandit with complete profile</li>
                      <li><FaBoxOpen style={{ color: "#FF7722", marginRight: "8px" }} /> All necessary samagri (ritual materials)</li>
                      <li><FaCalendarAlt style={{ color: "#FF7722", marginRight: "8px" }} /> Date and time selection</li>
                    </ul>
                  </div>

                  {/* Step 4 */}
                  <div style={{ backgroundColor: "#FFF5EE", borderLeft: "4px solid #FF7722", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                      <div style={{ backgroundColor: "#FF7722", color: "white", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" }}>
                        <FaCheckCircle size={18} />
                      </div>
                      <h4 style={{ color: "#FF7722", margin: 0 }}>Step 4: Complete Booking</h4>
                    </div>
                    <p style={{ fontSize: "1.25rem", color: "#555" }}>
                      Fill in your details including purpose of puja, participant details, and special instructions.
                    </p>
                    <p style={{ fontSize: "1.25rem", color: "#555" }}>
                      Proceed to secure payment and receive instant confirmation with all ritual details.
                    </p>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>

          {/* Why Choose Us Section */}
          <Row style={{ justifyContent: "center" }}>
            <Col lg={10}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
              >
                <h3 style={{ fontWeight: 600, textAlign: "center", marginBottom: "1.5rem", color: "#FF7722" }}>
                  Why Choose BookMyYagna for Your Spiritual Needs?
                </h3>
                
                <Row style={{ gap: "1.5rem 0" }}>
                  <Col md={6}>
                    <div style={{ padding: "1.5rem", borderRadius: "8px", backgroundColor: "#FFF5EE", height: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                        <FaShieldAlt size={24} style={{ color: "#FF7722", marginRight: "12px" }} />
                        <h5 style={{ color: "#FF7722", margin: 0 }}>Verified Pandits</h5>
                      </div>
                      <p style={{ fontSize: "1.25rem", color: "#555" }}>
                        All our pandits are thoroughly verified for their knowledge, experience, and authenticity in performing Vedic rituals.
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ padding: "1.5rem", borderRadius: "8px", backgroundColor: "#FFF5EE", height: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                        <FaBoxOpen size={24} style={{ color: "#FF7722", marginRight: "12px" }} />
                        <h5 style={{ color: "#FF7722", margin: 0 }}>Complete Samagri Kit</h5>
                      </div>
                      <p style={{ fontSize: "1.25rem", color: "#555" }}>
                        We provide all necessary ritual materials or guide you exactly what's needed for your specific puja.
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ padding: "1.5rem", borderRadius: "8px", backgroundColor: "#FFF5EE", height: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                        <FaBook size={24} style={{ color: "#FF7722", marginRight: "12px" }} />
                        <h5 style={{ color: "#FF7722", margin: 0 }}>Authentic Rituals</h5>
                      </div>
                      <p style={{ fontSize: "1.25rem", color: "#555" }}>
                        Every ceremony is performed according to Vedic traditions with proper mantras and procedures.
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div style={{ padding: "1.5rem", borderRadius: "8px", backgroundColor: "#FFF5EE", height: "100%" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                        <FaHeadset size={24} style={{ color: "#FF7722", marginRight: "12px" }} />
                        <h5 style={{ color: "#FF7722", margin: 0 }}>Online Support</h5>
                      </div>
                      <p style={{ fontSize: "1.25rem", color: "#555" }}>
                        Get guidance at every step - from selection to post-puja follow up with our expert team.
                      </p>
                    </div>
                  </Col>
                </Row>

                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                  <Link 
                    to="/listofpuja" 
                    style={{ 
                      display: "inline-block",
                      fontWeight: "bold",
                      backgroundColor: "#FF7722", 
                      color: "white",
                      padding: "12px 30px",
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(255, 119, 34, 0.3)",
                      transition: "all 0.3s ease",
                      textDecoration: "none",
                      fontSize: "1.25rem"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#E56A1E";
                      e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#FF7722";
                      e.target.style.transform = "translateY(0)";
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Begin Your Spiritual Journey Now
                  </Link>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ScaredBooking;
