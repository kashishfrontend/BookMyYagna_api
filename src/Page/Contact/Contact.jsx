import React, { useState } from "react";
import {
  FaCheckCircle
} from "react-icons/fa";
import "../../assets/css/contactus.css";

const Contact = () => {
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
            required
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
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
