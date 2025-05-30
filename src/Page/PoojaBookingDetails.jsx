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
import img from "../assets/img/bookingDetailsImg.jpeg";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const PoojaBookingDetails = () => {
  // const [selectedPackage, setSelectedPackage] = useState('standard');
  // const [poojadata, setpoojadata] = useState([]);
  const [poojaData, setPoojaData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { poojaId } = location.state || {};
  const [selectedPackage, setSelectedPackage] = useState(null);

  console.log("pooja id", poojaId);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  const handleBookNow = () => {
    navigate("/booking", { state: { poojaId } });
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
      title: "Protection from untimely and unnatural death",
      description: "Removes fears, accidents, and dangers.",
      icon: <FiShield className="benefit-icon" />,
    },
    {
      title: "Relief from major health issues",
      description: "Aids in healing chronic illnesses and diseases.",
      icon: <RiMentalHealthLine className="benefit-icon" />,
    },
    {
      title: "Removes Kaal Sarp Dosh & other planetary afflictions",
      description: "Reduces the negative impact of malefic planets.",
      icon: <GiTripleYin className="benefit-icon" />,
    },
    {
      title: "Spiritual Growth & Mental Peace",
      description:
        "Increases divine energy, removes past karma, and provides clarity in life.",
      icon: <GiTripleYin className="benefit-icon" />,
    },
    {
      title: "Blessings of Lord Shiva",
      description: "Brings prosperity, happiness, and success.",
      icon: <GiOmega className="benefit-icon" />,
    },
  ];

  //  const packages = {
  //         basic: {
  //             name: 'Basic',
  //             price: '₹ 5,100',
  //             features: [
  //                 'Pandit ji (1 pandits)',
  //                 'All Havan Items',
  //                 'All Puja Items',
  //                 'Flowers',
  //                 'Fruits',
  //                 'Hawan Kunda',
  //                 'Maha mantra chantings',
  //                 'Pandit Ji Travel Charges'
  //             ],
  //             days: 1,
  //             hours: 3
  //         },
  //         standard: {
  //             name: 'Standard',
  //             price: '₹ 10,400',
  //             features: [
  //                 'Pandit ji (2 pandits)',
  //                 'All Havan Items',
  //                 'All Puja Items',
  //                 'Flowers',
  //                 'Fruits',
  //                 'Hawan Kunda',
  //                 'Maha mantra chantings',
  //                 'Pandit Ji Travel Charges'
  //             ],
  //             days: 3,
  //             hours: 5
  //         },
  //         premium: {
  //             name: 'Premium',
  //             price: '₹ 15,000',
  //             features: [
  //                 'Pandit ji (3 pandits)',
  //                 'All Havan Items',
  //                 'All Puja Items',
  //                 'Flowers',
  //                 'Fruits',
  //                 'Hawan Kunda',
  //                 'Maha mantra chantings',
  //                 'Pandit Ji Travel Charges'
  //             ],
  //             days: 7,
  //             hours: 5
  //         }
  //     };

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
    <div className="pooja-detail-page mt-5" style={{ padding: "20px" }}>
      <Container>
        <Row className="pooja-detail-section mt-5" style={{ padding: "10px" }}>
          <Col lg={5} className="pooja-image-col" data-aos="fade-right">
            <div className="pooja-image-container  position-sticky">
              <img
                src={poojaData?.image || img}
                alt="Maha Mrityunjaya Jaap"
                className="main-pooja-image"
              />
              <div className="small-image-container">
                <img src={img} alt="Shiva" className="small-pooja-image" />
              </div>
            </div>
          </Col>

          <Col lg={7} className="pooja-detail-content" data-aos="fade-left">
            {/* <h1 className="pooja-title">{poojadata.heading}</h1> */}
            <h1 className="pooja-title">{poojaData?.heading}</h1>

            <div className="rating-container">
              <div className="stars">
                <p>{poojaData?.rating}</p>
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
                  {/* {poojaData?.plans?.map((pkg, index) => ( */}
                  {poojaData?.poojaPlans?.map((plan, index) => (
                    <Col md={4} className="col-10" key={index}>
                      <Card
                        className={`package-card ${
                          selectedPackage === index ? "selected" : ""
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
                          <div className="know-more">
                            <a href="#">
                              Know More{" "}
                              <FaChevronRight className="arrow-icon" />
                            </a>
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

              <div className="custom-package" data-aos="fade-up">
                <p>
                  Looking for a custom package? Click here to plan your perfect
                  pooja experience:
                </p>
                <Button variant="outline-primary" className="get-quote-btn">
                  Get a Quote
                </Button>
              </div>
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
                This Jaap is known to rejuvenate the mind and body, remove
                karmic doshas, and enhance longevity.
              </h3>
              <p>
                It is highly recommended for individuals facing health issues,
                prolonged suffering, or dangers related to planetary doshaa such
                as <strong>Kaal Sarp Dosh</strong>.
              </p>
            </div>

            <div className="info-block" data-aos="fade-up">
              <h3>How Maha Mrityunjaya Jaap is Performed?</h3>
              <p>
                The Maha Mrityunjaya Jaap is conducted by expert Vedic Pandits
                following{" "}
                <strong>authentic rituals as per the scriptures</strong>. The
                procedure includes:
              </p>
              <ul className="ritual-steps">
                <li data-aos="fade-right">
                  <strong>Sankalp Puja & Kalash Naivedyam Puja</strong> - To
                  remove obstacles and invoke divine energy.
                </li>
                <li data-aos="fade-right" data-aos-delay="100">
                  <strong>Chanting of Maha Mrityunjaya Mantra</strong> - A set
                  number of <strong>Jaap counts</strong> (e.g., 1,008, 5,000,
                  10,000, 54,000, or 1,25,000).
                </li>
                <li data-aos="fade-right" data-aos-delay="200">
                  <strong>Havan (Fire Ceremony)</strong> - Performed at the end
                  to channel positive energies and seek Lord Shiva's grace.
                </li>
              </ul>
            </div>

            <div className="info-block" data-aos="fade-up">
              <h3>When to Perform Maha Mrityunjaya Jaap?</h3>
              <ul className="timing-info">
                <li data-aos="fade-right">
                  <strong>Shravan or Kartik Month</strong> - The most auspicious
                  time dedicated to Lord Shiva.
                </li>
                <li data-aos="fade-right" data-aos-delay="100">
                  <strong>Mondays</strong> - Considered sacred for worshipping
                  Lord Shiva.
                </li>
                <li data-aos="fade-right" data-aos-delay="200">
                  <strong>
                    Auspicious Nakshatra or Personal Janma Nakshatra
                  </strong>{" "}
                  - Chosen based on the devotee's birth chart.
                </li>
              </ul>
            </div>
          </Col>
        </Row>

        <Row className="benefits-section">
          {poojaData?.benefitsOfPooja && (
            <Row className="benefits-section">
              <Col md={12}>
                <h2 className="section-title" data-aos="fade-up">
                  Benefits of Maha Mrityunjaya Jaap
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
                        <h4>Benefit {index + 1}</h4>
                        <p>{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Row>

        <Row className="cta-section" data-aos="fade-up">
          <Col md={12}>
            <div className="cta-box">
              <h3>Book a Sacred Maha Mrityunjaya Jaap</h3>
              <p>
                Perform Maha Mrityunjaya Jaap with the guidance of expert North
                Indian Vedic Pandits for divine protection and long life.
              </p>
              <Button className="book-now-btn">
                Book your Maha Mrityunjaya Jaap today!
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

        <Row className="reviews-section" data-aos="fade-up">
          <Col md={12}>
            <h2 className="section-title">Reviews</h2>
            <div className="no-reviews">
              <p>No reviews available</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PoojaBookingDetails;
