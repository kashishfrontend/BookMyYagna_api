// FaqFooter.js
import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const FaqFooter = () => {
  return (
    <div className="faqs-page mt-5" style={{ backgroundColor: '#f8f9fa', color: '#343a40', padding: '2rem' }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="header-section text-center"
      >
        <h1 style={{ color: '#2d6a4f', fontSize: '2.5rem', fontWeight: '700' }}>Your Questions, Answered with Devotion</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          We understand that booking spiritual rituals online may bring up a few questions. We’re here to guide you through every step of the process. Find quick answers below, or reach out to us for a personal response.
        </p>
      </motion.div>

      {/* FAQs Section */}
      <div className="faqs mt-5">
        {/** FAQ Item **/}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="faq-item mb-4 p-3 rounded"
          style={{ backgroundColor: '#ffffff', border: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
        >
          <h3 className="faq-question" style={{ color: '#1d3557', fontWeight: '600' }}>
            🙏 How do I book a ceremony?
          </h3>
          <p className="faq-answer mt-2" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Booking is seamless and takes just a few minutes:
            <ul>
              <li>Visit our Services Page</li>
              <li>Choose your desired Yagna, Pooja, or Ritual</li>
              <li>Select your preferred date and time</li>
              <li>Proceed with a secure online payment</li>
            </ul>
            You'll receive a confirmation email and WhatsApp message instantly.
          </p>
        </motion.div>

        {/** FAQ Item **/}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="faq-item mb-4 p-3 rounded"
          style={{ backgroundColor: '#ffffff', border: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
        >
          <h3 className="faq-question" style={{ color: '#1d3557', fontWeight: '600' }}>
            🌐 Can I participate in the ceremony remotely?
          </h3>
          <p className="faq-answer mt-2" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            
            . Our platform is designed for spiritual access from anywhere:
            <ul>
              <li><strong>Live Streaming Option:</strong> Join the ceremony in real-time.</li>
              <li><strong>Recorded Video:</strong> If you miss the live session, you can still access the energy and essence anytime, anywhere.</li>
            </ul>
          </p>
        </motion.div>

        {/** FAQ Item **/}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="faq-item mb-4 p-3 rounded"
          style={{ backgroundColor: '#ffffff', border: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
        >
          <h3 className="faq-question" style={{ color: '#1d3557', fontWeight: '600' }}>
            🧘 How do I prepare for the ceremony?
          </h3>
          <p className="faq-answer mt-2" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            We help you create a sacred atmosphere in your space:
            <ul>
              <li>You'll receive a digital preparation guide (PDF/Video).</li>
              <li>Set up your altar, light a diya 🪔, and sit in peace.</li>
              <li>Meditate, chant along, or just stay present to receive divine blessings.</li>
            </ul>
          </p>
        </motion.div>

        {/** FAQ Item **/}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="faq-item mb-4 p-3 rounded"
          style={{ backgroundColor: '#ffffff', border: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
        >
          <h3 className="faq-question" style={{ color: '#1d3557', fontWeight: '600' }}>
            💰 What is the cost of a ceremony?
          </h3>
          <p className="faq-answer mt-2" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Ceremony prices vary based on the type, duration, and complexity:
            <ul>
              <li>All pricing is transparently listed on the Services Page.</li>
              <li>We offer custom packages, monthly devotional bundles, and donation-based options for specific rituals.</li>
            </ul>
          </p>
        </motion.div>

        {/** FAQ Item **/}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="faq-item mb-4 p-3 rounded"
          style={{ backgroundColor: '#ffffff', border: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
        >
          <h3 className="faq-question" style={{ color: '#1d3557', fontWeight: '600' }}>
            📜 Are the Pandits trained and authentic?
          </h3>
          <p className="faq-answer mt-2" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Yes. All our Pandits are:
            <ul>
              <li>Vedic scholars trained in authentic practices.</li>
              <li>Fluent in Sanskrit, Hindi, and English.</li>
              <li>Verified, background-checked, and experienced in global rituals.</li>
            </ul>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FaqFooter;
