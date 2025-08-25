
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Breadcrumb,
  Accordion,
} from "react-bootstrap";
import { FaStar, FaCheck, FaChevronRight } from "react-icons/fa";
import { FiShield, FiAward, FiClock, FiUsers, FiCheck } from "react-icons/fi";
import {
  GiFlowerPot,
  GiLotus,
  GiTripleYin,
  GiMeditation,
  GiPrayerBeads,
  GiOmega,
} from "react-icons/gi";
import { RiShieldStarLine, RiMentalHealthLine } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/css/PoojaBookingDetails.css";
import img from "../assets/img/bookingDetailsImg.webp";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const PoojaBookingDetails = () => {
  const [poojaData, setPoojaData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { poojaId } = location.state || {};
  const [selectedPackage, setSelectedPackage] = useState(null);

  console.log("pooja id", poojaId);

  useEffect(() => {
    AOS.init({
      duration: 300,
      offset: 10,
      once: false,
      mirror: true,
    });
  }, []);

  const handleBookNow = () => {
    if (selectedPackage !== null && poojaData?.poojaPlans[selectedPackage]) {
      const selectedPlanId = poojaData.poojaPlans[selectedPackage]._id;
      navigate("/booking", { state: { poojaId, selectedPlanId } });
    } else {
      alert("Please select a package before booking.");
    }
  };

  const faqs = [
    {
      question: "Can I offer items to Pandit Ji after the Puja?",
      answer:
        "Yes, you can offer Dakshina and other items to the Pandit Ji after the completion of the puja as a token of respect and gratitude.",
    },
    {
      question:
        "What if I am not able to arrange some of the items under the Home Preparation List?",
      answer:
        "Don't worry! Our Pandits come prepared with essential items. However, if you need any specific items to be arranged by us, please mention during booking and we can arrange them for an additional cost.",
    },
    {
      question: "Can I pay partial amount at the time of booking?",
      answer:
        "Yes, you can pay a 50% advance amount to confirm your booking and the remaining amount can be paid on the day of the ceremony.",
    },
    {
      question: "What happens after puja is booked?",
      answer:
        "Once your booking is confirmed, our team will contact you to discuss the details, preferred timing, and any special requirements. Our Pandits will arrive at your place on the scheduled day with all the necessary items.",
    },
  ];

  const benefits = [
    {
      title: "Divine blessings and spiritual growth",
      description: "Enhances your spiritual connection and brings peace of mind.",
      icon: <FiShield className="benefit-icon" />,
    },
    {
      title: "Removal of obstacles and negative energies",
      description: "Helps overcome challenges and clears negative influences.",
      icon: <RiMentalHealthLine className="benefit-icon" />,
    },
    {
      title: "Fulfillment of desires",
      description: "Aids in achieving personal and professional goals.",
      icon: <GiTripleYin className="benefit-icon" />,
    },
    {
      title: "Health and well-being",
      description: "Promotes physical and mental health and longevity.",
      icon: <GiMeditation className="benefit-icon" />,
    },
    {
      title: "Prosperity and happiness",
      description: "Brings abundance and joy to your life.",
      icon: <GiOmega className="benefit-icon" />,
    },
  ];

  useEffect(() => {
    if (poojaId) {
      axios
        .get(`https://bookmyyogna.onrender.com/pooja/getPooja/${poojaId}`)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setPoojaData(response.data.pooja);
          }
        })
        .catch((error) => {
          console.error("Error fetching pooja:", error);
        });
    }
  }, [poojaId]);

  // Log poojaData after it's updated
  useEffect(() => {
    if (poojaData) {
      console.log("Packages Data:", poojaData.poojaPlans);
    }
  }, [poojaData]);

  return (
    <>
      <Helmet>
        {/* Meta Tags */}
        <title>{poojaData?.heading || "Book Pooja Online"} - Sacred Puja Services | BookMyYogna</title>
        <meta
          name="description"
          content={`Explore and book ${poojaData?.heading || "sacred pooja"} services online with trusted pandits at BookMyYogna. Convenient, authentic, and affordable rituals.`}
        />
        <meta
          name="keywords"
          content={`book ${poojaData?.heading || "pooja"} online, ${poojaData?.heading || "pooja"} services, online pandit booking, sacred rituals, BookMyYogna`}
        />
        {/* Open Graph Tags */}
        <meta property="og:title" content={`Book ${poojaData?.heading || "Sacred Pooja"} Services Online | BookMyYogna`} />
        <meta
          property="og:description"
          content={`Discover authentic ${poojaData?.heading || "pooja"} services at BookMyYogna. Book trusted pandits for your spiritual rituals with ease.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bookmyyogna.onrender.com/pooja-list" />
        <meta property="og:image" content={poojaData?.image || "https://bookmyyogna.onrender.com/images/pooja-og-image.jpg"} />
        {/* Canonical URL */}
        <link rel="canonical" href="https://bookmyyogna.onrender.com/pooja-list" />
      </Helmet>

      <div className="pooja-detail-page mt-5" style={{ padding: "20px" }}>
        <Container>
          <Row className="pooja-detail-section mt-5" style={{ padding: "10px" }}>
            <Col lg={5} className="pooja-image-col" data-aos="fade-right">
              <div className="pooja-image-container  d-lg-block">
                <img
                  src={poojaData?.image || img}
                  alt={poojaData?.heading || "Pooja"}
                  className="main-pooja-image"
                />
                <div className="small-image-container">
                  <img
                    src={poojaData?.image || img}
                    alt={poojaData?.heading || "Pooja"}
                    className="small-pooja-image"
                  />
                </div>
              </div>
            </Col>

            <Col lg={7} className="pooja-detail-content" data-aos="fade-left">
              <h1 className="pooja-title">{poojaData?.heading}</h1>

              <div className="rating-container">
                <div className="stars">
                  <p>
                    <strong>{poojaData?.rating || "4.8"} ★</strong> &nbsp; Rated by users
                    based on their pooja experience
                  </p>
                </div>
              </div>

              <div className="pooja-description">
                <p>{poojaData?.description}</p>
              </div>

              <div className="pooja-packages-section">
                <h2 className="section-title" data-aos="fade-up">
                  Pooja Packages
                </h2>

                <Row className="package-cards ">
                  <div className="mobile-scroll d-flex gap-3">
                    {poojaData?.poojaPlans?.map((plan, index) => (
                      <Col md={4} className="col-10" key={index}>
                        <Card
                          className={`package-card ${selectedPackage === index ? "selected" : ""
                            }`}
                          onClick={() => setSelectedPackage(index)}
                        >
                          <Card.Header className="package-header">
                            <h3>{plan.heading}</h3>
                            <h4>₹ {plan.amount}</h4>
                          </Card.Header>
                          <Card.Body>
                            <ul className="package-features">
                              {plan.features.map((feature, fIndex) => (
                                <li key={fIndex}>
                                  <FaCheck className="check-icon" /> {feature}
                                </li>
                              ))}
                            </ul>
                            <div className="package-details">
                              <div className="detail-item">
                                <span>Number of Days</span>
                                <span className="detail-value">
                                  {plan.numberOfDays}
                                </span>
                              </div>
                              <div className="detail-item">
                                <span>Duration</span>
                                <span className="detail-value">
                                  {plan.durationOfPooja}
                                </span>
                              </div>
                            </div>
                          </Card.Body>
                          <Card.Footer>
                            <Button
                              onClick={handleBookNow}
                              className="book-now-btn"
                            >
                              Book Now
                            </Button>
                          </Card.Footer>
                        </Card>
                      </Col>
                    ))}
                  </div>
                </Row>
              </div>
            </Col>
          </Row>

          <Row className="our-promise-section" data-aos="fade-up">
            <Col md={12}>
              <h2 className="section-title">Our Promise</h2>
              <div className="promises-container row d-flex flex-wrap ">
                <div className="col-6 col-md-2">
                  <div
                    className="promise-item  "
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
                    <div className="promise-icon ">
                      <FiUsers />
                    </div>
                    <h4>Experienced Pandits</h4>
                  </div>
                </div>
                <div className="  col-6 col-md-2">
                  <div
                    className="promise-item"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <div className="promise-icon">
                      <FiCheck />
                    </div>
                    <h4>Genuine Ingredients</h4>
                    <h5>Guaranteed</h5>
                  </div>
                </div>
                <div className=" col-6 col-md-2 mt-3 mt-md-0">
                  <div
                    className="promise-item"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                  >
                    <div className="promise-icon">
                      <FiAward />
                    </div>
                    <h4>100% Pure Authentic Rituals</h4>
                  </div>
                </div>
                <div className=" col-6 col-md-2 mt-3 mt-md-0">
                  <div
                    className="promise-item "
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  >
                    <div className="promise-icon">
                      <FiShield />
                    </div>
                    <h4>High Quality Traditional Service</h4>
                  </div>
                </div>
                <div className=" col-6 col-md-2 mt-3 mt-md-0">
                  <div
                    className="promise-item "
                    data-aos="zoom-in"
                    data-aos-delay="500"
                  >
                    <div className="promise-icon">
                      <FiUsers />
                    </div>
                    <h4>Professional and Experienced Pandits</h4>
                  </div>
                </div>
                <div className=" col-6 col-md-2 mt-3 mt-md-0">
                  <div
                    className="promise-item "
                    data-aos="zoom-in"
                    data-aos-delay="600"
                  >
                    <div className="promise-icon">
                      <FiClock />
                    </div>
                    <h4>Timely Completion</h4>
                    <h5>Guaranteed</h5>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className="jaap-info-section">
            <Col md={12}>
              <div className="info-block" data-aos="fade-up">
                <h3>
                  This sacred ritual is known to bring peace, prosperity and spiritual growth to devotees.
                </h3>
                <p>
                  It is highly recommended for individuals seeking divine blessings,
                  facing challenges in life, or wanting to enhance their spiritual journey.
                </p>
              </div>

              {/* <div className="info-block" data-aos="fade-up">
                <h3>How {poojaData?.heading || "the Puja"} is Performed?</h3>
                <p>
                  The {poojaData?.heading || "Puja"} is conducted by expert Vedic Pandits
                  following <strong>authentic rituals as per the scriptures</strong>. The
                  procedure includes:
                </p>
                <ul className="ritual-steps">
                  <li data-aos="fade-right">
                    <strong>Sankalp Puja</strong> - Setting the intention and invoking divine energies.
                  </li>
                  <li data-aos="fade-right" data-aos-delay="100">
                    <strong>Main Rituals</strong> - Performed according to Vedic traditions with proper mantras and offerings.
                  </li>
                  <li data-aos="fade-right" data-aos-delay="200">
                    <strong>Havan (Fire Ceremony)</strong> - Channeling positive energies and seeking divine grace.
                  </li>
                  <li data-aos="fade-right" data-aos-delay="300">
                    <strong>Aarti & Prasad Distribution</strong> - Concluding the ceremony with blessings.
                  </li>
                </ul>
              </div>

              <div className="info-block" data-aos="fade-up">
                <h3>When to Perform {poojaData?.heading || "this Puja"}?</h3>
                <ul className="timing-info">
                  <li data-aos="fade-right">
                    <strong>Auspicious Days</strong> - Based on the Hindu calendar and planetary positions.
                  </li>
                  <li data-aos="fade-right" data-aos-delay="100">
                    <strong>Festivals</strong> - During relevant religious festivals for enhanced benefits.
                  </li>
                  <li data-aos="fade-right" data-aos-delay="200">
                    <strong>Personal Auspicious Dates</strong> - Chosen based on the devotee's birth chart.
                  </li>
                </ul>
              </div> */}
            </Col>
          </Row>

          {poojaData?.benefitsOfPooja && (
            <Row className="benefits-section">
              <Col md={12}>
                <h2 className="section-title" data-aos="fade-up">
                  Benefits of {poojaData?.heading || "this Puja"}
                </h2>
                <div className="benefits-container">
                  {poojaData.benefitsOfPooja.map((benefit, index) => (
                    <div
                      className="benefit-item"
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="benefit-icon-container">🌟</div>
                      <div className="benefit-content">
                        <p>{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          )}

          <Row className="cta-section" data-aos="fade-up">
            <Col md={12}>
              <div className="cta-box">
                <h3>Book {poojaData?.heading || "a Sacred Puja"}</h3>
                <p>
                  Perform {poojaData?.heading || "this sacred ritual"} with the guidance of expert
                  Vedic Pandits for divine blessings and spiritual growth.
                </p>
                <Button className="book-now-btn" onClick={handleBookNow}>
                  Book your {poojaData?.heading || "Puja"} today!
                </Button>
              </div>
            </Col>
          </Row>

          <Row className="faq-section">
            <Col md={12}>
              <h2 className="section-title" data-aos="fade-up">
                FAQ (Frequently Asked Questions)
              </h2>
              <Accordion
                defaultActiveKey="0"
                className="faq-accordion"
                data-aos="fade-up"
              >
                {faqs.map((faq, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>
                      <div className="faq-question">{faq.question}</div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>{faq.answer}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>

      
        </Container>
      </div>
    </>
  );
};

export default PoojaBookingDetails;
