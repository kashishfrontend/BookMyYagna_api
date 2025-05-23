import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaOm, FaPrayingHands, } from 'react-icons/fa';
// import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section" style={{ backgroundImage: "#e3e3e3" }}>
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0 footer-info">
              <div className="footer-logo d-flex align-content-center justify-content-center">
                <FaOm className="om-icon" />
                <h3>BookmyYagna
                </h3>
              </div>
              <p>Connecting devotees with authentic Hindu rituals and spiritual experiences. Book your pooja services online and experience the divine blessings.</p>
              <div className="social-links">
                <a href="#" className="social-icon"><FaFacebookF /></a>
                <a href="#" className="social-icon"><FaTwitter /></a>
                <a href="#" className="social-icon"><FaInstagram /></a>
                <a href="#" className="social-icon"><FaYoutube /></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 mb-4 mb-md-0 footer-links mt-0 mt-md-3">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Gallery</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-4 mb-md-0 footer-services mt-0 mt-md-3">
              <h4>Our Services</h4>
              <ul>
                <li><a href="#"><FaPrayingHands className="service-icon" /> Ganesh Pooja</a></li>
                <li><a href="#"><FaPrayingHands className="service-icon" /> Satyanarayan Katha</a></li>
                <li><a href="#"><FaPrayingHands className="service-icon" /> Griha Pravesh</a></li>
                <li><a href="#"><FaPrayingHands className="service-icon" /> Vivah Sanskar</a></li>
                {/* <li><a href="#"><FaPrayingHands className="service-icon" /> Navgraha Shanti</a></li> */}
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 footer-contact mt-0 mt-md-3">
              <h4>Contact Us</h4>
              <div className="contact-info">
                <p><FaMapMarkerAlt className="contact-icon" /> 123 Rohtak,Haryana  India</p>
                <p><FaPhoneAlt className="contact-icon" /> +91 0000 00000</p>
                <p><FaEnvelope className="contact-icon" /> info@poojabooking.com</p>
              </div>
              <div className="newsletter">
                <h5>Subscribe to our Newsletter</h5>
                <div className="newsletter-form">
                  <input type="email" placeholder="Your Email" />
                  <button type="submit" className="btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-mandala"></div>
              <p className="copyright">© {new Date().getFullYear()} BookmyYagna All Rights Reserved.</p>
              <div className="footer-bottom-links">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/termsofservice">Terms of Service</a>
                <a href="/FAQ">FAQ</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;