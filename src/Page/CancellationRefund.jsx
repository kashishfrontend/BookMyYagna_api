import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

const CancellationRefund = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out'
        });
    }, []);

    return (
        <>
            <Helmet>
                <title>Cancellation & Refund Policy | BookMyYagna</title>
                <meta
                    name="description"
                    content="Cancellation and refund policy for BookMyYagna services. Understand our policies for cancelling puja bookings and requesting refunds."
                />
                <meta
                    name="keywords"
                    content="puja cancellation, yagna refund, BookMyYagna cancellation policy, spiritual service refund"
                />
                <meta property="og:title" content="Cancellation & Refund Policy | BookMyYagna" />
                <meta
                    property="og:description"
                    content="Official cancellation and refund policy for BookMyYagna services. Know your options if you need to cancel a booking."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bookmyyagna.com/cancellation-refund" />
                <meta property="og:image" content="https://bookmyyagna.com/images/refund-og-image.jpg" />
                <link rel="canonical" href="https://bookmyyagna.com/cancellation-refund" />
            </Helmet>

            <section className="cancellation-refund-page" style={{ 
                padding: '80px 0 60px',
                backgroundColor: '#f9f5f0',
                minHeight: '100vh'
            }}>
                <Container>
                    {/* Header Section */}
                    <div className="policy-header text-center mb-5" data-aos="fade-down" style={{marginTop:"50px"}}>
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
                            Cancellation & Refund Policy
                        </h1>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#7f8c8d',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Our transparent policies for booking modifications and refund procedures
                        </p>
                    </div>

                    {/* Policy Content */}
                    <div className="policy-content" style={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
                        padding: '40px',
                        marginBottom: '40px'
                    }}>
                        {/* Policy Item 1 */}
                        <div className="policy-item mb-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="d-flex align-items-start">
                                <div className="policy-number mr-4" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '40px',
                                    height: '40px',
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
                                    }}>Cancellation Policy</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        Bookings can be cancelled up to 48 hours before the scheduled puja time for a full refund. 
                                        Cancellations made within 48 hours of the scheduled time will incur a 30% cancellation fee 
                                        to cover preparatory costs and priest arrangements.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Policy Item 2 */}
                        <div className="policy-item mb-4" data-aos="fade-up" data-aos-delay="150">
                            <div className="d-flex align-items-start">
                                <div className="policy-number mr-4" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '40px',
                                    height: '40px',
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
                                    }}>Refund Process</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        Approved refunds will be processed within 7-10 business days to the original payment method. 
                                        For bank transfers, processing may take additional 2-3 business days to reflect in your account. 
                                        You will receive email confirmation once the refund is initiated.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Policy Item 3 */}
                        <div className="policy-item mb-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="d-flex align-items-start">
                                <div className="policy-number mr-4" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '40px',
                                    height: '40px',
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
                                    }}>Rescheduling</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        You may reschedule your puja up to 24 hours before the appointment at no additional cost, 
                                        subject to priest availability. Rescheduling requests made within 24 hours may incur a 
                                        15% service fee. Each booking can be rescheduled a maximum of two times.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Policy Item 4 */}
                        <div className="policy-item mb-4" data-aos="fade-up" data-aos-delay="250">
                            <div className="d-flex align-items-start">
                                <div className="policy-number mr-4" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '40px',
                                    height: '40px',
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
                                    }}>Non-Refundable Items</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        Customized or personalized puja items (including specific samagri, homa kundas, or yantras) 
                                        cannot be refunded once ordered. Digital products like personalized mantras or horoscope 
                                        reports are also non-refundable once delivered.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Policy Item 5 */}
                        <div className="policy-item" data-aos="fade-up" data-aos-delay="300">
                            <div className="d-flex align-items-start">
                                <div className="policy-number mr-4" style={{
                                    backgroundColor: '#f8e8d5',
                                    color: '#d4a762',
                                    width: '40px',
                                    height: '40px',
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
                                    }}>Priest Unavailability</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        In rare cases where we cannot arrange a priest for your scheduled puja, we will notify you 
                                        immediately and offer either a full refund or alternative dates with priority booking. 
                                        We guarantee 100% refund if cancellation is initiated from our side.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="contact-box text-center" data-aos="fade-up" style={{
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
                        }}>Need Help With Cancellation?</h4>
                        <p style={{
                            fontSize: '1rem',
                            color: '#555',
                            lineHeight: '1.7',
                            marginBottom: '20px'
                        }}>
                            For cancellation requests or any questions about our policy, please contact our support team.
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
                    </div>
                </Container>
            </section>
        </>
    );
};

export default CancellationRefund;