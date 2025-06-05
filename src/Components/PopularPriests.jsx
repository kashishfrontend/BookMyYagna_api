import React, { useEffect, useState } from 'react';
import axios from '../Api/axios/axios_config';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaStar, FaGraduationCap, FaLanguage } from 'react-icons/fa';

const PopularPriests = () => {
const [priests, setPriests] = useState([]);
 useEffect(() => {
  const fetchPandits = async () => {
    try {
      const res = await axios.get('/pandit/getAllPandits');
      if (res.data.success && res.data.pandits) {
        setPriests(res.data.pandits);
      } else {
        console.error('No pandits data found');
      }
    } catch (error) {
      console.error('Error fetching pandits:', error);
    }
  };

  fetchPandits();
}, []);


  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="priests-section section-title">
      <div className="ornament-line">
        <span className="om-symbol">ॐ</span>
      </div>
      <Container>
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="section-sub-heading">
            <span className="line"></span>
            <h2 className="fs-2">Our Experts</h2>
            <span className="line"></span>
          </div>
          <h3 className="section-title" style={{ color: '#FF7722' }}>
            Experienced <span className="text-gradient">Pandits</span>
          </h3>
          <div className="text-center">
            <p className="section-description pb-3 m-0">
              Meet our knowledgeable and experienced priests who perform rituals with devotion and precision
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Row className="g-4">
            {priests.map((priest) => (
              <Col lg={3} md={6} key={priest._id}>
                <motion.div variants={cardVariants}>
                  <Card className="priest-card shadow-lg" style={{ borderRadius: '20px',minHeight:"480px" }}>
                    <div className="priest-image-container">
                      <Card.Img
                        variant="top"
                        src={priest.image}
                        className="priest-image"
                        alt={priest.name}
                      />
                    </div>

                    <Card.Body>
                      <Card.Title className="priest-name">{priest.name}</Card.Title>
                      <div className="priest-specialization">
                        {priest.poojaTypes?.join(', ')}
                      </div>

                      <div className="priest-rating">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < Math.floor(priest.rating) ? 'star-active' : 'star-inactive'}
                            />
                          ))}
                        </div>
                        <div className="rating-text">
                          {priest.rating} Stars
                        </div>
                      </div>

                      <div className="priest-details">
                        <div className="detail-item">
                          <FaGraduationCap className="detail-icon" />
                          <span>Experience: {priest.experience}+ years</span>
                        </div>
                        <div className="detail-item">
                          <FaLanguage className="detail-icon" />
                          <span>Languages: {priest.language?.join(', ')}</span>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
};

export default PopularPriests;
