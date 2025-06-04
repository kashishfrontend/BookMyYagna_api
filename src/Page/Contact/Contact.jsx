
import React from 'react';
import {
  FaEnvelope, FaPhoneAlt, FaWhatsapp,
  FaInstagram, FaYoutube, FaFacebook, FaTelegram
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="container py-5 ">
      <div className="text-center mb-5">
        <h2 className="fw-bold border-bottom d-inline-block pb-2 mb-3 " style={{ marginTop: "90px" }}>
          Contact Us <span className="text-warning">/01</span>
        </h2>
        <p className="text-muted " >
          We're here to help with your pooja selections, event bookings, or any questions you have.
        </p>
      </div>

      <div className="row g-4 py-5">
        <div className='col-md-4'>
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
        </div>
        <div className='col-md-4'>
          <ContactCard
            icon={<FaPhoneAlt size={18} className="text-warning" />}
            title="Call Us"
            content={
              <>
                <p className="mb-1"><strong>Phone:</strong> +91 8569977750

                </p>
                <p className="mb-0">Available daily from <strong>10 AM – 8 PM IST</strong>.</p>
              </>
            }
          />
        </div>
        <div className='col-md-4 '>
          <ContactCard
            icon={<FaWhatsapp size={20} className="text-success" />}
            title="WhatsApp"
            content={
              <>
                <p className="mb-1"><strong>Chat:</strong> +91 8569977750

                </p>
                <p className="mb-0">Get real-time pooja recommendations and guidance.</p>
              </>
            }
          />
        </div>
        {/* Social Media Cards */}
        <div className="col-md-6 col-lg-4">
          <a href="https://www.instagram.com/bookmyyagna/" target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
            <ContactCard
              icon={<FaInstagram size={20} className="text-danger" />}
              title="Instagram"
              content="Follow for rituals & live alerts"
            />
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href="https://www.youtube.com/@BookMyYagna" target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
            <ContactCard
              icon={<FaYoutube size={20} className="text-danger" />}
              title="YouTube"
              content="Watch live poojas & stories"
            />
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href="https://www.facebook.com/bookmyyagna" target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100">
            <ContactCard
              icon={<FaFacebook size={20} className="text-primary" />}
              title="Facebook"
              content="Community events & bhajans"
            />
          </a>
        </div>

        <div className="col-md-6 col-lg-4">
          <a href="https://t.me/bookmyyagna" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
            <ContactCard
              icon={<FaTelegram size={20} className="text-info" />}
              title="Telegram"
              content="Join satsang groups & daily mantras"
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
