// import React, { useEffect } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import AOS from 'aos';
// // import 'aos/dist/aos.css';
// import { FaOm, FaPrayingHands, FaHandHoldingHeart } from 'react-icons/fa';
// import { GiFlowerPot, GiGreekTemple, GiIndianPalace } from 'react-icons/gi';

// const Services = () => {
//     useEffect(() => {
//         AOS.init({
//             duration: 1000,
//             once: false,
//         });
//     }, []);

//     const services = [
//         {
//             id: 1,
//             title: "Hawan & Yagna Ceremonies 🔥",
//             description:
//                 "A sacred fire ritual that purifies your surroundings and soul. Whether you're seeking success, health, wealth, or spiritual growth, this ceremony invites divine blessings. Choose from Kundali Dosh Nivaran, Maha Lakshmi Yagna, Vastu Shanti Yagna — we guide you every step.",
//             icon: <GiFlowerPot className="service-icon" />,
//             animation: "fade-up"
//         },
//         {
//             id: 2,
//             title: "Pooja Ceremonies 🕉",
//             description:
//                 "Every Pooja is tailored to your needs. Be it Ganesh Pooja for obstacle removal, Navagraha Pooja for planetary balance, or Mahalaxmi Pooja for prosperity, our Pandits perform rituals with precision and reverence.",
//             icon: <FaOm className="service-icon" />,
//             animation: "fade-up-right"
//         },
//         {
//             id: 3,
//             title: "Rituals for Peace & Prosperity",
//             description:
//                 "Powerful Vedic rituals that transform energy around you. From sacred chants to offerings, we help you overcome obstacles, restore balance, and align with divine forces for harmony and growth.",
//             icon: <FaPrayingHands className="service-icon" />,
//             animation: "fade-up-left"
//         },
//         {
//             id: 4,
//             title: "Grih Pravesh & Satyanarayan Katha",
//             description:
//                 "Housewarming and Satyanarayan Katha ceremonies filled with blessings for your new beginnings. Ideal for entering a new home or seeking Lord Vishnu’s grace for wealth and peace.",
//             icon: <GiGreekTemple className="service-icon" />,
//             animation: "fade-down-right"
//         },
//         {
//             id: 5,
//             title: "Durga & Laxmi Poojas",
//             description:
//                 "Worship the divine feminine energies — Durga for protection and strength, Laxmi for abundance and fortune. Conducted with devotion to invoke their powerful blessings.",
//             icon: <FaHandHoldingHeart className="service-icon" />,
//             animation: "fade-down-left"
//         },
//         {
//             id: 6,
//             title: "✨ Customize Your Ritual",
//             description:
//                 "Choose deity focus (Ganesh, Durga, Hanuman, Shiva), specific intentions (health, career, peace), and add-ons (extra Pandit, Prasad delivery, temple sankalp). Make your spiritual journey personal and impactful.",
//             icon: <GiIndianPalace className="service-icon" />,
//             animation: "fade-up"
//         }
//     ];

//     return (
//         <section id="services" className="services-section">
//             <Container>
//                 <div className="section-title" data-aos="fade-up" duration="1000">
//                     <div className="ornament-line">
//                         <span className="om-symbol">ॐ</span>
//                     </div>
//                     <h2>Our Services: A Divine Journey to Peace and Prosperity 🙏</h2>
//                     <p className='mb-4'>
//                         Discover authentic Vedic ceremonies performed with devotion and traditional rituals
//                     </p>
//                 </div>

//                 <Row className="justify-content-center">
//                     {services.map((service) => (
//                         <Col lg={4} md={6} className="mb-4" key={service.id}>
//                             <Card
//                                 className="service-card h-100 shadow-lg"
//                                 style={{ borderRadius: "20px" }}
//                                 data-aos={service.animation}
//                                 data-aos-delay={service.id * 100}
//                             >
//                                 <div className="service-icon-wrapper">
//                                     {service.icon}
//                                 </div>
//                                 <Card.Body>
//                                     <Card.Title>{service.title}</Card.Title>
//                                     <Card.Text>
//                                         {service.description}
//                                     </Card.Text>
//                                 </Card.Body>
//                                 {/* <div className="card-footer">
//                                     <button className="btn btn-book">Book Now</button>
//                                 </div> */}
//                             </Card>
//                         </Col>
//                     ))}
//                 </Row>
//             </Container>
//         </section>
//     );
// };

// export default Services;
import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AOS from 'aos';
import { FaSun, FaMoon, FaCalendarAlt, FaClock, FaStar, FaOm } from 'react-icons/fa';
import { GiZigzagLeaf, GiMoonOrbit } from 'react-icons/gi';
import './servicepanchang.css'
import { Link } from 'react-router-dom';
const Services = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
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
            description: "Timings of sunrise and sunset mark transitions of the day and are critical for Sandhya Vandana and Poojas.",
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
