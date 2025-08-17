import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
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
          duration: 300,
            offset: 10,
            once: false,
            mirror: true,
        });
    }, []);

    const advantages = [
        {
            id: 1,
            icon: <FaUserTie />,
            title: "Experienced Pandits",
            description: "Our Vedic pujas are led by highly experienced and certified pandits with years of expertise in Hindu rituals. Each ceremony is performed with precision, authenticity, and devotion.",
            animation: "fade-right"
        },
        {
            id: 2,
            icon: <FaBookOpen />,
            title: "Authentic Scriptures",
            description: "All rituals follow traditional Vedic scriptures and ancient mantras, ensuring 100% adherence to Hindu customs for maximum spiritual benefit.",
            animation: "fade-up"
        },
        {
            id: 3,
            icon: <FaCalendarAlt />,
            title: "Adaptive Scheduling",
            description: "Book your puja at your convenience — morning, evening, or weekend slots. We offer flexible timing to suit your family's comfort and schedule.",
            animation: "fade-left"
        },
        {
            id: 4,
            icon: <FaPrayingHands />,
            title: "Complete Ceremonies",
            description: "We provide full puja samagri and handle each ritual step as per the Vedic process, so you can relax and experience a hassle-free, sacred ceremony.",
            animation: "fade-right"
        },
        {
            id: 5,
            icon: <FaHandHoldingHeart />,
            title: "Personal Guidance",
            description: "Our pandits explain the meaning and significance of every step, making your ceremony spiritually enriching and easy to follow for the entire family.",
            animation: "fade-up"
        },
        {
            id: 6,
            icon: <FaGem />,
            title: "Quality Assurance",
            description: "Only pure, high-quality ingredients and Vedic-certified items are used in every puja, ensuring the most auspicious and effective outcomes.",
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
                    <h2>Why Choose Our Divine Services?</h2>
                    <p className='pb-3'>Experience authentic Vedic traditions with our dedicated team of accomplished pandits.
                        At <b> BookMyYagna </b>, we are committed to delivering spiritual ceremonies with precision, authenticity, and devotion. Here’s why thousands of families trust us with their sacred rituals:</p>
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
                                    <p style={{ textAlign: "justify" }}>{advantage.description}</p>
                                </div>
                            </Col>

                        ))}
                    </Row>
                </div>

                <div className="testimonial-banner" data-aos="zoom-out" duration="1000">
                    <div className="testimonial-content">
                        <div className="quote-mark">"</div>
                        <p>
                            "We booked a Griha Pravesh Puja through BookMyYagna, and the entire experience was divine. The panditji arrived on time, brought all the samagri, and explained every step with meaning. It truly made our housewarming memorable."
                        </p>
                        <div className="testimonial-author">

                            <div className="author-info" style={{color:"brown"}}>
                                <h4>– Priya Mehta</h4>
                                <span>Bangalore, India</span>
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
        </section>
    );
};

export default WhyChooseUs;