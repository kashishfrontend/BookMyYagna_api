import React from 'react';
import { FaRegCheckCircle, FaRegLightbulb } from 'react-icons/fa';

const TermsAndVision = () => {
  return (
    <div style={wrapper}>
      <div style={container}>
        {/* Terms of Service */}
        <section style={card}>
          <div style={sectionHeader}>
            <FaRegCheckCircle color="#f97316" size={22} />
            <h2 style={heading}>Terms of Service Overview</h2>
          </div>
          <ul style={list}>
            <li>📌 Bookings are confirmed only after payment.</li>
            <li>📌 In case of cancellations or rescheduling, refer to our <a href="#" style={link}>Refund Policy</a>.</li>
            <li>📌 We do not guarantee results, as spiritual benefits vary by faith, karma, and timing.</li>
            <li>📌 All Pandits are verified, and rituals are performed as per Vedic standards.</li>
          </ul>
        </section>

        {/* Vision & Mission */}
        <section style={card}>
          <div style={sectionHeader}>
            <FaRegLightbulb color="#f97316" size={22} />
            <h2 style={heading}>Our Vision & Mission — Why We Exist</h2>
          </div>
          <h3 style={subHeading}>A Sacred Initiative to Revive Rituals & Restore Faith</h3>
          <p style={paragraph}>
            The modern world may have moved forward in technology, but our souls crave ancient grounding.
          </p>
          <p style={paragraph}>
            <strong>BookMyYagna</strong> was born out of the need to make spiritual practices accessible, authentic, and global.
          </p>
          <p style={paragraph}>
            Our mission is to bring back the sacred, no matter where you are—through real rituals with real energy.
          </p>
        </section>
      </div>
    </div>
  );
};

// Styles
const wrapper = {
  backgroundColor: '#fff7f0',
  padding: '3rem 1rem',
  fontFamily: 'Poppins, sans-serif',
  color: '#4b2e2e',
  display: 'flex',
  justifyContent: 'center'
};

const container = {
  maxWidth: '1000px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
};

const card = {
  backgroundColor: '#ffffff',
  borderRadius: '1rem',
  padding: '2rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
};

const sectionHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  marginBottom: '1rem'
};

const heading = {
  fontSize: '1.4rem',
  fontWeight: 600,
  margin: 0
};

const subHeading = {
  fontFamily: 'Playfair Display, serif',
  fontSize: '1.3rem',
  fontWeight: 600,
  marginBottom: '1rem'
};

const list = {
  paddingLeft: '1.2rem',
  lineHeight: '1.8',
  fontSize: '1rem'
};

const paragraph = {
  fontSize: '1rem',
  lineHeight: '1.7',
  marginBottom: '1rem'
};

const link = {
  color: '#f97316',
  textDecoration: 'none',
  fontWeight: 500
};

export default TermsAndVision;
