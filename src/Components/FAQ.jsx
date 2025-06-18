import React, { useState } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const FAQ = () => {
    const faqs = [
        {
            id: 1,
            question: " Can I book multiple pujas together for different occasions?",
            answer: "Yes, you can easily book multiple pujas for different occasions such as Satyanarayan Puja, Griha Pravesh, or Rudrabhishek. Our system allows back-to-back scheduling or custom bundles based on your family needs."
        },
        {
            id: 2,
            question: " Are your pandits familiar with regional customs and languages?",
            answer: "Absolutely. We have qualified pandits from different regions of India, fluent in languages like Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, and more—ensuring rituals are performed as per your tradition."
        },
        {
            id: 3,
            question: " What if I need a puja urgently or within 24 hours?",
            answer: "We accommodate urgent puja bookings based on pandit availability. For same-day or next-day ceremonies, simply contact us via live chat or WhatsApp for priority assistance."
        },
        {
            id: 4,
            question: " Will I receive a list of samagri items in advance (if self-arranged)?",
            answer: "Yes, if you choose to arrange samagri yourself, we’ll provide a detailed checklist of Vedic samagri items in advance. However, most users prefer our full-service option where we handle all arrangements."
        },
        {
            id: 5,
            question: " Is there any consultation before the puja?",
            answer: "Yes, we offer a free pre-puja consultation with our team or assigned pandit to guide you on timings, rituals, and preparations based on your purpose (like dosha nivaran, griha shanti, etc.)."
        },
        {
            id: 6,
            question: " How do I ensure my puja is astrologically aligned (muhurat-based)?",
            answer: "During booking, you can select the muhurat-based timing option. Our team will consult Hindu Panchang and suggest the most auspicious date/time as per your city and ritual type."
        }
    ];

    const [showModal, setShowModal] = useState(false);
    const fadeInUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8
            }
        }
    };

    return (
        <>

            <Helmet>
                <title>Frequently Asked Questions | BookMyYagna – Online Puja Booking Made Easy</title>
                <meta
                    name="description"
                    content="Find answers to your questions about online puja booking, payment options, priest details, and yagna procedures. Book authentic Hindu rituals with ease at BookMyYagna."
                />
                <meta
                    name="keywords"
                    content="online puja FAQ, bookmyyagna faqs, hindu ritual questions, yagna booking help, puja booking support, online havan, priest booking online"
                />
                <meta
                    property="og:title"
                    content="BookMyYagna FAQ - Your Questions Answered About Online Puja Booking"
                />
                <meta
                    property="og:description"
                    content="Have questions about booking a puja online? Find clear answers about payments, procedures, priest details, timings, and more at BookMyYagna’s FAQ section"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bookmyyagna.com/FAQ" />
                <meta property="og:image" content="https://bookmyyagna.com/images/faq-og-image.jpg" />
                <link rel="canonical" href="https://bookmyyagna.com/FAQ" />
            </Helmet>
            <section className="faq-section" id="faq">

                <Container>
                    <div className="ornament-line " data-aos="zoom-in" duration="1000">
                        <span className="om-symbol">ॐ</span>
                    </div>
                    <motion.div
                        className="section-header text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className=" section-title">
                            <h3 className="">Your Questions, Answered with <span className="text-gradient">Devotion</span></h3>
                        </div>

                        <p className="section-description">
                            We understand that booking spiritual rituals online may bring up a few questions. We’re here to guide you through every step of the process. Find quick answers below, or reach out to us for a personal response.
                        </p>
                    </motion.div>

                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <motion.div
                                variants={fadeInUpVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="faq-container"
                            >
                                <Accordion defaultActiveKey="0" className="faq-accordion">
                                    {faqs.map((faq, index) => (
                                        <Accordion.Item eventKey={`${index}`} key={faq.id} className="faq-item">
                                            <Accordion.Header className="faq-header">
                                                <span className="faq-icon shadow-lg"><FaQuestion /></span>
                                                <span className="faq-question">{faq.question}</span>
                                            </Accordion.Header>
                                            <Accordion.Body className="faq-body">
                                                {faq.answer}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </motion.div>
                        </Col>
                    </Row>

                    <motion.div
                        className="faq-contact-info text-center mt-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <p>Still have questions? We're here to help!</p>
                        <div className="contact-options">
                            <a href="#!" className="contact-option" onClick={() => setShowModal(true)}>
                                <i className="fas fa-envelope"></i> Email Us
                            </a>
                            <a href="#" className="contact-option">
                                <i className="fas fa-comments"></i> Live Chat
                            </a>
                        </div>
                    </motion.div>
                </Container>
                {showModal && (
                    <div style={styles.overlay}>
                        <div style={styles.modalBox}>
                            <h3 style={styles.heading}>Send Us an Email</h3>
                            <input
                                type="text"
                                placeholder="Write your message here..."
                                style={styles.input}
                            />
                            <button style={styles.submitBtn}>Submit</button>
                            <button style={styles.closeBtn} onClick={() => setShowModal(false)}>×</button>
                        </div>
                    </div>
                )}

            </section>
        </>
    );
};
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalBox: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        textAlign: 'center',
    },
    heading: {
        marginBottom: '20px',
        fontSize: '1.5rem',
        background: 'linear-gradient(to right, #fc466b, #3f5efb)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1rem',
    },
    submitBtn: {
        background: 'linear-gradient(to right, #fc466b, #3f5efb)',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    closeBtn: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        background: 'transparent',
        border: 'none',
        fontSize: '1.2rem',
        cursor: 'pointer',
    },
};

export default FAQ;