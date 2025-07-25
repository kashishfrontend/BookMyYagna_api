// AllPandits.js
import React, { useEffect, useState } from 'react';
import axios from '../Api/axios/axios_config';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaStar, FaGraduationCap, FaLanguage, FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AllPandits = () => {
    const styles = {
  card: {
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
 
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  expandedDetails: {
    maxHeight: '120px',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
    padding: '8px',
    borderRadius: '8px',
    marginTop: '10px',
  }
};

  const [priests, setPriests] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});

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

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="all-pandits-section py-5">
      <Container style={{marginTop:"130px"}}>
        <div className="d-flex justify-content-between align-items-center mb-5">
          <Link to="/" className="btn btn-outline-primary">
            <FaChevronLeft className="me-2" /> Back to Home
          </Link>
          <h2 className="mb-0">All Pandits</h2>
          <div style={{ width: '100px' }}></div> {/* Spacer for alignment */}
        </div>

        <Row className="g-4">
          {priests.map((priest) => (
            // <Col lg={3} md={6} key={priest._id}>
                <Col lg={3} md={6} className="d-flex align-items-start">

              <Card className="priest-card shadow-lg " style={{ borderRadius: '20px' }}>
                <div className="priest-image-container" style={{ height: '250px', overflow: 'hidden' }}>
                  <Card.Img
                    variant="top"
                    src={priest.image}
                    className="priest-image h-100 w-100 object-fit-cover"
                    alt={priest.name}
                  />
                </div>

                

                <Card className="d-flex flex-column p-4">
                  <Card.Title className="priest-name">{priest.name}</Card.Title>
                  <div className="priest-specialization mb-2">
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
                    <div className="rating-text">
                      {priest.rating} Stars
                    </div>
                  </div>

                  <div className="priest-details mb-3">
                    <div className="detail-item">
                      <FaGraduationCap className="detail-icon" />
                      <span>Exp: {priest.experience}+ years</span>
                    </div>
                    <div className="detail-item">
                      <FaLanguage className="detail-icon" />
                      <span>Speaks: {priest.language?.slice(0, 2).join(', ')}
                        {priest.language?.length > 2 && '...'}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button 
                      variant="link" 
                      style={{color:"#FF7722"}}
                      className="read-more-btn p-0"
                      onClick={() => toggleExpand(priest._id)}
                    >
                      {expandedCards[priest._id] ? 'Read Less' : 'Read More'}
                    </Button>
                    
                    {expandedCards[priest._id] && (
                      <div className="expanded-details mt-2">
                        <p className="mb-1"><strong>Specializations:</strong> {priest.poojaTypes?.join(', ')}</p>
                        <p className="mb-1"><strong>Languages:</strong> {priest.language?.join(', ')}</p>
                        {priest.bio && <p className="mb-0"><strong>About:</strong> {priest.bio}</p>}
                      </div>
                    )}
                  </div>
                </Card>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default AllPandits;