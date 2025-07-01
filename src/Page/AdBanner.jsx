import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AdBanner = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    {
      heading: "🌟 A Spiritual Reminder: Life is a Journey, and So is Devotion 🌟",
      content: "Yagna is not just about rituals. It's about devotion, gratitude, and seeking balance. By booking a Yagna or puja, you're aligning with the universe's rhythm, healing your soul, and inviting prosperity into your life."
    },
    {
      heading: "🕉️ Connect with the Divine Through Sacred Rituals 🕉️",
      content: "Every puja is an opportunity to connect with the divine energy within and around you. Book a sacred ceremony today to purify your surroundings and bring peace to your mind."
    },
    {
      heading: "🙏 The Power of puja: Transform Your Life with Faith 🙏",
      content: "Ancient Vedic rituals have the power to remove obstacles and bring positive energy into your life. Experience the transformative power of authentic Yagnas performed by learned priests."
    },
    {
      heading: "🔥 Ignite Your Spiritual Journey with Sacred Fire Rituals 🔥",
      content: "The sacred fire of Yagna carries your prayers to the divine. Participate in these powerful Vedic ceremonies to manifest your desires and cleanse your karma."
    },
    {
      heading: "🌺 Bless Your Home with Divine Energy and Protection 🌺",
      content: "Regular pujas create a shield of positive energy around your home and family. Book a house blessing ceremony to invite divine protection and harmony."
    },
    {
      heading: "💫 Remove Negative Energy with Powerful Vedic Ceremonies 💫",
      content: "Feeling stuck or facing repeated challenges? Special Yagnas can help remove negative energies and planetary afflictions that may be blocking your progress."
    },
    {
      heading: "🌿 Purify Your Soul with Ancient Vedic Wisdom 🌿",
      content: "The Vedas contain profound rituals for every aspect of life. From health to prosperity to spiritual growth, discover the right puja for your needs today."
    }
  ];

  useEffect(() => {
    // Select a random message when component mounts
    setCurrentMessage(Math.floor(Math.random() * messages.length));
    
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
          className="position-fixed bottom-0 start-0 end-0 m-3 p-4 text-white rounded-4 shadow-lg zindex-tooltip"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={bannerVariants}
          transition={{ duration: 0.5 }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="fw-bold mb-2">
                {messages[currentMessage].heading}
              </h5>
              <p className="mb-2">
                {messages[currentMessage].content}
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