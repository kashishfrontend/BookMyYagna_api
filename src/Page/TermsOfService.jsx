import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
    useEffect(() => {
        AOS.init({
            duration: 300,
            once: true,
            easing: 'ease-in-out'
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>Terms of Service | BookMyYagna - Online Puja Booking Platform</title>
                <meta
                    name="description"
                    content="Read the Terms of Service for BookMyYagna, your trusted platform for booking online pujas and Vedic rituals. Understand our policies, user responsibilities, and service terms before you book a yagna."
                />
                <meta
                    name="keywords"
                    content="BookMyYagna terms, online puja terms, yagna booking terms, Vedic rituals terms, user responsibilities BookMyYagna"
                />
                <meta property="og:title" content="Terms of Service | BookMyYagna" />
                <meta
                    property="og:description"
                    content="Read the official Terms of Service for BookMyYagna. Understand your rights, responsibilities, and legal guidelines before booking a puja online."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bookmyyagna.com/termsofservice" />
                <meta property="og:image" content="https://bookmyyagna.com/images/terms-og-image.jpg" />
                <link rel="canonical" href="https://bookmyyagna.com/termsofservice" />
            </Helmet>

            <section className="terms-of-service-page" style={{ 
                padding: '80px 0 60px',
                backgroundColor: '#f9f5f0',
                minHeight: '100vh',
                marginTop:"50px"
            }}>
                <Container>
                    {/* Header Section */}
                    <div className="policy-header text-center mb-5" data-aos="fade-down">
                        <div className="divider" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <div style={{
                                height: '3px',
                                width: '80px',
                                backgroundColor: '#d4a762',
                                margin: '0 15px'
                            }}></div>
                            <span className="om-symbol" style={{
                                fontSize: '32px',
                                color: '#d4a762',
                                lineHeight: '1'
                            }}>ॐ</span>
                            <div style={{
                                height: '3px',
                                width: '80px',
                                backgroundColor: '#d4a762',
                                margin: '0 15px'
                            }}></div>
                        </div>
                        <h1 style={{
                            fontSize: '2.5rem',
                            fontWeight: '600',
                            color: '#2c3e50',
                            marginBottom: '15px',
                            fontFamily: "'Playfair Display', serif"
                        }}>
                            Terms of Service
                        </h1>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#7f8c8d',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    {/* Terms Content */}
                    <div className="terms-content" style={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
                        padding: '40px',
                        marginBottom: '40px'
                    }}>
                        {/* Introduction */}
                        <div className="terms-item mb-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="d-flex align-items-start">
                                <div className="terms-number me-2" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    flexShrink: '0',
                                    fontSize: '1.2rem'
                                }}>1</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '600',
                                        color: '#2c3e50',
                                        marginBottom: '15px'
                                    }}>Introduction</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        Welcome to BookMyYagna. These Terms of Service govern your use of our platform 
                                        and services. By accessing or using BookMyYagna, you agree to be bound by these 
                                        terms and our Privacy Policy. If you disagree with any part, you may not access 
                                        our services.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Account Terms */}
                        <div className="terms-item mb-4" data-aos="fade-up" data-aos-delay="150">
                            <div className="d-flex align-items-start">
                                <div className="terms-number me-2" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    flexShrink: '0',
                                    fontSize: '1.2rem'
                                }}>2</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '600',
                                        color: '#2c3e50',
                                        marginBottom: '15px'
                                    }}>Account Terms</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        • You must be at least 18 years old to use our services<br />
                                        • You are responsible for maintaining the security of your account<br />
                                        • You are responsible for all activities that occur under your account<br />
                                        • You must provide accurate and complete information<br />
                                        • One person may not maintain more than one account without permission
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Acceptable Use */}
                        <div className="terms-item mb-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="d-flex align-items-start">
                                <div className="terms-number me-2" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    flexShrink: '0',
                                    fontSize: '1.2rem'
                                }}>3</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '600',
                                        color: '#2c3e50',
                                        marginBottom: '15px'
                                    }}>Acceptable Use</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        You agree not to:<br />
                                        • Violate any laws in your jurisdiction<br />
                                        • Infringe on any intellectual property rights<br />
                                        • Upload or transmit viruses or malicious code<br />
                                        • Spam, phish, or engage in unethical marketing<br />
                                        • Interfere with the proper working of our services<br />
                                        • Bypass any measures we may use to restrict access<br />
                                        • Use our platform for any unlawful purpose
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payments & Refunds */}
                        <div className="terms-item mb-4" data-aos="fade-up" data-aos-delay="250">
                            <div className="d-flex align-items-start">
                                <div className="terms-number me-2" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    flexShrink: '0',
                                    fontSize: '1.2rem'
                                }}>4</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '600',
                                        color: '#2c3e50',
                                        marginBottom: '15px'
                                    }}>Payments & Refunds</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        • All prices are in INR unless otherwise stated<br />
                                        • We accept various payment methods as displayed at checkout<br />
                                        • Payment is due immediately at time of booking<br />
                                        • Refunds are processed according to our Cancellation Policy<br />
                                        • Chargebacks may result in account suspension<br />
                                        • We reserve the right to change pricing with prior notice
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="terms-item mb-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="d-flex align-items-start">
                                <div className="terms-number me-2" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    flexShrink: '0',
                                    fontSize: '1.2rem'
                                }}>5</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '600',
                                        color: '#2c3e50',
                                        marginBottom: '15px'
                                    }}>Limitation of Liability</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        BookMyYagna shall not be liable for any indirect, incidental, special, 
                                        consequential or punitive damages resulting from:<br />
                                        • Your use or inability to use our services<br />
                                        • Any unauthorized access to our systems<br />
                                        • Any interruption or cessation of services<br />
                                        • Any bugs or errors in our platform<br />
                                        • Any loss of data or content<br />
                                        Our total liability shall not exceed the amount you paid us in the past six months.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Amendments */}
                        <div className="terms-item d-flex justify-content-center align-content-center" data-aos="fade-up" data-aos-delay="350">
                            <div className="d-flex align-items-start">
                                <div className="terms-number me-2" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '35px',
                                    height: '35px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700',
                                    flexShrink: '0',
                                    fontSize: '1.2rem'
                                }}>6</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.4rem',
                                        fontWeight: '600',
                                        color: '#2c3e50',
                                        marginBottom: '15px'
                                    }}>Amendments</h3>
                                    <p  style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        We reserve the right to modify these terms at any time. When we make changes, 
                                        we will revise the "last updated" date at the top of this page. Your continued 
                                        use of our services after changes constitutes acceptance of the new terms. 
                                        We encourage you to periodically review this page for updates.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    {/* <div className="contact-box text-center" data-aos="fade-up" style={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
                        padding: '30px',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <h4 style={{
                            fontSize: '1.3rem',
                            fontWeight: '600',
                            color: '#2c3e50',
                            marginBottom: '20px'
                        }}>Questions About Our Terms?</h4>
                        <p style={{
                            fontSize: '1rem',
                            color: '#555',
                            lineHeight: '1.7',
                            marginBottom: '20px'
                        }}>
                            Our team is available to clarify any aspect of these Terms of Service.
                        </p>
                        <div className="contact-methods">
                            <a href="mailto:support@bookmyyagna.com" style={{
                                display: 'inline-block',
                                backgroundColor: '#d4a762',
                                color: '#fff',
                                padding: '12px 25px',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '500',
                                margin: '0 10px 10px 0',
                                transition: 'all 0.3s ease'
                            }} onMouseOver={(e) => e.target.style.backgroundColor = '#c1914a'} 
                               onMouseOut={(e) => e.target.style.backgroundColor = '#d4a762'}>
                                Email Support
                            </a>
                            <a href="tel:+911234567890" style={{
                                display: 'inline-block',
                                backgroundColor: '#2c3e50',
                                color: '#fff',
                                padding: '12px 25px',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: '500',
                                margin: '0 0 10px 10px',
                                transition: 'all 0.3s ease'
                            }} onMouseOver={(e) => e.target.style.backgroundColor = '#1a252f'} 
                               onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}>
                                Call Support
                            </a>
                        </div>
                    </div> */}
                </Container>
            </section>
        </>
    );
};

export default TermsOfService;