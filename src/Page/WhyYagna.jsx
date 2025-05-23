import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './YagnaPage.css';

const WhyYagna = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <section className="yagna-info-section">
            <Container>
                <div className="section-header" data-aos="fade-up">
                    <div className="ornament-line" data-aos="zoom-in">
                        <span className="om-symbol">ॐ</span>
                    </div>
                    <div className="section-title">
                        <h3>Why <span>Yagna & Pooja</span> Ceremonies Are Essential</h3>
                    </div>
                    <p>Every moment, every action, every thought affects the energy around us. We must align with the universal flow to maintain peace and prosperity.</p>
                </div>

                <div className="info-block" data-aos="fade-up">
                    <h4 className="info-heading">Why should you consider a Yagna or Pooja Ceremony?</h4>
                    
                    <div className="info-section">
                        <h5>• For Celebrations:</h5>
                        <p>
                            Life is a tapestry of beautiful moments—birthdays, weddings, housewarming ceremonies, or new beginnings. These are the times when we seek blessings and gratitude.
                            <strong> BookMyYagna</strong> offers you the chance to invite divine blessings through <strong>Hawan</strong> and <strong>Pooja ceremonies</strong>, whether you’re hosting at home or afar.
                        </p>
                    </div>

                    <div className="info-section">
                        <h5>• For Healing:</h5>
                        <p>
                            Life isn’t always smooth. During moments of loss or stress, we may feel disconnected. A <strong>Pooja</strong> or <strong>Yagna</strong> can restore the balance within you and cleanse your soul.
                            <strong> BookMyYagna</strong> helps you reconnect with the divine energy that supports us through life’s challenges, even when you’re physically or emotionally distant.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WhyYagna;
