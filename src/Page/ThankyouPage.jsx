import React from 'react';
import { motion } from 'framer-motion';
import { FaOm } from 'react-icons/fa';

const successVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ThankYouPage = () => {
  return (
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
  );
};

export default ThankYouPage;
