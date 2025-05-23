import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
// import VisibilitySensor from 'react-visibility-sensor';
// import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
// import 'aos/dist/aos.css';
import {
    FaUserTie,
    FaCalendarAlt,
    FaHandHoldingHeart,
    FaGem,
    FaBookOpen,
    FaOm,
    FaUsers,
    FaPrayingHands
} from 'react-icons/fa';

const WhyChooseUs = () => {
    const { ref, inView } = useInView({ triggerOnce: true });
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });
    }, []);

    const advantages = [
        {
            id: 1,
            icon: <FaUserTie />,
            title: "Experienced Pandits",
            description: "Our ceremonies are conducted by highly qualified Vedic scholars with decades of experience in performing traditional rituals.",
            animation: "fade-right"
        },
        {
            id: 2,
            icon: <FaBookOpen />,
            title: "Authentic Scriptures",
            description: "All rituals follow authentic Vedic scriptures and are performed with precise adherence to ancient traditions and customs.",
            animation: "fade-up"
        },
        {
            id: 3,
            icon: <FaCalendarAlt />,
            title: "Flexible Scheduling",
            description: "Choose a date and time that works best for you and your family. We accommodate early morning, evening, and weekend ceremonies.",
            animation: "fade-left"
        },
        {
            id: 4,
            icon: <FaPrayingHands />,
            title: "Complete Ceremonies",
            description: "We provide all necessary samagri (ritual materials) and perform every step of the ceremony with proper mantras and rituals.",
            animation: "fade-right"
        },
        {
            id: 5,
            icon: <FaHandHoldingHeart />,
            title: "Personal Guidance",
            description: "Our pandits offer personalized guidance throughout the ceremony, explaining the significance of each ritual step.",
            animation: "fade-up"
        },
        {
            id: 6,
            icon: <FaGem />,
            title: "Quality Assurance",
            description: "We use only the highest quality, pure ingredients and materials for all rituals, ensuring the most auspicious outcomes.",
            animation: "fade-left"
        }
    ];

    const stats = [
        {
            id: 1,
            icon: <FaUsers />,
            count: 5000,
            title: "Happy Families",
            plus: true,
            duration: 1.8,
        },
        {
            id: 2,
            icon: <FaPrayingHands />,
            count: 10000,
            title: "Ceremonies Performed",
            plus: true,
            duration: 1.8,
        },
        {
            id: 3,
            icon: <FaUserTie />,
            count: 21,
            title: "Expert Pandits",
            plus: false,
            duration: 5,
        },
        {
            id: 4,
            icon: <FaOm />,
            count: 15,
            title: "Years of Service",
            plus: true,
            duration: 5,
        }
    ];

    return (
        <section id="why-choose-us" className="why-choose-us-section">
            <div className="curved-separator-top">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z">
                    </path>
                </svg>
            </div>

            <Container>
                <div className="section-title" data-aos="fade-down">
                    <div className="ornament-line ">
                        <span className="om-symbol">ॐ</span>
                    </div>
                    <h2>Why Choose Our Divine Services</h2>
                    <p className='pb-3'>Experience authentic Vedic traditions with our dedicated team of accomplished pandits</p>
                </div>

                <div className="advantages-wrapper">
                    <Row>
                        {advantages.map((advantage) => (
                            <Col lg={4} md={6} className="mb-4 " key={advantage.id}>
                                <div
                                    className="advantage-card"
                                    data-aos={advantage.animation}
                                    data-aos-delay={advantage.id * 100}
                                >
                                    <div className="advantage-icon">
                                        {advantage.icon}
                                        <div className="icon-bg"></div>
                                    </div>
                                    <h3>{advantage.title}</h3>
                                   <p style={{textAlign:"justify"}}>{advantage.description}</p>
                                </div>
                            </Col>

                        ))}
                    </Row>
                </div>

                <div className="testimonial-banner" data-aos="zoom-out" duration="1000">
                    <div className="testimonial-content">
                        <div className="quote-mark">"</div>
                        <p>
                            The Satyanarayan Pooja performed for our new home was one of the most
                            authentic and spiritually enriching experiences. The pandit's knowledge
                            and the traditional approach made it truly special.
                        </p>
                        <div className="testimonial-author">
                            <div className="author-avatar">
                                <img src="/api/placeholder/60/60" alt="Testimonial Author" />
                            </div>
                            <div className="author-info">
                                <h4>Rajiv Sharma</h4>
                                <span>Delhi, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="stats-container">
                    <Row className="text-center">
                        {stats.map((stat) => (
                            <Col md={3} sm={6} className="mb-4 col-6" key={stat.id}>
                                <div
                                    className="stat-card"
                                    data-aos="fade-up"
                                    data-aos-delay={stat.id * 150}
                                    ref={ref}
                                >
                                    <div className="stat-icon">
                                        {stat.icon}

                                    </div>
                                    <h2 className="stat-number">
                                        {inView && (
                                            <CountUp
                                                start={0}
                                                end={stat.count}
                                                duration={stat.duration}
                                                separator=","
                                                suffix={stat.plus ? "+" : ""}
                                            />
                                        )}
                                    </h2>
                                    <p className="stat-title">{stat.title}</p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

            {/* <div className="sacred-banner">
                <div className="sacred-overlay"></div>
                <Container>
                    <div className="sacred-content"  data-aos="zoom-out" duration="1000" >
                        <h3>Experience the Sacredness of Authentic Vedic Rituals</h3>
                        <p>Book your ceremony today and invite divine blessings into your life</p>
                        <button className="btn btn-sacred">Schedule Consultation</button>
                    </div>
                </Container>
            </div> */}

            {/* <div className="curved-separator-bottom">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,10.7C1120,0,1280,0,1360,0L1440,0L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z">
                    </path>
                </svg>
            </div> */}
        </section>
    );
};

export default WhyChooseUs;