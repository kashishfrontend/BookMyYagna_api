import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Tab,
  Nav,
} from "react-bootstrap";
import {
  FaPrayingHands,
  FaCalendarAlt,
  FaUsers,
  FaBell,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import {
  MdDashboard,
  MdPayment,
  MdSettings,
  MdLogout,
  MdNotifications,
  MdEdit,
  MdClose,
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../assets/css/Dashbord.css";
// import poojaVideo from '../../assets/videos/pooja-video.mp4'
import axios from "../../Api/axios/axios_config";
import { logout } from "../../redux/action/authAction";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  // User profile data
  const [userData, setUserData] = useState({
    name: "Nakul Rana",
    email: "Nakul.rana@example.com",
    phone: "+91 00000000000",
    address: "DLF, ROhtak",
    profileImage: "/images/user-avatar.jpg",
  });

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // your logout action
    navigate("/");
  };
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Handle navigation item click
  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    if (window.innerWidth < 992) {
      setShowSidebar(false);
    }
  };

  // Handle profile form submit
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this data to your API
    console.log("Profile updated:", userData);
    setShowProfileModal(false);
  };

  // Handle profile input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mock data for the dashboard
  const upcomingBookings = [
    {
      id: 1,
      pooja: "Satyanarayan Katha",
      date: "30 April 2025",
      priest: "Pandit Ramesh Sharma",
      status: "Confirmed",
    },
    {
      id: 2,
      pooja: "Griha Pravesh",
      date: "5 May 2025",
      priest: "Pandit Suresh Joshi",
      status: "Pending",
    },
    {
      id: 3,
      pooja: "Ganesh Pooja",
      date: "12 May 2025",
      priest: "Pandit Krishna Gupta",
      status: "Confirmed",
    },
  ];

  const popularPoojas = [
    {
      id: 1,
      name: "Satyanarayan Katha",
      duration: "3 hours",
      price: "₹5,100",
      image: "/images/satyanarayan.jpg",
    },
    {
      id: 2,
      name: "Griha Pravesh",
      duration: "4 hours",
      price: "₹7,500",
      image: "/images/grihapravesh.jpg",
    },
    {
      id: 3,
      name: "Ganesh Pooja",
      duration: "2 hours",
      price: "₹3,100",
      image: "/images/ganesh.jpg",
    },
    {
      id: 4,
      name: "Diwali Lakshmi Pooja",
      duration: "2.5 hours",
      price: "₹4,500",
      image: "/images/lakshmi.jpg",
    },
  ];

  const importedVideos = [
    {
      url: "/videos/video1.mp4",
      name: "video1.mp4",
    },
    {
      url: "/videos/video2.mkv",
      name: "video2.mkv",
    },
    {
      url: "/videos/video3.mp4",
      name: "video3.mp4",
    },
    // ➕ Add more as needed
  ];

  const fullscreenRefs = useRef([]);

  const enterFullScreen = (index) => {
    const element = fullscreenRefs.current[index];
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  // Render content based on active nav item
  const renderContent = () => {
    switch (activeNavItem) {
      case "dashboard":
        return renderDashboardContent();
      case "profile":
        return renderProfileContent();
      case "bookings":
        return renderMyBookingDetals();
      case "temples":
        return randerTempleContent();
      default:
        return (
          <div className="content-placeholder">
            <div className="placeholder-center">
              <FaPrayingHands size={60} className="placeholder-icon" />
              <h3>
                {activeNavItem.charAt(0).toUpperCase() + activeNavItem.slice(1)}
              </h3>
              <p>
                This section is coming soon. We're working on bringing you the
                best spiritual experience.
              </p>
            </div>
          </div>
        );
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/user/getUserProfile");
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <div className="dashboard-container ">
        {/* Mobile Menu Toggle */}
        <div
          className="mobile-toggle"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <MdClose size={24} /> : <FaBars size={24} />}
        </div>
        {/* For mobilr view */}
        <div
          className={`sidebar d-block d-md-none ${showSidebar ? "active" : ""}`}
        >
          <div
            className={`menu-item ${
              activeNavItem === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("dashboard")}
          >
            <MdDashboard size={22} />
            <span>Dashboard</span>
          </div>
          <div
            className={`menu-item ${activeNavItem === "book" ? "active" : ""}`}
            onClick={() => handleNavItemClick("book")}
          >
            <FaPrayingHands size={20} />
            <span>Book Pooja</span>
          </div>
          <div
            className={`menu-item ${
              activeNavItem === "bookings" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("bookings")}
          >
            <FaCalendarAlt size={20} />
            <span>My Bookings</span>
          </div>
          <div
            className={`menu-item ${
              activeNavItem === "priests" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("priests")}
          >
            <FaUsers size={20} />
            <span>Priests</span>
          </div>
          <div
            className={`menu-item ${
              activeNavItem === "temples" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("temples")}
          >
            {/* <FaTempleHindu size={20} /> */}
            <span>Temples</span>
          </div>
          <div
            className={`menu-item ${
              activeNavItem === "payments" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("payments")}
          >
            <MdPayment size={22} />
            <span>Payments</span>
          </div>
          <div
            className={`menu-item ${
              activeNavItem === "profile" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("profile")}
          >
            <FaUserCircle size={20} />
            <span>My Profile</span>
          </div>
          <div
            className={`menu-item ${
              activeNavItem === "settings" ? "active" : ""
            }`}
            onClick={() => handleNavItemClick("settings")}
          >
            <MdSettings size={22} />
            <span>Settings</span>
          </div>
          <div className="menu-item logout" onClick={() => handleLogout()}>
            <MdLogout size={22} />
            <span>Logout</span>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`sidebar col-12 col-lg-2 ${showSidebar ? "show" : "hide"}`}
        >
          <div className="logo-container">
            <h2 className="logo">BookmyYagna</h2>
            {/* <p className="logo-subtitle">Divine Bookings</p> */}
          </div>
          <div className="sidebar-menu">
            <div
              className={`menu-item ${
                activeNavItem === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("dashboard")}
            >
              <MdDashboard size={22} />
              <span>Dashboard</span>
            </div>
            <div
              className={`menu-item ${
                activeNavItem === "book" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("book")}
            >
              <FaPrayingHands size={20} />
              <span>Book Pooja</span>
            </div>
            <div
              className={`menu-item ${
                activeNavItem === "bookings" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("bookings")}
            >
              <FaCalendarAlt size={20} />
              <span>My Bookings</span>
            </div>
            <div
              className={`menu-item ${
                activeNavItem === "priests" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("priests")}
            >
              <FaUsers size={20} />
              <span>Priests</span>
            </div>
            <div
              className={`menu-item ${
                activeNavItem === "temples" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("temples")}
            >
              {/* <FaTempleHindu size={20} /> */}
              <span>Temples</span>
            </div>
            <div
              className={`menu-item ${
                activeNavItem === "payments" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("payments")}
            >
              <MdPayment size={22} />
              <span>Payments</span>
            </div>
            <div
              className={`menu-item ${
                activeNavItem === "profile" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("profile")}
            >
              <FaUserCircle size={20} />
              <span>My Profile</span>
            </div>
            <div
              className={`menu-item ${
                activeNavItem === "settings" ? "active" : ""
              }`}
              onClick={() => handleNavItemClick("settings")}
            >
              <MdSettings size={22} />
              <span>Settings</span>
            </div>
            <div className="menu-item logout" onClick={() => handleLogout()}>
              <MdLogout size={22} />
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`main-content col-lg-10 ${showSidebar ? "" : "expanded"}`}
        >
          {/* Top Navigation */}
          <div className="top-nav">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for poojas, priests, temples..."
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="nav-right ">
              <div className="notification-bell">
                <MdNotifications size={24} />
                <span className="notification-badge">3</span>
              </div>
              <div
                className="user-profile"
                onClick={() => setShowProfileModal(true)}
              >
                <img
                  src={userData.profileImage}
                  alt="User"
                  className="avatar"
                />
                <span className="user-name d-none d-md-inline">
                  {userData.name}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Content Based on Navigation */}
          {renderContent()}

          {/* Profile Modal */}
          <Modal
            show={showProfileModal}
            onHide={() => setShowProfileModal(false)}
            centered
            className="profile-modal"
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>My Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col lg={4} className="text-center mb-4 mb-lg-0">
                  <div className="profile-image-container">
                    <img
                      src={userData.profileImage}
                      alt="Profile"
                      className="profile-image"
                    />
                    <div className="image-edit-overlay">
                      <MdEdit size={24} />
                      <span>Change</span>
                    </div>
                  </div>
                  <h4 className="mt-3">{userData.name}</h4>
                  <p className="text-muted">Member since April 2025</p>
                  <div className="profile-stats">
                    <div className="stat-item">
                      <h5>15</h5>
                      <p>Poojas</p>
                    </div>
                    <div className="stat-item">
                      <h5>108</h5>
                      <p>Points</p>
                    </div>
                    <div className="stat-item">
                      <h5>Gold</h5>
                      <p>Tier</p>
                    </div>
                  </div>
                </Col>
                <Col lg={8}>
                  <Form onSubmit={handleProfileSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 shadow-lg">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-4">
                      <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => setShowProfileModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <footer className="dashboard-footer">
        <div className="footer-content">
          <p>&copy; 2025 BookmyYagna . All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );

  function renderMyBookingDetals() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6">
              <select name="" id="">
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
                <option value="">Select Pooja</option>
              </select>
            </div>
          </div>
        </div>
      </>
    );
  }
  function randerTempleContent() {
    return (
      <>
        <div className="container py-5">
          {/* Heading */}
          <h2
            className="text-center mb-4"
            style={{
              background:
                "linear-gradient(to right, transparent, #FF8C00, transparent)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            🎥 Video Library
          </h2>

          {/* Video Grid */}
          <div className="row">
            {importedVideos.map((video, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div
                  className="card shadow"
                  ref={(el) => (fullscreenRefs.current[index] = el)}
                  style={{
                    border: "2px solid #FF8C00",
                    borderRadius: "10px",
                    position: "relative",
                  }}
                >
                  {/* Exit Fullscreen Button */}
                  <button
                    onClick={exitFullScreen}
                    className="btn btn-danger position-absolute top-0 end-0 m-2"
                    style={{ zIndex: 1000, borderRadius: "50%" }}
                  >
                    ✖
                  </button>

                  {/* Video Thumbnail */}
                  <video
                    src={video.url}
                    controls
                    className="card-img-top rounded"
                    style={{ maxHeight: "90%", objectFit: "cover" }}
                  />

                  {/* Actions */}
                  <div className="card-body d-flex justify-content-between flex-wrap gap-2">
                    <button
                      className="btn btn-warning text-white"
                      onClick={() => enterFullScreen(index)}
                    >
                      🔎 Fullscreen
                    </button>

                    <a
                      href={video.url}
                      download={video.name}
                      className="btn btn-success"
                    >
                      ⬇️ Download
                    </a>
                  </div>
                  <div className=" d-flex justify-content-between p-3">
                    <p>
                      <b> Video Name: </b>
                    </p>
                    <p>
                      <b> Date : 10:10:2025 </b>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Dashboard content render function
  function renderDashboardContent() {
    return (
      <>
        <Container fluid className="dashboard-content">
          <Row>
            <Col>
              <h1 className="welcome-heading" data-aos="fade-right">
                <span className="namaste">नमस्ते</span>,{" "}
                {userData.name.split(" ")[0]}!
              </h1>
              <p
                className="welcome-subtext"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                Welcome back to your spiritual journey
              </p>
            </Col>
          </Row>

          {/* Stats Cards */}
          <Row className="stats-row">
            <Col
              lg={3}
              md={6}
              className="stats-col col-6"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <Card className="stats-card">
                <Card.Body>
                  <div className="stats-icon">
                    <FaCalendarAlt />
                  </div>
                  <div className="stats-info">
                    <h5>Upcoming Poojas</h5>
                    <h2>03</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              className="stats-col col-6"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <Card className="stats-card">
                <Card.Body>
                  <div className="stats-icon">
                    <FaPrayingHands />
                  </div>
                  <div className="stats-info">
                    <h5>Completed Poojas</h5>
                    <h2>12</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={6}
              className="stats-col col-6"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <Card className="stats-card">
                <Card.Body>
                  <div className="stats-icon">{/* <FaTempleHindu /> */}</div>
                  <div className="stats-info">
                    <h5>Sacred Points</h5>
                    <h2>108</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={3}
              md={6}
              sm={6}
              className="stats-col col-6"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <Card className="stats-card">
                <Card.Body>
                  <div className="stats-icon">
                    <FaBell />
                  </div>
                  <div className="stats-info">
                    <h5>Notifications</h5>
                    <h2>03</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Upcoming Bookings */}
          <Row className="mt-4">
            <Col lg={7} data-aos="fade-up">
              <Card className="booking-card">
                <Card.Header className="booking-header">
                  <h3>Upcoming Pooja Bookings</h3>
                  <Button variant="link" className="view-all-btn">
                    View All
                  </Button>
                </Card.Header>
                <Card.Body className="p-0">
                  <div className="booking-list">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="booking-item"
                        data-aos="fade-up"
                        data-aos-delay={booking.id * 100}
                      >
                        <div className="booking-icon">
                          <FaPrayingHands />
                        </div>
                        <div className="booking-details">
                          <h4>{booking.pooja}</h4>
                          <p>
                            <FaCalendarAlt /> {booking.date}
                          </p>
                          <p className="priest-name">
                            <FaUsers /> {booking.priest}
                          </p>
                        </div>
                        <div className="booking-status">
                          <span
                            className={`status ${booking.status.toLowerCase()}`}
                          >
                            {booking.status}
                          </span>
                          <Button
                            variant="outline-primary"
                            className="details-btn"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Calendar Card */}
            <Col lg={5} data-aos="fade-up" data-aos-delay="200">
              <Card className="calendar-card">
                <Card.Header className="calendar-header">
                  <h3>Auspicious Dates</h3>
                  <Button variant="link" className="view-all-btn">
                    Full Calendar
                  </Button>
                </Card.Header>
                <Card.Body>
                  <div className="auspicious-dates">
                    <div className="date-item">
                      <div className="date-circle">
                        <span className="date-number">30</span>
                        <span className="date-month">APR</span>
                      </div>
                      <div className="date-info">
                        <h5>Akshaya Tritiya</h5>
                        <p>Highly auspicious for new beginnings</p>
                      </div>
                    </div>
                    <div className="date-item">
                      <div className="date-circle">
                        <span className="date-number">10</span>
                        <span className="date-month">MAY</span>
                      </div>
                      <div className="date-info">
                        <h5>Buddha Purnima</h5>
                        <p>Full moon day - excellent for meditation</p>
                      </div>
                    </div>
                    <div className="date-item">
                      <div className="date-circle">
                        <span className="date-number">21</span>
                        <span className="date-month">MAY</span>
                      </div>
                      <div className="date-info">
                        <h5>Ganga Dussehra</h5>
                        <p>Sacred for water rituals and cleansing</p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Popular Poojas */}
          <Row className="mt-4">
            <Col xs={12} data-aos="fade-up">
              <h3 className="section-title1">Popular Poojas</h3>
            </Col>
            {popularPoojas.map((pooja, index) => (
              <Col
                lg={3}
                md={6}
                sm={6}
                key={pooja.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Card className="pooja-card">
                  <div className="pooja-img-container">
                    <div
                      className="pooja-img-placeholder"
                      style={{ backgroundImage: `url('${pooja.image}')` }}
                    ></div>
                  </div>
                  <Card.Body>
                    <Card.Title>{pooja.name}</Card.Title>
                    <div className="pooja-details">
                      <span>
                        <i className="far fa-clock"></i> {pooja.duration}
                      </span>
                      <span className="pooja-price">{pooja.price}</span>
                    </div>
                    <Button variant="primary" className="book-now-btn">
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Testimonials */}
          <Row className="mt-4">
            <Col xs={12} data-aos="fade-up">
              <h3 className="section-title1">Devotee Testimonials</h3>
            </Col>
            <Col lg={4} md={6} sm={6} data-aos="fade-up" data-aos-delay="100">
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="quote-icon">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="testimonial-text">
                    "The online pooja service was just like having it at home.
                    The priest was very knowledgeable and guided us through the
                    entire process with devotion."
                  </p>
                  <div className="testimonial-author">
                    <img
                      src="/images/testimonial1.jpg"
                      alt="Author"
                      className="testimonial-avatar"
                    />
                    <div className="author-info">
                      <h5>Priya Mehta</h5>
                      <p>Delhi</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={6} data-aos="fade-up" data-aos-delay="200">
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="quote-icon">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="testimonial-text">
                    "We booked a Griha Pravesh pooja through this platform and
                    it was a seamless experience. The priest arrived on time
                    with all necessary items."
                  </p>
                  <div className="testimonial-author">
                    <img
                      src="/images/testimonial2.jpg"
                      alt="Author"
                      className="testimonial-avatar"
                    />
                    <div className="author-info">
                      <h5>Aditya Singh</h5>
                      <p>Mumbai</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={4}
              md={6}
              sm={6}
              className="mt-md-3 mt-0"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <Card className="testimonial-card">
                <Card.Body>
                  <div className="quote-icon">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="testimonial-text">
                    "Booking a pooja for my parents living in another city was
                    so convenient. The digital prasad delivery was an amazing
                    touch to the service."
                  </p>
                  <div className="testimonial-author">
                    <img
                      src="/images/testimonial3.jpg"
                      alt="Author"
                      className="testimonial-avatar"
                    />
                    <div className="author-info">
                      <h5>Shreya Patel</h5>
                      <p>Bangalore</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  // Profile content render function
  function renderProfileContent() {
    return (
      <Container fluid className="dashboard-content">
        <Row className="mb-4">
          <Col>
            <h2 className="section-heading" data-aos="fade-right">
              My Profile
            </h2>
          </Col>
        </Row>

        <Row>
          <Col lg={12} data-aos="fade-up">
            <Card className="profile-card">
              <Card.Body>
                <Tab.Container defaultActiveKey="personal">
                  <Row>
                    <Col lg={3} md={4}>
                      <div className="profile-sidebar">
                        <div className="profile-image-wrap">
                          <img
                            src={userData.profileImage}
                            alt="Profile"
                            className="profile-avatar"
                          />
                          <div className="profile-avatar-edit">
                            <MdEdit size={16} />
                          </div>
                        </div>
                        <h4 className="profile-name">{userData.name}</h4>
                        <p className="profile-email">{userData.email}</p>
                        <div className="profile-badge">
                          <span>Gold Member</span>
                        </div>

                        <Nav
                          variant="pills"
                          className="profile-nav  flex-column mt-4"
                        >
                          <Nav.Item>
                            <Nav.Link
                              className="text-dark border"
                              eventKey="personal"
                            >
                              Personal Information
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="text-dark border"
                              eventKey="family"
                            >
                              Family Members
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="text-dark border"
                              eventKey="notifications"
                            >
                              Notifications
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              className="text-dark border"
                              eventKey="security"
                            >
                              Security & Privacy
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                    </Col>
                    <Col lg={9} md={8}>
                      <Tab.Content>
                        <Tab.Pane eventKey="personal">
                          <h4 className="profile-section-title1">
                            Personal Information
                          </h4>
                          <Form>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Full Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Email Address</Form.Label>
                                  <Form.Control
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Phone Number</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={6}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Date of Birth</Form.Label>
                                  <Form.Control
                                    type="date"
                                    name="dob"
                                    defaultValue="2000-06-10"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Form.Group className="mb-3">
                              <Form.Label>Address</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={2}
                                name="address"
                                value={userData.address}
                                onChange={handleInputChange}
                              />
                            </Form.Group>
                            <Row>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>City</Form.Label>
                                  <Form.Control
                                    type="text"
                                    defaultValue="Rohtak"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>State</Form.Label>
                                  <Form.Control
                                    type="text"
                                    defaultValue="Haryana"
                                  />
                                </Form.Group>
                              </Col>
                              <Col md={4}>
                                <Form.Group className="mb-3">
                                  <Form.Label>Pincode</Form.Label>
                                  <Form.Control
                                    type="text"
                                    defaultValue="124001"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <div className="d-flex justify-content-end mt-4">
                              <Button variant="primary" type="submit">
                                Save Changes
                              </Button>
                            </div>
                          </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="family">
                          <h4 className="profile-section-title">
                            Family Members
                          </h4>
                          <div className="family-members">
                            <div className="family-member-card">
                              <div className="family-member-avatar">
                                <img
                                  src="/images/family-member1.jpg"
                                  alt="Family Member"
                                />
                              </div>
                              <div className="family-member-details">
                                <h5>Priya Rana</h5>
                                <p>Wife</p>
                              </div>
                              <Button variant="outline-primary" size="sm">
                                Edit
                              </Button>
                            </div>
                            <div className="family-member-card">
                              <div className="family-member-avatar">
                                <img
                                  src="/images/family-member2.jpg"
                                  alt="Family Member"
                                />
                              </div>
                              <div className="family-member-details">
                                <h5>Rohan Rana</h5>
                                <p>Son</p>
                              </div>
                              <Button variant="outline-primary" size="sm">
                                Edit
                              </Button>
                            </div>
                            <Button
                              variant="primary"
                              className="add-family-btn"
                            >
                              <span>+</span> Add Family Member
                            </Button>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="notifications">
                          <h4 className="profile-section-title">
                            Notification Settings
                          </h4>
                          <Form>
                            <Form.Group className="notification-option">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h5>Email Notifications</h5>
                                  <p>
                                    Receive booking confirmations and updates
                                  </p>
                                </div>
                                <Form.Check
                                  type="switch"
                                  id="email-switch"
                                  defaultChecked
                                />
                              </div>
                            </Form.Group>
                            <Form.Group className="notification-option">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h5>SMS Notifications</h5>
                                  <p>
                                    Receive text messages for important updates
                                  </p>
                                </div>
                                <Form.Check
                                  type="switch"
                                  id="sms-switch"
                                  defaultChecked
                                />
                              </div>
                            </Form.Group>
                            <Form.Group className="notification-option">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h5>Promotional Emails</h5>
                                  <p>Receive special offers and promotions</p>
                                </div>
                                <Form.Check type="switch" id="promo-switch" />
                              </div>
                            </Form.Group>
                            <Form.Group className="notification-option">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <h5>Reminder Alerts</h5>
                                  <p>
                                    Receive reminders before scheduled poojas
                                  </p>
                                </div>
                                <Form.Check
                                  type="switch"
                                  id="reminder-switch"
                                  defaultChecked
                                />
                              </div>
                            </Form.Group>
                            <div className="d-flex justify-content-end mt-4">
                              <Button variant="primary" type="submit">
                                Save Preferences
                              </Button>
                            </div>
                          </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="security">
                          <h4 className="profile-section-title">
                            Security & Privacy
                          </h4>
                          <Form>
                            <div className="password-section mb-4">
                              <h5>Change Password</h5>
                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type="password" />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Label>
                                      Confirm New Password
                                    </Form.Label>
                                    <Form.Control type="password" />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Button variant="primary" size="sm">
                                Update Password
                              </Button>
                            </div>
                            <div className="privacy-section">
                              <h5>Privacy Settings</h5>
                              <Form.Group className="mb-3">
                                <Form.Check
                                  type="checkbox"
                                  label="Make my profile visible to priests and temples"
                                  id="profile-visibility"
                                  defaultChecked
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Check
                                  type="checkbox"
                                  label="Allow sharing my booking history with recommended priests"
                                  id="history-sharing"
                                />
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Check
                                  type="checkbox"
                                  label="Enable two-factor authentication for login"
                                  id="two-factor"
                                />
                              </Form.Group>
                            </div>
                            <div className="d-flex justify-content-end mt-4">
                              <Button variant="primary" type="submit">
                                Save Security Settings
                              </Button>
                            </div>
                          </Form>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Dashboard;
