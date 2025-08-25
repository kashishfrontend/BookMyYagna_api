import React from 'react';
import { motion } from 'framer-motion';
import { FaTimesCircle } from 'react-icons/fa';
import '../Page/BookingPage/thankyou.css'
const failedVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const PaymentFailedPage = () => {
  return (
    <motion.div
      className="booking-success failed"
      
      variants={failedVariants}
      initial="hidden"

      animate="visible"
    >
      <div className="success-icon failed-icon">
        <FaTimesCircle />
      </div>
      <h3>Booking Failed!</h3>
      <p>Unfortunately, something went wrong while scheduling your puja.</p>
      <p>Please try again or contact support if the issue persists.</p>
      <div className="mandala-animation"></div>
    </motion.div>
  );
};

export default PaymentFailedPage;
