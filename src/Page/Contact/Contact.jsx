import React from 'react';
import {
  FaEnvelope, FaPhoneAlt, FaWhatsapp,
  FaInstagram, FaYoutube, FaFacebook, FaTelegram
} from 'react-icons/fa';

const Contact = () => {
  // WhatsApp URL
  const whatsappUrl = "https://wa.me/918569977750";
  
  // Social media URLs
  const socialLinks = {
    instagram: "https://www.instagram.com/bookmyyagna/",
    youtube: "https://www.youtube.com/@BookMyYagna",
    facebook: "https://www.facebook.com/bookmyyagna",
    telegram: "https://t.me/bookmyyagna"
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold border-bottom d-inline-block pb-2 mb-3" style={{ marginTop: "90px" }}>
          Contact BookMyYagna – We're Here to Help
        </h2>
        <p className="text-muted">
          Get in touch for puja bookings, event queries, or spiritual guidance.
        </p>
      </div>

      <div className="row g-4 py-5">
        {/* Email Card */}
        <div className='col-md-4'>
          <ContactCard
            icon={<FaEnvelope size={20} className="text-warning" />}
            title="Email"
            content={
              <>
                <a href="mailto:support@bookmyyagna.com" className="text-decoration-none text-warning fw-semibold">
                  support@bookmyyagna.com
                </a>
                <p className="mb-0">Response within 12–24 hours</p>
              </>
            }
          />
        </div>

        {/* Phone Card */}
        <div className='col-md-4'>
          <ContactCard
            icon={<FaPhoneAlt size={18} className="text-warning" />}
            title="Call Us"
            content={
              <>
                <p className="mb-1"><strong>Phone:</strong> +91 8569977750</p>
                <p className="mb-0">10 AM – 8 PM IST (Daily)</p>
              </>
            }
          />
        </div>

        {/* WhatsApp Card */}
        <div className='col-md-4'>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            <ContactCard
              icon={<FaWhatsapp size={20} className="text-success" />}
              title="WhatsApp"
              content={
                <>
                  <p className="mb-1"><strong>Chat:</strong> +91 8569977750</p>
                  <p className="mb-0">Instant help with puja recommendations & bookings</p>
                </>
              }
            />
          </a>
        </div>

        {/* Social Media Cards with their actual links */}
        <div className="col-md-6 col-lg-4">
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
            <ContactCard
              icon={<FaInstagram size={20} className="text-danger" />}
              title="Instagram"
              content="Ritual clips & live alerts"
            />
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
            <ContactCard
              icon={<FaYoutube size={20} className="text-danger" />}
              title="YouTube"
              content="Watch live pujas & stories"
            />
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
            <ContactCard
              icon={<FaFacebook size={20} className="text-primary" />}
              title="Facebook"
              content="Events & bhajan updates"
            />
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            <ContactCard
              icon={<FaTelegram size={20} className="text-info" />}
              title="Telegram"
              content="Daily mantras & satsang invites"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ icon, title, content }) => (
  <div className="">
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