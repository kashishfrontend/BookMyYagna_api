import { React, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import AOS from 'aos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import user from '../assets/img/user.webp'
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
            name: 'Aman Agarwal',
            location: 'Bangalore',
            pooja: 'Ganesh Puja',
            rating: 5,
            image: user,
            text: '“Booking our Ganesh Puja through BookMyYagna was the best decision! Even on short notice, the pandit ji arrived fully prepared with all puja samagri. The rituals were conducted with devotion and proper Vedic chants. Highly recommended for any online puja services.”'
        },
        {
            id: 2,
            name: 'Isha Sharma',
            location: 'Noida',
            pooja: 'Navgraha Shanti Yagna',
            rating: 5,
            image: user,
            text: '“We booked a Navgraha Shanti Yagna through BookMyYagna and were amazed by the attention to detail. The online consultation with their Vedic astrologer helped us choose the right date. Their service was not only spiritual but also smooth and timely.”'
        },
        {
            id: 3,
            name: 'Nikhil Jain',
            location: 'Hyderabad',
            pooja: 'Satyanarayan Katha',
            rating: 5,
            image: user,
            text: '“From arranging the Satyanarayan Katha to delivering prasad and samagri on time, BookMyYagna handled everything beautifully. The pandit ji explained every step and made the experience peaceful and fulfilling. Great platform for home havan services.”'
        },
        {
            id: 4,
            name: 'Shruti Desai',
            location: 'Goa',
            pooja: 'Kundli Dosha Nivaran Puja',
            rating: 5,
            image: user,
            text: '“Being abroad, I was unsure how to do a Kundli Dosha Nivaran Puja. BookMyYagna arranged a live-streamed puja with all rituals done in a temple on our behalf. The process was seamless, and we even received the digital prasad. Truly divine!”'
        },
        {
            id: 5,
            name: 'Raghav Bansal',
            location: 'Mumbai',
            pooja: 'Vastu Puja',
            rating: 5,
            image: user,
            text: '“We were looking for a trusted Vastu Puja service for our new office. BookMyYagna not only provided an experienced pandit but also shared a custom puja guide with step-by-step significance. Their team is professional and spiritually grounded.”'
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
                    <h3 className="section-title">What <span className="text-gradient"> Devotees Say About BookMyYagna</span></h3>
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
                                        <p className="testimonial-text" >
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
                                    <div className="testimonial-author" style={{ justifyContent: "start" }}>
                                        {/* <div className="author-image">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                            />
                                        </div> */}
                                        <div className="author-info text-center m-auto" >
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