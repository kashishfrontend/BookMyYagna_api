import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

const ShippingDelivery = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out'
        });
    }, []);

    return (
        <>
            <Helmet >
                <title>Shipping & Delivery Policy | BookMyYagna</title>
                <meta
                    name="description"
                    content="Shipping and delivery information for BookMyYagna. Learn about our puja samagri delivery timelines and processes."
                />
                <meta
                    name="keywords"
                    content="puja samagri delivery, yagna kit shipping, BookMyYagna delivery, spiritual items shipping"
                />
                <meta property="og:title" content="Shipping & Delivery Policy | BookMyYagna" />
                <meta
                    property="og:description"
                    content="Information about shipping and delivery of puja materials and yagna kits from BookMyYagna."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bookmyyagna.com/shipping-delivery" />
                <meta property="og:image" content="https://bookmyyagna.com/images/shipping-og-image.jpg" />
                <link rel="canonical" href="https://bookmyyagna.com/shipping-delivery" />
            </Helmet>

            <section className="shipping-delivery-page" style={{ 
                padding: '80px 0 60px',
                backgroundColor: '#f9f5f0',
                minHeight: '100vh',
                marginTop:'50px'
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
                            Shipping & Delivery Policy
                        </h1>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#7f8c8d',
                            maxWidth: '700px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            Our commitment to delivering sacred items with care and precision
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
                                    }}>Puja Samagri Delivery</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        For bookings that include physical puja materials, we ensure delivery 2-3 business days before your scheduled puja date. 
                                        All items are carefully packed with sacred protection and include a checklist of contents. 
                                        Samagri is sourced directly from authorized vendors to ensure authenticity.
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
                                    }}>Delivery Areas & Timelines</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        We deliver to all major cities in India with following timelines:<br />
                                        • Metro cities: 2-3 business days<br />
                                        • Tier 2 cities: 3-5 business days<br />
                                        • Rural areas: 5-7 business days<br />
                                        International deliveries available for special requests with custom shipping quotes.
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
                                    }}>Shipping Charges</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        • Free standard shipping on all orders above ₹500<br />
                                        • ₹50 shipping charge for orders below ₹500<br />
                                        • Express delivery (next business day): ₹150 additional<br />
                                        • International shipping: Calculated at checkout<br />
                                        Special rates available for bulk orders of puja samagri.
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
                                    }}>Order Tracking</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        You'll receive tracking information via SMS and email once your order is shipped. 
                                        Our tracking portal provides real-time updates including:<br />
                                        • Package location<br />
                                        • Estimated delivery date<br />
                                        • Delivery attempts made<br />
                                        • Option to reschedule delivery if needed
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
                                    }}>Digital Services Delivery</h3>
                                    <p style={{
                                        fontSize: '1rem',
                                        color: '#555',
                                        lineHeight: '1.7',
                                        marginBottom: '0'
                                    }}>
                                        For online puja services, you'll receive within 24 hours of booking:<br />
                                        • Secure Zoom link for live participation<br />
                                        • Detailed puja schedule<br />
                                        • Priest bio and credentials<br />
                                        • Preparation guidelines<br />
                                        • Post-puja recording (if requested)<br />
                                        All digital materials are delivered via email and accessible through your account dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="info-box" style={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
                        padding: '30px',
                        marginBottom: '40px'
                    }} data-aos="fade-up">
                        <h4 style={{
                            fontSize: '1.3rem',
                            fontWeight: '600',
                            color: '#2c3e50',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>Special Handling Instructions</h4>
                        <div className="row">
                            <div className="col-md-6" style={{ marginBottom: '20px' }}>
                                <div style={{
                                    backgroundColor: '#f8f4ef',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    height: '100%'
                                }}>
                                    <h5 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#d4a762',
                                        marginBottom: '15px'
                                    }}>Sacred Items Handling</h5>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: '#555',
                                        lineHeight: '1.7'
                                    }}>
                                        All sacred items are packed according to Vedic traditions. 
                                        Please handle with clean hands and store in a pure space until puja time.
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{
                                    backgroundColor: '#f8f4ef',
                                    padding: '20px',
                                    borderRadius: '8px',
                                    height: '100%'
                                }}>
                                    <h5 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#d4a762',
                                        marginBottom: '15px'
                                    }}>Damaged/Missing Items</h5>
                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: '#555',
                                        lineHeight: '1.7'
                                    }}>
                                        If any items arrive damaged or missing, please notify us within 24 hours of delivery 
                                        for immediate replacement at no additional cost.
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
                        }}>Need Help With Your Delivery?</h4>
                        <p style={{
                            fontSize: '1rem',
                            color: '#555',
                            lineHeight: '1.7',
                            marginBottom: '20px'
                        }}>
                            Our customer support team is available to assist with any delivery-related questions.
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

export default ShippingDelivery;