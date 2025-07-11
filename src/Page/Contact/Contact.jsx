import React, { useState, useEffect } from 'react';
import {
  FaEnvelope, FaPhoneAlt, FaWhatsapp,
  FaInstagram, FaYoutube, FaFacebook, FaTelegram, FaCheckCircle
} from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/ContactUs.css';

const Contact = () => {
  // WhatsApp URL
  const whatsappUrl = "https://wa.me/8569977795";

  // Social media URLs
  const socialLinks = {
    instagram: "https://www.instagram.com/bookmyyagna/",
    youtube: "https://www.youtube.com/@BookMyYagna",
    facebook: "https://www.facebook.com/people/Book-My-Yagna/61576241761744/",
    telegram: "https://t.me/bookmyyagna"
  };

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 300,
      offset: 10,
      once: true
    });
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.subject) newErrors.subject = 'Please select a subject';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus({ type: 'danger', message: 'Please fix the errors in the form.' });
      return;
    }

    // Simulate form submission (log to console for demo)
    console.log('Form submitted:', formData);

    // Reset form and show success modal
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setErrors({});
    setSubmitStatus(null);
    setShowSuccessModal(true);

    // Auto-close modal after 5 seconds
    setTimeout(() => setShowSuccessModal(false), 5000);
  };

  return (
    <>
      <Helmet>
        <title>Contact BookMyYagna | Book Online Puja & Yagna Services in India</title>
        <meta
          name="description"
          content="Contact BookMyYagna to book authentic online pujas, homams, and Vedic rituals or inquire about custom spiritual services. Fill out our form or reach us via email, phone, or WhatsApp."
        />
        <meta
          name="keywords"
          content="BookMyYagna contact, online puja booking, book yagna, Vedic rituals, pandit online, religious ceremony help, puja customer support, spiritual inquiries"
        />
        <meta
          property="og:title"
          content="Contact Us | BookMyYagna – Book Online Pujas & Rituals"
        />
        <meta
          property="og:description"
          content="Reach out to BookMyYagna via our contact form, email, phone, or WhatsApp for inquiries about online puja booking, pandit availability, and custom spiritual services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bookmyyagna.com/contact" />
        <meta property="og:image" content="https://bookmyyagna.com/images/contact-og-image.jpg" />
        <link rel="canonical" href="https://bookmyyagna.com/contact" />
      </Helmet>
      <div className="container py-5">
        <div className="text-center mb-5" data-aos="fade-down">
          <h2 className="fw-bold border-bottom d-inline-block pb-2 mb-3" style={{ marginTop: "90px" }}>
            Contact BookMyYagna – We're Here to Help
          </h2>
          <p className="text-muted">
            Get in touch for puja bookings, event queries, or spiritual guidance.
          </p>
        </div>

        <Row className="g-4 py-5">
          {/* Email Card */}
          <Col xs={12} md={6} lg={4}>
            <ContactCard
              icon={<FaEnvelope size={20} className="text-warning" />}
              title="Email"
              content={
                <>
                  <a href="mailto:support@bookmyyagna.com" className="text-decoration-none text-warning fw-semibold">
                    support@bookmyyagna.com
                  </a>
                  <p className="mb-0">Response within 12–24 hours</p>
                </>
              }
            />
          </Col>

          {/* Phone Card */}
          <Col xs={12} md={6} lg={4}>
            <ContactCard
              icon={<FaPhoneAlt size={18} className="text-warning" />}
              title="Call Us"
              content={
                <>
                  <p className="mb-1"><strong>Phone:</strong>+91 8569977795</p>
                  <p className="mb-0">10 AM – 8 PM IST (Daily)</p>
                </>
              }
            />
          </Col>

          {/* WhatsApp Card */}
          <Col xs={12} md={6} lg={4}>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <ContactCard
                icon={<FaWhatsapp size={20} className="text-success" />}
                title="WhatsApp"
                content={
                  <>
                    <p className="mb-1"><strong>Chat:</strong> +91 8569977795</p>
                    <p className="mb-0">Instant help with puja recommendations & bookings</p>
                  </>
                }
              />
            </a>
          </Col>

          {/* Social Media Cards */}
          <Col xs={12} md={6} lg={4}>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
              <ContactCard
                icon={<FaInstagram size={20} className="text-danger" />}
                title="Instagram"
                content="Ritual clips & live alerts"
              />
            </a>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
              <ContactCard
                icon={<FaYoutube size={20} className="text-danger" />}
                title="YouTube"
                content="Watch live pujas & stories"
              />
            </a>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
              <ContactCard
                icon={<FaFacebook size={20} className="text-primary" />}
                title="Facebook"
                content="Events & bhajan updates"
              />
            </a>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
              <ContactCard
                icon={<FaTelegram size={20} className="text-info" />}
                title="Telegram"
                content="Daily mantras & satsang invites"
              />
            </a>
          </Col>
        </Row>

        {/* Contact Form */}
        <Row className="mt-5" data-aos="fade-up">
          <Col xs={12} lg={8} className="mx-auto">
            <Card className="contact-form-card shadow-sm border-0">
              <Card.Body>
                <h3 className="text-center mb-4" style={{ color: 'var(--primary-color)' }}>
                  Send Us a Message
                </h3>
                {submitStatus && (
                  <Alert variant={submitStatus.type} className="text-center">
                    {submitStatus.message}
                  </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <div className='d-md-flex gap-3'>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </div>
                  <div className='d-md-flex gap-3'>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          isInvalid={!!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formSubject">
                        <Form.Label>Subject</Form.Label>
                        <Form.Select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          isInvalid={!!errors.subject}
                        >
                          <option value="">Select a subject</option>
                          <option value="puja_booking">Puja Booking</option>
                          <option value="event_query">Event Query</option>
                          <option value="spiritual_guidance">Spiritual Guidance</option>
                          <option value="other">Other</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </div>
                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message"
                      rows={5}
                      isInvalid={!!errors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="btn-primary"
                      style={{ background: 'linear-gradient(180deg, #FF7722, #E65C00)', border: 'none' }}
                    >
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Success Popup Modal */}
        <Modal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          centered
          className="contact-success-modal"
          animation
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="w-100 text-center" style={{ color: 'var(--primary-color)' }}>
              Message Sent Successfully!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <FaCheckCircle size={50} className="text-success mb-3" />
            <p className="mb-0">
              Thank you for reaching out to BookMyYagna! We have received your message and will respond within 12–24 hours.
            </p>
          </Modal.Body>
          <Modal.Footer className="border-0 justify-content-center">
            <Button
              className="btn-primary"
              onClick={() => setShowSuccessModal(false)}
              style={{ background: 'linear-gradient(180deg, #FF7722, #E65C00)', border: 'none' }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

const ContactCard = ({ icon, title, content }) => (
  <div className="contact-card">
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          {icon}
          <h5 className="mb-0 ms-2 fw-semibold">{title}</h5>
        </div>
        <div className="text-muted small">
          {typeof content === "string" ? <p className="mb-0">{content}</p> : content}
        </div>
      </div>
    </div>
  </div>
);

export default Contact;