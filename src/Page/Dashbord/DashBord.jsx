import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import {
  FaPrayingHands,
  FaCalendarAlt,
  FaBell,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import {
  MdDashboard,
  MdLogout,
  MdNotifications,
  MdClose,
  MdDelete,
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../assets/css/Dashbord.css";
import axios from "../../Api/axios/axios_config";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../redux/action/authAction";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
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
          const filteredNotifications = response.data.notifications.map(
            ({ _id, heading, message, createdAt }) => {
              const trimmedMessage = message.split(" for pooja booking id")[0];
              return {
                _id,
                heading,
                message: trimmedMessage,
                createdAt,
              };
            }
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
      if (response.data.message) {
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
          const pendingOrActive = allBookings.filter(booking =>
            ['Pending', 'Confirmed', 'Cancelled'].includes(booking.status)
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
  const [userData, setUserData] = useState({
    name: "Nakul Rana",
    email: "Nakul.rana@example.com",
    phone: "+91 00000000000",
    address: "DLF, ROhtak",
    profileImage: "/images/user-avatar.jpg",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    if (window.innerWidth < 992) {
      setShowSidebar(false);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", userData);
    setShowProfileModal(false);
  };

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

  const renderContent = () => {
    switch (activeNavItem) {
      case "dashboard":
        return renderDashboardContent();
      case "bookings":
        return renderMyBookingDetals();
      case "book":
        return renderMyBookedDetals();
      case "notifications":
        return renderNotifications();
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
      <div className="dashboard-container">
        <div
          className="mobile-toggle"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <MdClose size={24} /> : <FaBars size={24} />}
        </div>
        <div
          className={`sidebar d-block d-lg-none ${showSidebar ? "active" : ""}`}
        >
          <div className="logo-container">
            <h2 className="logo">BookmyYagna</h2>
          </div>
          <div className="sidebar-menu">
            <div
              className={`menu-item ${activeNavItem === "dashboard" ? "active" : ""}`}
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
              className={`menu-item ${activeNavItem === "bookings" ? "active" : ""}`}
              onClick={() => handleNavItemClick("bookings")}
            >
              <FaCalendarAlt size={20} />
              <span>Completed Pooja</span>
            </div>
            <div className="mt-auto">
              <div className="menu-item logout " onClick={() => handleLogout()}>
                <MdLogout size={22} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`sidebar col-12 col-lg-2 ${showSidebar ? "show" : "hide"} d-none d-lg-block`}
        >
          <div className="logo-container">
            <h2 className="logo">BookmyYagna</h2>
          </div>
          <div className="sidebar-menu">
            <div
              className={`menu-item ${activeNavItem === "dashboard" ? "active" : ""}`}
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
              <span>Booked Pooja</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "bookings" ? "active" : ""}`}
              onClick={() => handleNavItemClick("bookings")}
            >
              <FaCalendarAlt size={20} />
              <span>Completed Pooja</span>
            </div>
            <div className="menu-item logout mt-auto" onClick={handleLogout}>
              <MdLogout size={22} />
              <span>Logout</span>
            </div>
          </div>
        </div>
        <div
          className={`main-content col-12 col-lg-10 ${showSidebar ? "" : "expanded"}`}
        >
          <div className="top-nav">
            <div className="search-bar">
              <input type="text" placeholder="Search for poojas, priests, temples..." />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="nav-right">
              <div
                className="user-profile me-2 me-md-3"
                onClick={() => setShowProfileModal(true)}
              >
                <span className="user-name">
                  {user?.fullName}
                </span>
              </div>
              <div
                className="notification-bell"
                ref={bellRef}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <MdNotifications size={24} />
                {Array.isArray(notifications) && notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
                {showNotifications && (
                  <div className="notification-popup">
                    {Array.isArray(notifications) && notifications.length > 0 ? (
                      notifications.slice(0, 3).map((item, index) => (
                        <div key={index} className="notification-item">
                          <div>
                            <h4 className="popup-heading border-0 ">{item.heading}</h4>
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
                          {index !== notifications.slice(0, 3).length - 1 && <hr className="notification-separator" />}
                        </div>
                      ))
                    ) : (
                      <p className="popup-message">No new notifications.</p>
                    )}
                    <div className="text-center">
                      <button
                        className="view-all-btn"
                        onClick={() => {
                          setShowNotifications(false);
                          handleNavItemClick("notifications");
                        }}
                      >
                        View All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {renderContent()}
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
              <div >
                <Col>
                  <Form onSubmit={handleProfileSubmit}>
                    <Form.Group className="mb-3 col-md-12">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={user?.fullName}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 col-md-12">
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
                        variant="danger"
                        className="me-2"
                        onClick={() => setShowProfileModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit shadow-lg" style={{ backgroundImage: 'linear-gradient(15deg, #ff8c00, #b22222, #fdd835)', border: 'none' }}>
                        Save Changes
                      </Button>

                    </div>
                  </Form>
                </Col>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <footer className="dashboard-footer position-fixed bottom-0 w-100">
        <div className="footer-content text-center">
          <p className="m-0">© 2025 BookmyYagna. All rights reserved.</p>
          <div className="footer-links d-flex justify-content-center gap-3 flex-wrap">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );

  function renderNotifications() {
    return (
      <div className="container py-3 py-md-5">
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2>All Notifications</h2>
          </div>
          <div className="table-responsive">
            <table className="custom-table table table-bordered table-striped">
              <thead className="table-warning">
                <tr>
                  <th>Heading</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(notifications) && notifications.length > 0 ? (
                  notifications.map((item, index) => (
                    <tr key={index}>
                      <td>{item.heading}</td>
                      <td>{item.message}</td>
                      <td>
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteNotification(item._id)}
                        >
                          <MdDelete size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No notifications available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  function renderMyBookedDetals() {
    return (
      <div className="container py-3 py-md-5" data-aos="zoom-in"
        data-aos-delay="100">
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2>Booked Pooja</h2>
          </div>
          <div className="table-responsive">
            <table className="custom-table table table-bordered table-striped">
              <thead className="table-warning">
                <tr>
                  <th>Account Name</th>
                  <th>Plan Name</th>
                  <th>Amount</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Pooja Mode</th>
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
      </div>
    );
  }

  function renderMyBookingDetals() {
    return (
      <div className="container py-3 py-md-5" data-aos="zoom-in"
        data-aos-delay="100">
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2>Completed Pooja</h2>
          </div>
          <div className="table-responsive">
            <table className="custom-table table table-bordered table-striped">
              <thead className="table-warning">
                <tr>
                  <th>Account Name</th>
                  <th>Plan Name</th>
                  <th>Amount</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Pooja Mode</th>
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
    );
  }

  function renderDashboardContent() {
    return (
      <Container fluid className="dashboard-content py-3 py-md-5">
        <Row>
          <Col xs={12}>
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
        <Row className="stats-row">
          <Col
            xs={12}
            sm={6}
            md={4}
            className="stats-col mb-3"
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
            xs={12}
            sm={6}
            md={4}
            className="stats-col mb-3"
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
            xs={12}
            sm={6}
            md={4}
            className="stats-col mb-3"
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
                  <h2>{notifications.length}</h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="text-center fs-1 mb-3">
          <h2>Booked Pooja</h2>
        </div>
        <div className="table-responsive">
          <table className="custom-table table table-bordered table-striped">
            <thead className="table-warning">
              <tr>
                <th>Account Name</th>
                <th>Plan Name</th>
                <th>Amount</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Status</th>
                <th>Pooja Mode</th>
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
      </Container>
    );
  }
};

export default Dashboard;