import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope,
  FaMapMarkerAlt, FaOm, FaPrayingHands, FaLinkedinIn, FaTelegramPlane
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from '../Api/axios/axios_config'
import toast from 'react-hot-toast';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please enter an email address.");
      return;
    }

    try {
      const response = await axios.post("/newsletter/subscribe", { email });

      if (response.status === 200) {
        toast.success("🎉 Thank you for subscribing to Book My Yagna!");
        setEmail("");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info("📩 This email is already subscribed.");
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }
    }
  };
  return (
    <footer className="footer-section" style={{ backgroundImage: "#e3e3e3" }}>
      <div className="footer-top">
        <div className="container-fluid">
          <div className="row">

            {/* LOGO + ABOUT */}
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0 footer-info" style={{ padding: "10px 50px" }}>
              <Link
                to="/"

                style={{ textDecoration: 'none', color: 'inherit' }}
                title="Scroll to Top"
              >
                <div
                  className="footer-logo d-flex align-content-center justify-content-center"
                  style={{ cursor: 'pointer' }}
                >
                  <FaOm className="om-icon" />
                  <h3 className="ms-2">BookmyYagna</h3>
                </div>
              </Link>
              <p>
                <strong>BookMyYagna</strong> connects devotees with verified Vedic pandits for authentic Hindu rituals, pujas, and spiritual ceremonies.
                Book online and experience peace, prosperity, and divine blessings at your doorstep.
              </p>

              <div className="social-links row">
                <div className="d-flex justify-content-center col-12 gap-3">
                  <a href="https://www.facebook.com/people/Book-My-Yagna/61576241761744/" target="_blank" rel="noopener noreferrer" className="social-icon p-2"><FaFacebookF /></a>
                  <a href="https://www.instagram.com/bookmyyagna/" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
                  <a href="https://www.youtube.com/@BookMyYagna" target="_blank" rel="noopener noreferrer" className="social-icon"><FaYoutube /></a>
                  <a href="https://www.linkedin.com/in/bookmyyagna" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedinIn /></a>
                  <a href="https://t.me/bookmyyagna" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTelegramPlane /></a>
                </div>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0 footer-links mt-0 mt-md-3">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/about-us'}>About Us</Link></li>
                <li><Link to={'/listofpuja'}>Services</Link></li>
                <li><Link to={'/gallery'}>Gallery</Link></li>
                <li><Link to={'/contact'}>Contact</Link></li>
                <li><Link to={'/faq'}>FAQ</Link></li>
              </ul>
            </div>

            {/* SERVICES */}
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0 footer-services mt-0 mt-md-3">
              <h4>Our Services</h4>
              <ul>
                <li><Link to={"/listofpuja"}><FaPrayingHands className="service-icon" /> Ganesh Puja</Link></li>
                <li><Link to={"/listofpuja"}><FaPrayingHands className="service-icon" /> Navagraha Pooja</Link></li>
                <li><Link to={"/listofpuja"}><FaPrayingHands className="service-icon" /> Lakshmi Pooja</Link></li>
                <li><Link to={"/listofpuja"}><FaPrayingHands className="service-icon" /> RudraAbhishek Pooja</Link></li>
              </ul>
            </div>

            {/* CONTACT + NEWSLETTER */}
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0 footer-contact mt-0 mt-md-3">
              <h4>Contact Us</h4>
              <div className="contact-info">
                {/* <p><FaMapMarkerAlt className="contact-icon me-2" />Prem Plaza, 252, Opp. Subhash Park,<br />Subhash Nagar, Rohtak, Haryana - 124001</p> */}
                <p><FaPhoneAlt className="contact-icon me-2" />+91 8569977705</p>
                <p><FaEnvelope className="contact-icon me-2" />bookmyyagna@gmail.com</p>
              </div>

              <div className="newsletter mt-4">
                <h5 className="mb-1">Subscribe to our Newsletter</h5>
                <p className="small text-muted mb-2">
                  Stay updated on auspicious muhurats, Vedic tips & festival discounts.
                </p>
                <form className="d-flex flex-column flex-sm-row gap-2" onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button type="submit" className="btn text-white px-3" style={{ backgroundColor: "#FF7722" }}>
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div>

            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-mandala"></div>
              <p className="copyright">
                © {new Date().getFullYear()} BookmyYagna – A Product of{" "}
                <a
                  href="https://innovizetechsolution.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.target.style.color = 'blue')}
                  onMouseLeave={e => (e.target.style.color = 'inherit')}
                >
                  Innovize Tech Solutions Pvt. Ltd.
                </a>
              </p>

              <div className="footer-bottom-links">
                <Link to={"/privacy-policy"}>Privacy Policy</Link>
                <Link to={"/termsofservice"}>Terms of Service</Link>
                <Link to={"/shippingAndDelivery"}>Shipping and delivery</Link>
                <Link to={"/cancellationAndRefund"}>Cancellation and refund</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};
export default Footer;
