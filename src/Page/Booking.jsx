
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaOm, FaRupeeSign } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MainNavbar from "../Components/MainNavbar";
import Footer from "../Components/Footer";
// import "./BookingComponent.css";

const poojaTypes = [
    { id: 1, name: "Satyanarayan Puja", description: "A Hindu ritual performed to seek the blessings of Lord Vishnu", duration: "3 hours", price: 5100 },
    { id: 2, name: "Griha Pravesh", description: "Housewarming ceremony to bless new homes", duration: "4 hours", price: 7500 },
    { id: 3, name: "Ganesh Puja", description: "Ritual to honor Lord Ganesha", duration: "2 hours", price: 3100 },
    { id: 4, name: "Diwali Puja", description: "Special ritual during Diwali festival", duration: "2 hours", price: 3500 },
    { id: 5, name: "Navgraha Shanti", description: "Ritual to appease the nine planets", duration: "3 hours", price: 5500 },
    { id: 6, name: "Rudrabhishek", description: "Sacred ritual to honor Lord Shiva", duration: "4 hours", price: 6100 },
];

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
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
    };

    const successVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.5,
                type: "spring",
                stiffness: 120
            }
        }
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
                        <p>Choose from our wide range of authentic Vedic ceremonies performed by experienced pandits</p>
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
                            <p>Your puja has been scheduled successfully. We have sent all details to your email.</p>
                            <p>May divine blessings be with you.</p>
                            <div className="mandala-animation"></div>
                        </motion.div>
                    ) : (
                        <div className="booking-container">
                            <motion.div
                                className="puja-types "
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <h3 className="text-center">Select Ceremony Type</h3>
                                <div className="puja-cards">
                                    {poojaTypes.map((puja) => (
                                        <motion.div
                                            key={puja.id}
                                            className={`puja-card ${selectedPuja && selectedPuja.id === puja.id ? 'selected' : ''}`}
                                            onClick={() => handlePujaSelection(puja)}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="puja-icon">
                                                <FaOm />
                                            </div>
                                            <h4>{puja.name}</h4>
                                            <p>{puja.description}</p>
                                            <div className="puja-details">
                                                <span><i className="far fa-clock"></i> {puja.duration}</span>
                                                <span><FaRupeeSign /> {puja.price}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="booking-form"
                                variants={formVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <h3>Enter Booking Details</h3>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>
                                            <FaCalendarAlt /> Select Date and Time:
                                        </label>
                                        <DatePicker
                                            selected={selectedDate}
                                            onChange={(date) => setSelectedDate(date)}
                                            showTimeSelect
                                            timeFormat="HH:mm"
                                            timeIntervals={30}
                                            timeCaption="Time"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            placeholderText="Choose an auspicious date"
                                            className="date-picker"
                                            minDate={new Date()}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <FaUsers /> Number of Attendees:
                                        </label>
                                        <div className="people-counter">
                                            <button
                                                type="button"
                                                onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
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
                                    </div>

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
                                        <label>Special Requirements:</label>
                                        <textarea
                                            value={specialRequirements}
                                            onChange={(e) => setSpecialRequirements(e.target.value)}
                                            placeholder="Any special requests or requirements for the ceremony"
                                        ></textarea>
                                    </div>

                                    <motion.div
                                        className="price-quote"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: selectedPuja ? 1 : 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {selectedPuja && (
                                            <>
                                                <h4>Price Quote</h4>
                                                <div className="price-details">
                                                    <div className="price-row">
                                                        <span>{selectedPuja.name}</span>
                                                        <span><FaRupeeSign /> {selectedPuja.price}</span>
                                                    </div>
                                                    <div className="price-row">
                                                        <span>Samagri (Puja Materials)</span>
                                                        <span><FaRupeeSign /> {Math.round(selectedPuja.price * 0.15)}</span>
                                                    </div>
                                                    <div className="price-row">
                                                        <span>Travel Charges</span>
                                                        <span><FaRupeeSign /> 500</span>
                                                    </div>
                                                    <div className="price-row total">
                                                        <span>Total</span>
                                                        <span><FaRupeeSign /> {selectedPuja.price + Math.round(selectedPuja.price * 0.15) + 500}</span>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>

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