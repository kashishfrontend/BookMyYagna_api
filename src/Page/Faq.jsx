import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQ = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    return (
        <section className="faq-section " style={{ padding: '50px 0 ', backgroundColor: '#f7f7f7' }}>
            <Container>
                {/* Header Section */}
                <div className="section-header" data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div className="ornament-line" data-aos="zoom-in" style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                        <span className="om-symbol" style={{ fontSize: '36px', color: '#3a3a3a' }}>ॐ</span>
                    </div>
                    <div className="section-title">
                        <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#222' }}>Frequently Asked Questions</h3>
                    </div>
                    <p style={{ fontSize: '16px', color: '#555' }}>Find answers to some of the most common questions related to our services.</p>
                </div>

                {/* FAQ Content */}
                <div className="faq-content" data-aos="fade-up" style={{ lineHeight: '1.6', color: '#333' }}>
                    <div className="faq-item" style={{ marginBottom: '20px' }}>
                        <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>What is a Yagna Ceremony?</h5>
                        <p style={{ fontSize: '16px', color: '#555' }}>
                            A Yagna is a sacred fire ceremony performed to invoke divine blessings, bring prosperity, and create positive energy.
                        </p>
                    </div>
                    <div className="faq-item" style={{ marginBottom: '20px' }}>
                        <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>How can I book a Pooja Ceremony?</h5>
                        <p style={{ fontSize: '16px', color: '#555' }}>
                            You can book a Pooja or Yagna ceremony directly on our website. Simply choose the ceremony, provide necessary details, and we'll handle the rest.
                        </p>
                    </div>
                    <div className="faq-item" style={{ marginBottom: '20px' }}>
                        <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>Can I attend the ceremony remotely?</h5>
                        <p style={{ fontSize: '16px', color: '#555' }}>
                            Yes, we offer remote access to ceremonies. You can attend virtually via video call or live stream, depending on the ceremony.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default FAQ;
