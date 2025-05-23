import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TermsOfService = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    return (
        <section className="terms-of-service-section pt-5" style={{ padding: '50px 0px', backgroundColor: '#f7f7f7' }}>
            <Container>
                {/* Header Section */}
                <div className="section-header" data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div className="ornament-line" data-aos="zoom-in" style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                        <span className="om-symbol" style={{ fontSize: '36px', color: '#3a3a3a' }}>ॐ</span>
                    </div>
                    <div className="section-title">
                        <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#222' }}>Terms of Service</h3>
                    </div>
                    <p style={{ fontSize: '16px', color: '#555' }}>Please read the following terms and conditions carefully before using our services.</p>
                </div>

                {/* Terms Content */}
                <div className="terms-content" data-aos="fade-up" style={{ lineHeight: '1.6', color: '#333' }}>
                    <h4 className="terms-heading" style={{ fontSize: '20px', fontWeight: 'bold', color: '#222', marginTop: '20px' }}>Introduction</h4>
                    <p style={{ fontSize: '16px', color: '#555' }}>
                        By using <strong>BookMyYagna</strong> services, you agree to comply with these terms and conditions.
                    </p>

                    <h4 className="terms-heading" style={{ fontSize: '20px', fontWeight: 'bold', color: '#222', marginTop: '20px' }}>Acceptable Use</h4>
                    <p style={{ fontSize: '16px', color: '#555' }}>
                        You agree not to misuse our services or engage in any activity that could damage the website or services.
                    </p>

                    <h4 className="terms-heading" style={{ fontSize: '20px', fontWeight: 'bold', color: '#222', marginTop: '20px' }}>Limitation of Liability</h4>
                    <p style={{ fontSize: '16px', color: '#555' }}>
                        We are not responsible for any damage that may occur due to the use or inability to use our services.
                    </p>

                    <h4 className="terms-heading" style={{ fontSize: '20px', fontWeight: 'bold', color: '#222', marginTop: '20px' }}>Amendments</h4>
                    <p style={{ fontSize: '16px', color: '#555' }}>
                        We reserve the right to modify these terms at any time. Please review this page periodically for updates.
                    </p>

                    <p style={{ fontSize: '16px', color: '#555' }}>
                        If you have any questions about our Terms of Service, please contact us at <strong>support@bookmyyagna.com</strong>.
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default TermsOfService;
