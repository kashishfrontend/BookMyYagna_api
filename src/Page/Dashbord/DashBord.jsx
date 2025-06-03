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
  const [completedPuja, setCompletePuja] = useState([]);
  const bellRef = useRef();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const response = await axios.get("/notification/getAllNotifications");
        if (response.data.success) {
          // Extract heading, message, and createdAt only
          const filteredNotifications = response.data.notifications.map(
            ({ heading, message, createdAt }) => ({
              heading,
              message,
              createdAt,
            })
          );
          setNotifications(filteredNotifications);
        }
      } catch (err) {
        console.log("Error fetching user notification", err);
      }
    };
    getNotification();
  }, []);


  const handleDeleteNotification = async (id) => {
    try {
      const response = await axios.delete(`/notification/deleteNotification/${id}`);
      if (response.data.success) {
        // Remove the deleted notification from the state
        setNotifications((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };



  const [bookedPuja, setBookedPuja] = useState([]);
  useEffect(() => {
    const allBookingData = async () => {
      try {
        const response = await axios.post("/bookings/getAllBookingForUser", {
          startDate: '',
          endDate: '',
          status: ''
        });

        if (response.data.success) {
          const allBookings = response.data.data;

          // Filter based on status from each item
          const pendingOrActive = allBookings.filter(booking =>
            ['bookingPending', 'bookingConfirmed', 'bookingCancelled'].includes(booking.status)
          );

          const completed = allBookings.filter(booking =>
            booking.status === 'completed'
          );

          setBookedPuja(pendingOrActive);
          setCompletePuja(completed);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    allBookingData();
  }, []);



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
  ];




  // Render content based on active nav item
  const renderContent = () => {
    switch (activeNavItem) {
      case "dashboard":
        return renderDashboardContent();

      case "bookings":
        return renderMyBookingDetals();

      case "book":
        return renderMyBookedDetals();
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
            className={`menu-item ${activeNavItem === "dashboard" ? "active" : ""
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
            className={`menu-item ${activeNavItem === "bookings" ? "active" : ""
              }`}
            onClick={() => handleNavItemClick("bookings")}
          >
            <FaCalendarAlt size={20} />
            <span>Completed Pooja</span>
          </div>



          <div
            className={`menu-item ${activeNavItem === "profile" ? "active" : ""
              }`}
            onClick={() => handleNavItemClick("profile")}
          >
            <FaUserCircle size={20} />
            <span>My Profile</span>
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
              className={`menu-item ${activeNavItem === "dashboard" ? "active" : ""
                }`}
              onClick={() => handleNavItemClick("dashboard")}
            >
              <MdDashboard size={22} />
              <span>Dashboard</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "book" ? "active" : ""
                }`}
              onClick={() => handleNavItemClick("book")}
            >
              <FaPrayingHands size={20} />
              <span>Booked Pooja</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "bookings" ? "active" : ""
                }`}
              onClick={() => handleNavItemClick("bookings")}
            >
              <FaCalendarAlt size={20} />
              <span>Completed Pooja</span>
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
              <input type="text" placeholder="Search for poojas, priests, temples..." />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="nav-right">

              <div
                className="user-profile me-4 me-md-3"
                onClick={() => setShowProfileModal(true)}
              >

                <span className="user-name d-none d-md-inline">
                  {user?.fullName}
                </span>
              </div>
              <div
                className="notification-bell"
                ref={bellRef}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <MdNotifications size={24} />
                {/* Safely check notifications */}
                {Array.isArray(notifications) && notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}

                {showNotifications && (
                  <div className="notification-popup">
                    {Array.isArray(notifications) && notifications.length > 0 ? (
                      notifications.map((item, index) => (
                        <div key={index} className="notification-item">
                          <div className="">
                            <h4 className="popup-heading border-0 ">{item.heading}</h4>
                            {/* <button
                              className="delete-btn"
                              onClick={() => handleDeleteNotification(item._id)}
                            >
                              ❌
                            </button> */}
                            <p className="popup-message">
                              {item.message.replace(/ for pooja booking id \w+\./, ".")}
                            </p>
                            <p className="popup-time">
                              {new Date(item.createdAt).toLocaleString("en-IN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                timeZone: "Asia/Kolkata",
                              })}
                            </p>
                          </div>
                          {/* Add <hr /> between items, except after the last one */}
                          {index !== notifications.length - 1 && <hr className="notification-separator" />}
                        </div>
                      ))
                    ) : (
                      <p className="popup-message">No new notifications.</p>
                    )}
                  </div>
                )}

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
                <Col lg={8}>
                  <Form onSubmit={handleProfileSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={user?.fullName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={user?.email}
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
      <footer className="dashboard-footer position-fixed bottom-0 w-100">
        <div className="footer-content text-center">
          <p className="mb-1">&copy; 2025 BookmyYagna. All rights reserved.</p>
          <div className="footer-links d-flex justify-content-center gap-3 flex-wrap">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </footer>

    </>
  );

  function renderMyBookedDetals() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="text-center fs-1">
              <h2>Booked Pooja</h2>
            </div>
            <table class="custom-table table-responsive">
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Plan Name</th>
                  <th>Amount</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Pooja Mod</th>
                  <th>Date of Pooja</th>
                </tr>
              </thead>
              <tbody>
                {bookedPuja?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.userId.fullName}</td>
                    <td>{data.planId.heading}</td>
                    <td>{data.planId.amount}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.address}</td>
                    <td>{data.status}</td>
                    <td>{data.poojaMode}</td>
                    <td>
                      {new Date(data.dateOfDelivery).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>

        </div>
      </>
    )
  }


  function renderMyBookingDetals() {
    return (
      <>

        <div className="container py-5 ">
          <div className="row">
            <div className="text-center fs-1">
              <h2>Completed Pooja</h2>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-warning">
                  <tr>
                    <th>Account Name</th>
                    <th>Plan Name</th>
                    <th>Amount</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Pooja Mod</th>
                    <th>Date of Pooja</th>
                  </tr>
                </thead>
                <tbody>
                  {completedPuja?.map((data, index) => (
                    <tr key={index}>
                      <td>{data.userId.fullName}</td>
                      <td>{data.planId.heading}</td>
                      <td>{data.planId.amount}</td>
                      <td>{data.phoneNumber}</td>
                      <td>{data.address}</td>
                      <td>{data.status}</td>
                      <td>{data.poojaMode}</td>
                      <td>
                        {new Date(data.dateOfDelivery).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


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
                {user?.fullName.split(" ")[0]}!
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
              lg={4}
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
                    <h2>{bookedPuja.length}</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              lg={4}
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
                    <h2>{completedPuja.length}</h2>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col
              lg={4}
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


          <div className="text-center fs-1">
            <h2>Booked Pooja</h2>
          </div>
          <div className="table-responsive">
            <table className="custom-table table table-bordered">
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th>Plan Name</th>
                  <th>Amount</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Pooja Mod</th>
                  <th>Date of Pooja</th>
                </tr>
              </thead>
              <tbody>
                {completedPuja?.map((data, index) => (
                  <tr key={index}>
                    <td>{data.userId.fullName}</td>
                    <td>{data.planId.heading}</td>
                    <td>{data.planId.amount}</td>
                    <td>{data.phoneNumber}</td>
                    <td>{data.address}</td>
                    <td>{data.status}</td>
                    <td>{data.poojaMode}</td>
                    <td>
                      {new Date(data.dateOfDelivery).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>




          {/* Calendar Card */}

          {/* Testimonials */}
        </Container>
      </>
    );
  }
};

export default Dashboard;
