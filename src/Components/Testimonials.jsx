import { React, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import AOS from 'aos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import user from '../assets/img/user.jpg'
import { useNavigate } from 'react-router-dom';
const Testimonial = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });
    }, []);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/listofpooja');
  };
    const testimonials = [
        {
            id: 1,
            name: 'Rahul Verma',
            location: 'Mumbai',
            pooja: 'Griha Pravesh',
            rating: 5,
            image: user,
            text: 'The entire experience was seamless and authentic. The priest was knowledgeable and explained the significance of each ritual. The digital prasad delivery was an unexpected delight!'
        },
        {
            id: 2,
            name: 'Priya Sharma',
            location: 'Delhi',
            pooja: 'Satyanarayan Pooja',
            rating: 5,
            image: user,
            text: 'DevDarshan made it so easy to arrange a traditional pooja despite our busy schedules. The priest was punctual, well-prepared, and guided us through every step with patience.'
        },
        {
            id: 3,
            name: 'Arun Patel',
            location: 'Ahmedabad',
            pooja: 'Vastu Shanti',
            rating: 4,
            image: user,
            text: 'We were concerned about finding an authentic priest for our new home, but DevDarshan exceeded our expectations. The positive energy in our home is noticeable after the ritual.'
        },
        {
            id: 4,
            name: 'Meera Iyer',
            location: 'Bangalore',
            pooja: 'Navratri Pooja',
            rating: 5,
            image: user,
            text: 'The online booking process was straightforward, and the priest was very knowledgeable. He performed all rituals with precision and devotion. Will definitely use their services again!'
        },
        {
            id: 5,
            name: 'Vikram Singh',
            location: 'Jaipur',
            pooja: 'Ganesh Chaturthi',
            rating: 5,
            image: user,
            text: 'Even with short notice, DevDarshan arranged a perfect pooja celebration for us. The priest brought all necessary items and performed the rituals with devotion and expertise.'
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="testimonials-section mt-4">
            <div className="ornament-line " data-aos="zoom-in" duration="1000">
                <span className="om-symbol">ॐ</span>
            </div>
            <div className="testimonial-pattern-bg  "></div>
            <Container>
                <div
                    className="section-header text-center"

                >
                    <div className="section-sub-heading section-title">
                        {/* <span className="line"></span> */}
                        <h3 className="">Client Experiences</h3>
                        {/* <span className="line"></span> */}
                    </div>
                    <h3 className="section-title">What <span className="text-gradient">Devotees Say</span></h3>
                    <p className="section-description">
                        Hear from our community of devotees about their experiences with our pooja services
                    </p>
                </div>

                <div

                    className="testimonials-slider-container"
                >
                    <Slider {...settings}>
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="testimonial-slide-item" data-aos="fade-up" duration="1000" >
                                <div className="testimonial-card">
                                    <div className="quote-icon">
                                        <FaQuoteLeft />
                                    </div>
                                    <div className="testimonial-content">
                                        <p className="testimonial-text">
                                            {testimonial.text}
                                        </p>
                                    </div>
                                    <div className="testimonial-rating">
                                        {[...Array(5)].map((_, index) => (
                                            <FaStar
                                                key={index}
                                                className={index < testimonial.rating ? "star-filled" : "star-empty"}
                                            />
                                        ))}
                                    </div>
                                    <div className="testimonial-pooja">
                                        {testimonial.pooja}
                                    </div>
                                    <div className="testimonial-author" style={{justifyContent:"start"}}>
                                        <div className="author-image">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                            />
                                        </div>
                                        <div className="author-info" >
                                            <h5 className="author-name">{testimonial.name}</h5>
                                            <div className="author-location">{testimonial.location}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                <div
                    className="testimonial-cta text-center" data-aos="zoom-in" duration="2000"

                >
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="cta-box">
                                <h3>Experience Divine Rituals Yourself</h3>
                                <p>Book a pooja today and connect with your spiritual roots through authentic Vedic ceremonies</p>
                                {/* <button className="cta-btn">Book Your Pooja Now</button> */}
                                <button className="cta-btn" onClick={handleClick}>
      Book Your Pooja Now
    </button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default Testimonial;