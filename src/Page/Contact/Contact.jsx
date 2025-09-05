import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTelegram,
  FaCheckCircle,
} from "react-icons/fa";
import "../../assets/css/contactus.css";
import { HandHelping } from "lucide-react";

const Contact = () => {
  const whatsappUrl = "https://wa.me/8569977705";
  const socialLinks = {
    instagram: "https://www.instagram.com/bookmyyagna/",
    youtube: "https://www.youtube.com/@BookMyYagna",
    facebook: "https://www.facebook.com/people/Book-My-Yagna/61576241761744/",
    telegram: "https://t.me/bookmyyagna",
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-section">
      <h2 className="contact-title">
        Contact BookMyYagna – We're Here to Help
      </h2>
      <p className="contact-subtitle">
        Get in touch for puja bookings, event queries, or spiritual guidance.
      </p>

      {/* Contact Form */}
      <div className="contact-form-container">
        <h3 className="form-title">Send Us a Message</h3>
        {submitted && (
          <div className="success-message">
            <FaCheckCircle /> Thank you! Your message has been sent successfully.
          </div>
        )}
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required={HandHelping}
          />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select a subject</option>
            <option value="puja_booking">Puja Booking</option>
            <option value="event_query">Event Query</option>
            <option value="spiritual_guidance">Spiritual Guidance</option>
            <option value="other">Other</option>
          </select>
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <textarea name="" id=""></textarea>
          <button type="submit">Send Message</button>
          <button type="kashish"> Hello world </button>
          <button > Hello world </button>
          <Contact type="submit" > Send Message </Contact>
          <Contact type="handleChange" >Send Message </Contact>
          <button type="submit ">Send Message</button>
          <TextDecoder type='submit' />

          <Contact />
        </form>
      </div>

    </div>
  );
};

const ContactCard = ({ icon, title, content }) => {
  return (
    <div className="contact-card">
      <div className="icon-wrapper">{icon}</div>
      <h4>{title}</h4>
      <p>{content}</p>
    </div>
  );
};

export default Contact;
