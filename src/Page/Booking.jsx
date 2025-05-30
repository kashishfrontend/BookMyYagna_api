import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaOm,
  FaRupeeSign,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainNavbar from "../Components/MainNavbar";
import Footer from "../Components/Footer";
import gf from "../assets/img/pandit-1.jpeg";

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(5);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequirements, setSpecialRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [type, setType] = useState('');
  const handlePujaSelection = (puja) => {
    setSelectedPuja(puja);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedDate(null);
        setSelectedPuja(null);
        setNumberOfPeople(5);
        setAddress("");
        setName("");
        setPhone("");
        setEmail("");
        setSpecialRequirements("");
      }, 3000);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <>
      <div className="booking-section mt-5">
        <div className="container">
          <motion.div
            className="booking-header"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Book Your Sacred Ceremony</h2>
            <div className="ornament-line ">
              <span className="om-symbol">ॐ</span>
            </div>
            <p>
              Choose from our wide range of authentic Vedic ceremonies performed
              by experienced pandits
            </p>
          </motion.div>

          {isSuccess ? (
            <motion.div
              className="booking-success"
              variants={successVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="success-icon">
                <FaOm />
              </div>
              <h3>Booking Confirmed!</h3>
              <p>
                Your puja has been scheduled successfully. We have sent all
                details to your email.
              </p>
              <p>May divine blessings be with you.</p>
              <div className="mandala-animation"></div>
            </motion.div>
          ) : (
            <div className="booking-container">
              <motion.div
                className="booking-form "
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "23px",
                      color: "#FF8000",
                      fontWeight: "600",
                    }}
                  >
                    Your Selected Puja
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: " center",
                      alignItems: "center",
                    }}
                  >
                    <img src={gf} style={{ width: "95%" }} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "23px",
                        color: "#FF8000",
                        fontWeight: "600",
                      }}
                    >
                      Heading
                    </div>
                    <div style={{ fontSize: "20px" }}>Sub Heading</div>
                    <div>Rating:- 10</div>
                    <div>
                      <h6>Benifites</h6>
                      <ul>
                        <li>Fast</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="booking-form"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <h3>Enter Booking Details</h3>
                <div>
                  <div>
                    <div style={{ fontSize: "20px", fontWeight: "600" }}>
                      Plan Details
                    </div>
                    <div>Heading</div>

                    <div>Amount</div>
                    <div>
                      <h6>Benifites</h6>
                      <ul>
                        <li>Fast</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>

                  {/* <div className="form-group">
                    <label>
                      <FaUsers /> Number of Attendees:
                    </label>
                    <div className="people-counter">
                      <button
                        type="button"
                        onClick={() =>
                          setNumberOfPeople(Math.max(1, numberOfPeople - 1))
                        }
                        className="counter-btn"
                      >
                        -
                      </button>
                      <span>{numberOfPeople}</span>
                      <button
                        type="button"
                        onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                        className="counter-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      <FaMapMarkerAlt /> Venue Address:
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter the complete address where you want the ceremony to be performed"
                      required
                    ></textarea>
                  </div> */}

                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name:</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number:</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your contact number"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div className="form-group">
  <label>Select Type:</label>
  <select
    value={type}
    onChange={(e) => setType(e.target.value)}
    required
  >
    <option value="">Select type</option>
    <option value="online">Online</option>
    <option value="offline">Offline</option>
  </select>
</div>


                  <div className="form-group">
                    <label>Address:</label>
                    <textarea
                      value={specialRequirements}
                      onChange={(e) => setSpecialRequirements(e.target.value)}
                      placeholder="Any special requests or requirements for the ceremony"
                    ></textarea>
                  </div>

                 
                  <motion.button
                    type="submit"
                    className="book-now-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={!selectedPuja || !selectedDate || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="loader"></span>
                    ) : (
                      "Book Now"
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          )}
        </div>

        <div className="decorative-elements">
          <div className="floating-element elem-1"></div>
          <div className="floating-element elem-2"></div>
          <div className="floating-element elem-3"></div>
        </div>
      </div>
    </>
  );
};

export default Booking;
