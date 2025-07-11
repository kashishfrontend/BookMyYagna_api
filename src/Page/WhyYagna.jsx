import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/YagnaPage.css';
import { Link } from 'react-router-dom';

const WhyYagna = () => {
    useEffect(() => {
        AOS.init({
            duration: 300,
            offset: 10,
        });
    }, []);

    return (
        <section className="yagna-info-section">
            <Container>
                <div className="section-header" data-aos="fade-up">
                    <div className="ornament-line" data-aos="zoom-in">
                        <span className="om-symbol">ॐ</span>
                    </div>
                    <div className="section-title">
                        <h3>Why <span style={{ position: "relative", right: "5px" }}>Yagna & Puja</span>Ceremonies Matter
                        </h3>
                    </div>
                    <p>Every thought, action, and moment generates energy. Aligning with this universal energy through Puja and Yagna ceremonies brings peace, positivity, and spiritual harmony into our lives.
                    </p>
                </div>

                <div className="info-block" data-aos="fade-up">
                    <h4 className="info-heading">Why Choose a Yagna or Puja Ceremony with BookMyYagna?</h4>

                    <div className="info-section">
                        <h5>• For Celebrations:</h5>
                        <p>
                            From <strong> weddings, birthdays,  housewarmings, </strong> to new ventures—every special occasion calls for divine blessings. <strong>BookMyYagna</strong> offers <Link to={'/listofpuja'}>online puja booking</Link  > with trusted pandits and sacred rituals like Hawan and puja, available at your comfort.


                        </p>
                    </div>

                    <div className="info-section">
                        <h5>• For Healing:</h5>
                        <p>
                            Difficult times like <strong> loss, stress, or emotional imbalance </strong> can leave us feeling disconnected.
                            A well-performed <strong> Yagna </strong> or <strong> Puja  </strong>helps restore inner peace, removes negative energy, and recharges your spiritual strength.
                            With <strong> BookMyYagna </strong>, reconnect with divine energy and invite healing into your life.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default WhyYagna;
