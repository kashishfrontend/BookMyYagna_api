import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(false), 5000); // Auto-hide after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  const bannerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          style={{
            backgroundColor: 'rgb(164 65 27 / 95%)',
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            zIndex: '10',
          }}
          className="position-fixed bottom-0 start-0 end-0 m-3 p-4  text-white rounded-4 shadow-lg zindex-tooltip"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bannerVariants}
          transition={{ duration: 0.5 }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="fw-bold mb-2">
                🌟 A Spiritual Reminder: Life is a Journey, and So is Devotion 🌟
              </h5>
              <p className="mb-2">
                Yagna is not just about rituals. It’s about devotion, gratitude, and seeking balance.
                By booking a Yagna or Pooja, you’re aligning with the universe's rhythm, healing your soul,
                and inviting prosperity into your life.
              </p>
              <Link to="/scaredbooking">
                <button className="btn btn-warning fw-bold rounded-pill">
                  Book Now
                </button>
              </Link>

            </div>
            <button
              type="button"
              className="btn-close btn-close-white ms-3"
              onClick={() => setShowBanner(false)}
              aria-label="Close"
            ></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdBanner;
