import React, { useEffect, useState } from 'react';
import axios from '../Api/axios/axios_config';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaStar, FaGraduationCap, FaLanguage, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PopularPriests = () => {
  const [priests, setPriests] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const styles = {
    card: {
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    cardBody: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    imageContainer: {
      height: '250px',
      overflow: 'hidden',
    },
    image: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
   
    detailText: {
      fontSize: '14px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    expandedDetails: {
      maxHeight: '100px',
      overflowY: 'auto',
    }
    ,
    truncate: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
    }

  };


  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const res = await axios.get('/pandit/getAllPandits');
        if (res.data.success && res.data.pandits) {
          // Sort by newest first and take first 4
          const sortedPandits = res.data.pandits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPriests(sortedPandits.slice(0, 4));
        } else {
          console.error('No pandits data found');
        }
      } catch (error) {
        console.error('Error fetching pandits:', error);
      }
    };

    fetchPandits();
  }, []);

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
                  <Card className="priest-card shadow-lg h-100" style={{ borderRadius: '20px' }}>
                    <div className="priest-image-container" style={{ height: '250px', overflow: 'hidden' }}>
                      <Card.Img
                        variant="top"
                        src={priest.image}
                        className="priest-image h-100 w-100 object-fit-cover"
                        alt={priest.name}
                      />


                    </div>

                    <Card.Body className="d-flex flex-column">


                      <Card.Title className="priest-name" style={styles.truncate} title={priest.name}>
                        {priest.name}
                      </Card.Title>


                      {/* <Card.Title className="priest-name">{priest.name}</Card.Title> */}
                      <div className="priest-specialization mb-2" style={styles.truncate} title={priest.poojaTypes?.join(', ')}>
                        {priest.poojaTypes?.slice(0, 2).join(', ')}
                        {priest.poojaTypes?.length > 2 && '...'}
                      </div>




                      <div className="priest-rating mb-2">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < Math.floor(priest.rating) ? 'star-active' : 'star-inactive'}
                            />
                          ))}
                        </div>
                        <div className="rating-text" style={styles.truncate}>
                          {priest.rating} Stars
                        </div>

                      </div>

                      <div className="priest-details mb-3">
                        <div className="detail-item">
                          <FaGraduationCap className="detail-icon" />
                          <span style={styles.truncate}>
                            Exp: {priest.experience}+ years
                          </span>

                        </div>
                        <div className="detail-item">
                          <FaLanguage className="detail-icon" />

                          <span style={styles.truncate}>
                            Speaks: {priest.language?.slice(0, 2).join(', ')}
                            {priest.language?.length > 2 && '...'}
                          </span>

                        </div>
                      </div>

                      <div className="mt-auto">

                        {expandedCards[priest._id] && (
                          <div className="expanded-details mt-2">
                            <p className="mb-1"><strong>Specializations:</strong> {priest.poojaTypes?.join(', ')}</p>
                            <p className="mb-1"><strong>Languages:</strong> {priest.language?.join(', ')}</p>
                            {priest.bio && <p className="mb-0"><strong>About:</strong> {priest.bio}</p>}
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-5">
            <Link to="/all-pandits" className="btn btn-primary btn-lg">
              View All Pandits <FaChevronRight className="ms-2" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default PopularPriests;