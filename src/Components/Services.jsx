import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AOS from 'aos';
import { FaSun, FaMoon, FaCalendarAlt, FaClock, FaStar, FaOm } from 'react-icons/fa';
import { GiZigzagLeaf, GiMoonOrbit } from 'react-icons/gi';
import '../assets/css/servicepanchang.css'
import { Link } from 'react-router-dom';
const Services = () => {
    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    const panchangData = [
        {
            id: 1,
            title: "Tithi (तिथि)",
            description: "The lunar date that signifies spiritual and ritual timing. Tithi influences emotions, energies, and auspiciousness.",
            icon: <FaCalendarAlt className="service-icon" />,
            animation: "fade-up"
        },
        {
            id: 2,
            title: "Nakshatra (नक्षत्र)",
            description: "The star constellation the Moon resides in today. It shapes the day’s mood and rituals, guiding favorable actions.",
            icon: <FaStar className="service-icon" />,
            animation: "fade-up-right"
        },
        {
            id: 3,
            title: "Yoga (योग)",
            description: "A combination of the Sun and Moon's positions, determining auspicious timings for spiritual endeavors.",
            icon: <GiZigzagLeaf className="service-icon" />,
            animation: "fade-left"
        },
        {
            id: 4,
            title: "Karana (करण)",
            description: "Half of a Tithi that sets the ground for daily karma. Important for choosing right Muhurat (auspicious moment).",
            icon: <GiMoonOrbit className="service-icon" />,
            animation: "fade-down-left"
        },
        {
            id: 5,
            title: "Vaar (वार)",
            description: "The weekday, ruled by a planet. Every Vaar carries its own spiritual and astrological essence.",
            icon: <FaOm className="service-icon" />,
            animation: "fade-down-right"
        },
        {
            id: 6,
            title: "Sunrise & Sunset",
            description: "Timings of sunrise and sunset mark transitions of the day and are critical for Sandhya Vandana and Pujas.",
            icon: <FaSun className="service-icon" />,
            animation: "fade-up"
        }
    ];

    return (
        <section id="panchang" className="services-section">
            <Container>
                <div className="section-title" data-aos="fade-up">
                    <div className="ornament-line">
                        <span className="om-symbol">ॐ</span>
                    </div>
                    <h2>Panchang: Your Daily Cosmic Guide 🌞🌙</h2>
                    <p className='mb-4'>
                        Dive into the ancient wisdom of Vedic timekeeping. Panchang aligns your actions with celestial rhythms for maximum positivity.
                    </p>
                </div>

                <Row className="justify-content-center">
                    {panchangData.map((item) => (
                        <Col lg={4} md={6} className="mb-4" key={item.id}>
                            <Card
                                className="service-card h-100 shadow-lg"
                                style={{ borderRadius: "20px" }}
                                data-aos={item.animation}
                                data-aos-delay={item.id * 100}
                            >
                                <div className="service-icon-wrapper">
                                    {item.icon}
                                </div>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.description}</Card.Text>
                                </Card.Body>

                            </Card>

                        </Col>

                    ))}
                    <Card.Footer className="bg-transparent border-0 text-center py-3 overflow-hidden"  style={{
                            animation: 'zoomInOut 2s infinite ease-in-out',
                            transformOrigin: 'center',
                        }}>
                        <Link to="/panchang" className="text-decoration-none border border-danger p-2  fw-bold">
                            Lets see Calender→
                        </Link>
                    </Card.Footer>
                </Row>
            </Container>
        </section>
    );
};

export default Services;
