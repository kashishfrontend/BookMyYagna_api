import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
    },
  },
};

const ScaredBooking = () => {
  return (
    <>
    
      <Helmet>
        {/* Meta Tags */}
        <title>Book puja Online - Sacred puja Services | BookMyYagna</title>
        <meta
          name="description"
          content="Explore and book a variety of sacred puja services online with trusted pandits at BookMyYogna. Convenient, authentic, and affordable rituals."
        />
        <meta
          name="keywords"
          content="book puja online, puja services, online pandit booking, sacred rituals, BookMyYogna"
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Book Sacred puja Services Online | BookMyYogna" />
        <meta
          property="og:description"
          content="Discover authentic puja services at BookMyYogna. Book trusted pandits for your spiritual rituals with ease."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bookmyyogna.onrender.com/puja-list" />
        <meta property="og:image" content="https://bookmyyogna.onrender.com/images/puja-og-image.jpg" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://bookmyyogna.onrender.com/puja-list" />
      </Helmet>
    <section
      style={{ backgroundColor: "#fef9f5", color: "#4b2e2e", marginTop:"80px" }}
      className="py-5"
      id="book-sacred"
    >
      <Container>
        {/* OM Symbol */}
        <div
          className="text-center mb-4"
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <span
            style={{
              fontSize: "2.5rem",
              fontFamily: "serif",
              fontWeight: "bold",
            }}
          >
            ॐ
          </span>
        </div>

        {/* Section Heading */}
        <motion.div
          className="text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
        >
          <h2 className="fw-bold display-6 mb-3" style={{ color: "#4b2e2e" }}>
            Book Your Sacred Ceremony Now & Begin Your{" "}
            <span style={{ color: "#b76e79" }}>Divine Journey ✨</span>
          </h2>
          <p className="lead" style={{ color: "#4b2e2e" }}>
            Welcome to <strong>BookMyYagna</strong> — Your Sacred Connection to
            the Divine 🙏
          </p>
        </motion.div>

        {/* Content Section */}
        <Row className="justify-content-center">
          <Col lg={10}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
            >
              <p className="mb-4 fs-5">
                In the ever-changing journey of life, we often find ourselves
                caught up in the chaos of daily existence. Yet, deep within us
                lies the truth that we are not isolated, but part of a vast,
                interconnected universe. This universe is guided by a divine
                force — an unseen power that nurtures and supports us every step
                of the way.
              </p>

              <p className="mb-4 fs-5">
                Sometimes, in the hustle and bustle of life, we forget this
                connection. But every step we take, every breath we take, is
                part of a greater cosmic design. Through ancient rituals like{" "}
                <strong>Yagna</strong> and <strong>Puja</strong> ceremonies, we
                have the opportunity to realign ourselves with this divine
                energy, purify our souls, and invite blessings into our lives.
              </p>

              <h4
                className="fw-semibold mt-5 mb-3"
                style={{ color: "#b76e79" }}
              >
                Why Yagna & Puja Ceremonies Matter 🌿
              </h4>

              <p className="mb-3 fs-5">
                Yagna (fire rituals) and puja (worship ceremonies) have been
                practiced for thousands of years. These rituals are more than
                just symbolic acts; they are a means of channeling divine energy
                to bless us with peace, health, prosperity, and protection.
              </p>

              <p className="mb-3 fs-5">
                Each chant, each offering, and each gesture is a step toward
                balance and harmony in our lives. When performed with devotion,
                they purify the mind, body, and soul — and cleanse our
                surroundings of negative energy.
              </p>

              <p className="fs-5">
                Through <strong>BookMyYagna</strong>, we ensure that you can
                experience the divine presence — no matter where you are in the
                world.
              </p>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
};

export default ScaredBooking;
