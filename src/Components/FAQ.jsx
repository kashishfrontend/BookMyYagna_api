import React, { useState } from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQ = () => {
    const faqs = [
        {
            id: 1,
            question: "🙏 How do I book a ceremony?",
            answer: (
                <>
                  Booking is seamless and takes just a few minutes. Visit our{' '}
                  <Link style={{textDecoration:"none"}} to="/servicePage">Services</Link> page. Choose your desired Yagna, Pooja, or Ritual, select your preferred date and time, proceed with a secure online payment. You'll receive a confirmation email and WhatsApp message instantly.
                </>
              ),
            // answer: "Booking is seamless and takes just a few minutes.Visit our" <Link to={'/servicePage'}>Services</Link> "PageChoose your desired Yagna, Pooja, or RitualSelect your preferred date and timeProceed with a secure online paymentYou'll receive a confirmation email and WhatsApp message instantly."
        },
        {
            id: 2,
            question: "Can I customize the pooja according to my requirements?",
            answer: "Yes, we offer customization options for most of our poojas. During the booking process, you can add special requirements or preferences. For more specific customizations, you can contact our support team who will assist you in arranging a personalized ceremony."
        },
        {
            id: 3,
            question: "Do I need to arrange the pooja materials (samagri)?",
            answer: "No, our priests bring all the necessary pooja materials (samagri) required for the ritual. If you have any specific preferences or traditional items you'd like to include, you can mention this during booking or inform our priest before the ceremony."
        },
        {
            id: 4,
            question: "How experienced are your priests?",
            answer: "All our priests have at least 10 years of experience in performing Vedic rituals. They are well-versed in Sanskrit mantras and follow authentic procedures according to Vedic scriptures. We carefully select and verify each priest's credentials and expertise."
        },
        {
            id: 5,
            question: "Can I schedule a pooja for another city?",
            answer: "Yes, you can book a pooja in any city where our services are available. Currently, we operate in 20+ major cities across India. If your location is not listed, please contact our support team to check availability or arrange an online pooja."
        },
        {
            id: 6,
            question: "What happens if I need to reschedule or cancel my pooja?",
            answer: "You can reschedule your pooja at least 24 hours before the scheduled time at no extra cost. For cancellations made 48 hours before the scheduled time, we offer a full refund. Cancellations within 24 hours may incur a nominal charge. Please refer to our cancellation policy for more details."
        },
        {
            id: 7,
            question: "Do you offer online pooja services?",
            answer: "Yes, we offer online pooja services where the priest performs the ritual at our temple and you can join via video call. The priest will guide you through the process and you can participate virtually. Prasad and sacred items can be delivered to your address after the ceremony."
        },
        {
            id: 8,
            question: "How long does each pooja take?",
            answer: "The duration varies depending on the type of pooja. Simple poojas may take 1-2 hours, while more elaborate ceremonies like Griha Pravesh or Satyanarayan Pooja can take 3-4 hours. The estimated duration is mentioned in each pooja description on our website."
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
                        {/* <span className="line"></span> */}
                        
                        {/* <span className="line"></span> */}
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
                        {/* <a href="tel:+91000000000" className="contact-option">
                            <i className="fas fa-phone-alt"></i> Call Us
                        </a> */}
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