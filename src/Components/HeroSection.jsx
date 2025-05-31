// EnhancedHeroSection.js
import React, { useEffect, useState,useRef  } from 'react';
import { Container, Row, Col, Button, Carousel } from 'react-bootstrap';
import { motion, useAnimation } from 'framer-motion';
import { Calendar2Check, Bell, Star } from 'react-bootstrap-icons';
 import image from  '../assets/img/om-123.png'; 
import bg1 from  '../assets/img/bg-3-new.jpeg'; 
import bg2 from  '../assets/img/bg-3.png'; 
import bg3 from  '../assets/img/bg--2.png'; 
import pandit from '../assets/img/pundit.png';
import vdo1 from '../assets/videos/pooja1.mp4';
import vdo2 from '../assets/videos/pooja2.mp4'
import vdo3 from '../assets/videos/bg-video.mp4'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({onHeroVisibleChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const { isAuthenticated } = useSelector((state) => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();

   const heroRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        onHeroVisibleChange(entry.isIntersecting);
      },
      {
        threshold: 0,
        // Adjust based on how much should be visible
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  // Animation variants for elements
  const floatingGodVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const slideTextVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.3
      }
    }
  };

  const slideImageVariants = {
    hiddenLeft: { x: -100, opacity: 0 },
    hiddenRight: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      }
    }
  };

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  // Reset and start animations when slide changes
  useEffect(() => {
    controls.start('visible');
  }, [activeIndex, controls]);

  // Hero section data for carousel
  const heroSlides = [
    {
      badge: "Auspicious Ceremonies",
      title: "Welcome to  <span class='highlight-text'>BookMyYagna</span>  A Sacred Connection to the Divine",
      subtitle: 'In the hustle and bustle of our daily lives, we often forget the true essence of life...',
      image: image,
      bgVideo: vdo1
    },
    {
      badge: "Festival Celebrations",
      title: "Celebrate <span class='highlight-text'>Festivals</span> with Traditional Rituals",
      subtitle: "At BookMyYagna, we believe that Yagna and Pooja ceremonies are not just rituals...",
      image: image,
      bgVideo: vdo2,
      text: "Lorem ipsum, dolor sit amet consectetur..."
    },
    {
      badge: "Home Ceremonies",
      title: "Bring <span class='highlight-text'>Blessings</span> to Your Home",
      subtitle: "Schedule Griha Pravesh, Vastu Shanti, or other home ceremonies...",
      image: image,
      bgVideo: vdo3
    }
  ];
      const handleBookingClick = ()=>{
        if(isAuthenticated){
            navigate('/listofpooja')
        } else {
          navigate('/login')
        }
      }
  return (
    <div ref={heroRef} className="enhanced-hero-section">
      {/* Floating God Image */}
      <motion.div 
        className="floating-god-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.img 
          src="/images/ganesh-transparent.png" 
          alt="Lord Ganesh" 
          className="floating-god-image"
          variants={floatingGodVariants}
          animate="animate"
        />
        <div className="god-glow"></div>
      </motion.div>

      {/* Hero Carousel */}
      <Carousel 
        fade 
        indicators={true} 
        controls={true}
        interval={6000}
        onSelect={handleSelect}
        className="hero-carousel"
      >
        {heroSlides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div 
              className="hero-slide" 
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              <video
                className="background-video"
                autoPlay
                loop
                muted
                playsInline
              >
                <source className='w-100' src={slide.bgVideo} type="video/mp4" />
                <img
                  src={bg1}
                  alt="Fallback Background"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 0
                  }}
                />
                Your browser does not support the video tag.
              </video>
              <div className="slide-overlay"></div>
              <Container className="slide-content">
                <Row className="align-items-center">
                  <Col lg={6} md={12} className={index % 2 === 0 ? "order-lg-1" : "order-lg-2"}>
                    <motion.div
                      key={`text-${activeIndex}`}
                      variants={slideTextVariants}
                      initial="hidden"
                      animate={controls}
                    >
                      <motion.div variants={slideTextVariants} className="hero-badge mt-5 mb-3">
                        <Star className="badge-icon" /> {slide.badge}
                      </motion.div>
                      
                      
                      <motion.h1 
                        variants={slideTextVariants} 
                        className="hero-title"
                        dangerouslySetInnerHTML={{__html: slide.title}}
                      ></motion.h1>
                      
                      <motion.p variants={slideTextVariants} className="hero-subtitle "
                      style={{textAlign:"justify"}}>
                        {slide.subtitle}
                      </motion.p>
                      
                      <motion.div variants={slideTextVariants} className="cta-buttons d-flex flex-row">
                        <Button variant="primary" className="main-cta-btn" onClick={handleBookingClick}>
                          <Calendar2Check className="btn-icon" /> Book Pooja Now
                        </Button>
                        <Button variant="outline-light" className="secondary-cta-btn" onClick={()=> navigate('/listofpooja')}>
                          <Bell className="btn-icon" /> Explore Services
                        </Button>
                      </motion.div>
                      
                      <motion.div variants={slideTextVariants} className="row">
                        <div className="feature-item  col-4">
                          <div className="feature-icon-wrapper">
                          <img src="/icons/pandit.svg" alt="Verified Pandits" className="feature-icon" />
                          </div>
                          <span>Verified Pandits</span>
                        </div>
                        <div className="feature-item col-4">
                          <div className="feature-icon-wrapper">
                            <img src="/icons/pooja-items.svg" alt="Complete Samagri" className="feature-icon" />
                          </div>
                          <span>Complete Samagri</span>
                        </div>
                        <div className="feature-item col-4">
                          <div className="feature-icon-wrapper">
                            <img src="/icons/temple.svg" alt="Authentic Rituals" className="feature-icon" />
                          </div>
                          <span>Authentic Rituals</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </Col>
                  
                  <Col lg={6} md={12} className={`mt-0 mt-md-0 mt-lg-0 d-none d-md-block
                    ${index % 2 === 0 ? "order-lg-2" : "order-lg-1"}`}>
                    <motion.div 
                      key={`image-${activeIndex}`}
                      className="hero-image-container"
                      variants={index % 2 === 0 ? slideImageVariants.hiddenRight : slideImageVariants.hiddenLeft}
                      initial={index % 2 === 0 ? "hiddenRight" : "hiddenLeft"}
                      animate={controls}
                    >
                      <div className="floating-elements">
                        <div className="floating-element flower1"></div>
                        <div className="floating-element flower2"></div>
                        <div className="floating-element flower3"></div>
                        <div className="floating-element diya1"></div>
                        <div className="floating-element diya2"></div>
                      </div>
                      <div className="hero-image-frame">
                        <img src={slide.image} alt="Pooja Ceremony" className="hero-image" />
                      </div>
                      <div className="image-decorative-element top"></div>
                      <div className="image-decorative-element right"></div>
                      <div className="image-decorative-element bottom"></div>
                      <div className="image-decorative-element left"></div>
                    </motion.div>
                  </Col>
                </Row>
              </Container>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;