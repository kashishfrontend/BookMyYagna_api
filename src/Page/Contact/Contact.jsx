// import React from 'react';
// import {
//   FaEnvelope, FaPhoneAlt, FaWhatsapp,
//   FaInstagram, FaYoutube, FaFacebook, FaTelegram
// } from 'react-icons/fa';

// const Contact = () => {
//   return (
//     <div style={outerWrapper}>
//       <div style={innerWrapper}>
        
//         {/* Header */}
//         <div style={headerSection}>
//           <h2 style={titleStyle}>
//             Contact Us <span style={{ color: '#f97316' }}>/01</span>
//           </h2>
//           <p style={subtitleStyle}>
//             We're here to help with your pooja selections, event bookings, or any questions you have.
//           </p>
//         </div>

//         {/* Contact Cards */}
//         <div style={cardGrid}>
//           <ContactCard
//             icon={<FaEnvelope size={24} color="#f97316" />}
//             title="Email Support"
//             content={
//               <>
//                 <a href="mailto:support@bookmyyagna.com" style={linkStyle}>
//                   support@bookmyyagna.com
//                 </a>
//                 <p>We usually reply within <strong>12–24 hours</strong>.</p>
//               </>
//             }
//           />

//           <ContactCard
//             icon={<FaPhoneAlt size={22} color="#f97316" />}
//             title="Call Us"
//             content={
//               <>
//                 <p><strong>Phone:</strong> +91-123-456-7890</p>
//                 <p>Available daily from <strong>10 AM – 8 PM IST</strong>.</p>
//               </>
//             }
//           />

//           <ContactCard
//             icon={<FaWhatsapp size={22} color="#25d366" />}
//             title="WhatsApp"
//             content={
//               <>
//                 <p><strong>Chat:</strong> +91-987-654-3210</p>
//                 <p>Get real-time pooja recommendations and guidance.</p>
//               </>
//             }
//           />

//           <ContactCard
//             icon={<FaInstagram size={22} color="#d6249f" />}
//             title="Instagram"
//             content={<SocialText label="Follow for rituals & live alerts" />}
//           />
//           <ContactCard
//             icon={<FaYoutube size={22} color="#FF0000" />}
//             title="YouTube"
//             content={<SocialText label="Watch live poojas & stories" />}
//           />
//           <ContactCard
//             icon={<FaFacebook size={22} color="#1877f2" />}
//             title="Facebook"
//             content={<SocialText label="Community events & bhajans" />}
//           />
//           <ContactCard
//             icon={<FaTelegram size={22} color="#0088cc" />}
//             title="Telegram"
//             content={<SocialText label="Join satsang groups & daily mantras" />}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Reusable Contact Card
// const ContactCard = ({ icon, title, content }) => (
//   <div style={cardStyle}>
//     <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
//       {icon}
//       <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>{title}</h4>
//     </div>
//     <div style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{content}</div>
//   </div>
// );

// // Social Content
// const SocialText = ({ label }) => (
//   <p style={{ margin: 0 }}>{label}</p>
// );

// // Styles
// const outerWrapper = {
//   backgroundColor: '#fff7f0',
//   padding: '3rem 1rem',
//   fontFamily: 'Poppins, sans-serif',
//   color: '#4b2e2e',
//   display: 'flex',
//   justifyContent: 'center'
// };

// const innerWrapper = {
//   maxWidth: '1100px',
//   width: '100%',
//   backgroundColor: '#ffffff',
//   borderRadius: '1rem',
//   padding: '2.5rem',
//   boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
// };

// const headerSection = {
//   marginBottom: '2.5rem',
//   textAlign: 'center'
// };

// const titleStyle = {
//   fontFamily: 'Playfair Display, serif',
//   fontSize: '2.4rem',
//   fontWeight: 'bold',
//   borderBottom: '3px solid #f97316',
//   display: 'inline-block',
//   paddingBottom: '0.5rem',
//   marginBottom: '0.8rem'
// };

// const subtitleStyle = {
//   fontSize: '1rem',
//   maxWidth: '600px',
//   margin: '0 auto',
//   lineHeight: '1.6'
// };

// const cardGrid = {
//   display: 'grid',
//   gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//   gap: '1.5rem'
// };

// const cardStyle = {
//   border: '1px solid #f0e6de',
//   padding: '1.5rem',
//   borderRadius: '1rem',
//   backgroundColor: '#fff',
//   boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
//   transition: '0.3s ease',
//   cursor: 'default'
// };

// const linkStyle = {
//   color: '#f97316',
//   textDecoration: 'none',
//   fontWeight: 500
// };

// export default Contact;

import React from 'react';
import {
  FaEnvelope, FaPhoneAlt, FaWhatsapp,
  FaInstagram, FaYoutube, FaFacebook, FaTelegram
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container py-5 bg-light">
      <div className="text-center mb-5">
        <h2 className="fw-bold border-bottom d-inline-block pb-2 mb-3 "  style={{marginTop:"90px"}}>
          Contact Us <span className="text-warning">/01</span>
        </h2>
        <p className="text-muted " >
          We're here to help with your pooja selections, event bookings, or any questions you have.
        </p>
      </div>

      <div className="row g-4 py-5">
        <ContactCard
          icon={<FaEnvelope size={20} className="text-warning" />}
          title="Email Support"
          content={
            <>
              <a href="mailto:support@bookmyyagna.com" className="text-decoration-none text-warning fw-semibold">
                support@bookmyyagna.com
              </a>
              <p className="mb-0">We usually reply within <strong>12–24 hours</strong>.</p>
            </>
          }
        />

        <ContactCard
          icon={<FaPhoneAlt size={18} className="text-warning" />}
          title="Call Us"
          content={
            <>
              <p className="mb-1"><strong>Phone:</strong> +91-123-456-7890</p>
              <p className="mb-0">Available daily from <strong>10 AM – 8 PM IST</strong>.</p>
            </>
          }
        />

        <ContactCard
          icon={<FaWhatsapp size={20} className="text-success" />}
          title="WhatsApp"
          content={
            <>
              <p className="mb-1"><strong>Chat:</strong> +91-987-654-3210</p>
              <p className="mb-0">Get real-time pooja recommendations and guidance.</p>
            </>
          }
        />

        <ContactCard
          icon={<FaInstagram size={20} className="text-danger" />}
          title="Instagram"
          content="Follow for rituals & live alerts"
        />

        <ContactCard
          icon={<FaYoutube size={20} className="text-danger" />}
          title="YouTube"
          content="Watch live poojas & stories"
        />

        <ContactCard
          icon={<FaFacebook size={20} className="text-primary" />}
          title="Facebook"
          content="Community events & bhajans"
        />

        <ContactCard
          icon={<FaTelegram size={20} className="text-info" />}
          title="Telegram"
          content="Join satsang groups & daily mantras"
        />
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, content }) => (
  <div className="col-md-6 col-lg-4">
    <div className="card h-100 shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          {icon}
          <h5 className="mb-0 ms-2 fw-semibold">{title}</h5>
        </div>
        <div className="text-muted small">
          {typeof content === "string" ? <p className="mb-0">{content}</p> : content}
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
