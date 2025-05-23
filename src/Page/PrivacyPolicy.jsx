import {React,useEffect} from 'react';
import { Container } from 'react-bootstrap';
import '../Page/PrivacyPloicy.css';  // You can create this CSS file for styles
import AOS from 'aos';
import 'aos/dist/aos.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);
    return (
        <section className="privacy-policy-section">
            <Container>
                <div className="section-header" data-aos="fade-up">
                    <div className="ornament-line" data-aos="zoom-in">
                        <span className="om-symbol">ॐ</span>
                    </div>
                    <div className="section-title">
                        <h3>Privacy Policy</h3>
                    </div>
                    <p className=''>Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information.</p>
                </div>

                <div className="privacy-content" data-aos="fade-up">
                    <h4 className="privacy-heading">Introduction</h4>
                    <p>
                        At <strong>BookMyYagna</strong>, we are committed to protecting and respecting your privacy. This policy outlines the information we collect from you and how it is used.
                    </p>

                    <h4 className="privacy-heading">Information We Collect</h4>
                    <p>
                        We may collect personal details, such as your name, email address, phone number, and location, when you make a booking or inquire about our services.
                    </p>

                    <h4 className="privacy-heading">How We Use Your Information</h4>
                    <p>
                        The information we collect helps us improve our services, communicate with you about your bookings, and provide personalized experiences.
                    </p>

                    <h4 className="privacy-heading">Data Protection</h4>
                    <p>
                        We use secure methods to protect your personal information and ensure that it is only accessible by authorized personnel.
                    </p>

                    <h4 className="privacy-heading">Changes to This Policy</h4>
                    <p>
                        We may update this privacy policy occasionally. We encourage you to review this page regularly to stay informed.
                    </p>

                    <p>
                        If you have any questions or concerns about our privacy practices, please contact us at <strong>support@bookmyyagna.com</strong>.
                    </p>
                </div>
            </Container>
        </section>
    );
};

export default PrivacyPolicy;
