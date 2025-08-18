import React, { useState, useEffect } from 'react';
import {
  FaEnvelope, FaPhoneAlt, FaWhatsapp,
  FaInstagram, FaYoutube, FaFacebook, FaTelegram, FaCheckCircle
} from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    subject: false,
    message: false
  });

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
    
    // Mark field as touched
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Clear error for the field being edited if it's now valid
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle blur events
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Validate individual field
  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value)) {
          error = 'Phone number must be 10 digits';
        }
        break;
      case 'subject':
        if (!value) error = 'Please select a subject';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        break;
      default:
        break;
    }
    
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    } else {
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      message: true
    });
    
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the errors in the form.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://bookmyyogna.onrender.com/contactUs/createContactMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const data = await response.json();
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
      setTouched({
        fullName: false,
        email: false,
        phone: false,
        subject: false,
        message: false
      });
      
      // Show success message
      toast.success('Message sent successfully! We will contact you soon.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again later.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
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
      </Helmet>
      
      <Container className="py-5">
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
                  <p className="mb-1"><strong>Phone:</strong>+91 8569977705</p>
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
                    <p className="mb-1"><strong>Chat:</strong> +91 8569977705</p>
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
            <Card className="shadow-sm border-0">
              <Card.Body style={{ padding: '2rem' }}>
                <h3 className="text-center mb-4" style={{ color: '#8B5A2B' }}>
                  Send Us a Message
                </h3>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Enter your full name"
                          isInvalid={touched.fullName && !!errors.fullName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.fullName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Enter your email"
                          isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Phone Number <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Enter your phone number"
                          isInvalid={touched.phone && !!errors.phone}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formSubject">
                        <Form.Label>Subject <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          isInvalid={touched.subject && !!errors.subject}
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
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Message <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter your message"
                      rows={5}
                      isInvalid={touched.message && !!errors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <div className="text-center mt-4">
                    <Button
                      type="submit"
                      style={{ 
                        backgroundColor: '#8B5A2B',
                        borderColor: '#8B5A2B',
                        padding: '0.5rem 2rem',
                        fontSize: '1.1rem'
                      }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Success Modal */}
        <Modal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          centered
          size="md"
        >
          ///
          <Modal.Body className="text-center p-4">
            <FaCheckCircle size={60} className="text-success mb-3" />
            <h4 className="fw-bold mb-3" style={{ color: '#5a3e1f' }}>Thank You!</h4>
            <p className="mb-4">
              Your message has been sent successfully. We'll get back to you within 12-24 hours.
            </p>
            <Button
              style={{ 
                backgroundColor: '#8B5A2B', 
                borderColor: '#8B5A2B',
                padding: '0.375rem 1.5rem'
              }}
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

const ContactCard = ({ icon, title, content }) => (
  <Card className="h-100 shadow-sm border-0">
    <Card.Body className="p-3">
      <div className="d-flex align-items-center mb-2">
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(139, 90, 43, 0.1)',
          marginRight: '0.75rem'
        }}>
          {icon}
        </div>
        <h5 className="mb-0 fw-semibold">{title}</h5>
      </div>
      <div className="text-muted small">
        {typeof content === "string" ? <p className="mb-0">{content}</p> : content}
      </div>
    </Card.Body>
  </Card>
);

export default Contact;