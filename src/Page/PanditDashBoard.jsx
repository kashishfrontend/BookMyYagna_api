import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import {
  FaPrayingHands,
  FaCalendarAlt,
  FaBell,
  FaUserCircle,
  FaBars,
  FaLink,
  FaInfoCircle,
  FaCopy,
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
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/PanditDashBoard.css";
import { useSelector, useDispatch } from 'react-redux';
import { logoutPandit } from "../redux/action/panditAuthAction";
import { useNavigate } from "react-router-dom";
import { LogOut, LogOutIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

// Static data
const staticUser = {
  fullName: "Pandit Ji",
  email: "panditji@example.com",
  phoneNumber: "9876543210",
  address: "123 Temple Street, Varanasi, Uttar Pradesh, India",
  expertise: "Vedic Astrology, Ganesh Pooja, Shiv Pooja, Durga Pooja"
};

const staticBookedPuja = [
  {
    _id: "1",
    userId: { fullName: "Pandit Ji" },
    planId: { heading: "Ganesh Pooja", amount: 5000 },
    phoneNumber: "9876543210",
    address: "123 Temple Street, Varanasi",
    status: "Confirmed",
    poojaMode: "Online",
    dateOfDelivery: "2025-06-20T10:00:00Z",
    poojaLink: "https://meet.google.com/abc-defg-hij",
    poojaLinkTime: "10:00 AM"
  },
  {
    _id: "2",
    userId: { fullName: "Pandit Ji" },
    planId: { heading: "Shiv Pooja", amount: 3000 },
    phoneNumber: "9876543210",
    address: "123 Temple Street, Varanasi",
    status: "Pending",
    poojaMode: "Offline",
    dateOfDelivery: "2025-06-22T14:00:00Z"
  }
];

const staticCompletedPuja = [
  {
    _id: "3",
    userId: { fullName: "Pandit Ji" },
    planId: { heading: "Durga Pooja", amount: 7000 },
    phoneNumber: "9876543210",
    address: "123 Temple Street, Varanasi",
    status: "completed",
    poojaMode: "Online",
    dateOfDelivery: "2025-06-15T09:00:00Z"
  }
];

const staticConfirmedPoojas = [
  {
    id: "1",
    heading: "Ganesh Pooja",
    confirmedAt: "2025-06-17T06:52:44.476Z",
    dateOfDelivery: "2025-06-20T10:00:00Z",
    poojaLink: "https://meet.google.com/abc-defg-hij",
    poojaLinkTime: "10:00 AM"
  }
];

const staticNotifications = [
  {
    _id: "1",
    heading: "Pooja Confirmed",
    message: "Your Ganesh Pooja has been confirmed",
    createdAt: "2025-06-17T06:52:44.476Z"
  }
];

const PanditDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [completedPuja] = useState(staticCompletedPuja);
  const bellRef = useRef();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState(staticNotifications);
  const [popupStates, setPopupStates] = useState({});
  const [copyStates, setCopyStates] = useState({});
  const [bookedPuja] = useState(staticBookedPuja);
  const [confirmedPoojas] = useState(staticConfirmedPoojas);
  const [user, setUser] = useState(staticUser);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth <= 991);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Handle sidebar responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 991);
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

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
  }, []);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    if (window.innerWidth < 992) {
      setShowSidebar(false);
    }
  };
  // const PanditDashboard = () => {
  //   const navigate = useNavigate();

  //   const handleLogout = () => {

  //   };

  //   return (
  //     <div className="pandit-dashboard-container">
  //       <h2>Pandit Dashboard</h2>
  //       <p>Welcome, Pandit Ji!</p>
  //       <button className="btn btn-danger" onClick={handleLogout}>
  //         <LogOut size={18} className="me-2" />
  //         Logout
  //       </button>
  //     </div>
  //   );
  // };
  const handleLogout = () => {
    dispatch(logoutPandit());
    navigate('/');
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item._id !== id));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", user);
    setIsEditingProfile(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderContent = () => {
    switch (activeNavItem) {
      case "dashboard":
        return renderDashboardContent();
      case "bookings":
        return renderCompletedPoojaDetals();
      case "poojaTiming":
        return renderPoojaLink();
      case "notifications":
        return renderNotifications();
      case "punditProfile":
        return renderPunditProfile();
      default:
        return (
          <div className="content-placeholder">
            <div className="placeholder-center">
              <FaPrayingHands size={60} className="placeholder-icon" />
              <h3>{activeNavItem.charAt(0).toUpperCase() + activeNavItem.slice(1)}</h3>
              <p>This section is coming soon. We're working on bringing you the best spiritual experience.</p>
            </div>
          </div>
        );
    }
  };

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
                {notifications.length > 0 ? (
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
                    <td colSpan="4" className="text-center">No notifications available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  function renderCompletedPoojaDetals() {
    return (
      <div className="container py-3 py-md-5" data-aos="zoom-in" data-aos-delay="100">
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
                {completedPuja.map((data, index) => (
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
              <span className="namaste">नमस्ते</span>, {user.fullName.split(" ")[0]}!
            </h1>
            <p className="welcome-subtext" data-aos="fade-right" data-aos-delay="200">
              Welcome back to your spiritual journey
            </p>
          </Col>
        </Row>
        <Row className="stats-row">
          <Col xs={12} sm={6} md={4} className="stats-col mb-3" data-aos="zoom-in" data-aos-delay="100">
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
          <Col xs={12} sm={6} md={4} className="stats-col mb-3" data-aos="zoom-in" data-aos-delay="200">
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
          <Col xs={12} sm={6} md={4} className="stats-col mb-3" data-aos="zoom-in" data-aos-delay="400">
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
          <h2>All Poojas</h2>
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
                <th>Pooja Link</th>
              </tr>
            </thead>
            <tbody>
              {[...bookedPuja, ...completedPuja].map((data, index) => (
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
                  <td>
                    {data.poojaLink ? (
                      <div className="d-flex align-items-center gap-2 position-relative">
                        <a
                          href={data.poojaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                          style={{ background: 'linear-gradient(180deg, #FF7722, #E65C00)', border: 'none' }}
                        >
                          View
                        </a>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => setPopupStates(prev => ({ ...prev, [data._id]: true }))}
                          className="rounded-circle"
                          aria-label="View Pooja Link Details"
                        >
                          <FaInfoCircle size={16} />
                        </Button>
                        <Modal
                          show={popupStates[data._id]}
                          onHide={() => setPopupStates(prev => ({ ...prev, [data._id]: false }))}
                          centered
                          className="pooja-link-modal"
                          animation
                        >
                          <Modal.Header closeButton>
                            <Modal.Title style={{ color: 'var(--primary-color)' }}>
                              Your Google Meet Link
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="d-flex align-items-center gap-2">
                              <a
                                href={data.poojaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-truncate"
                              >
                                {data.poojaLink}
                              </a>
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(data.poojaLink);
                                  setCopyStates(prev => ({ ...prev, [data._id]: true }));
                                  setTimeout(() => setCopyStates(prev => ({ ...prev, [data._id]: false })), 2000);
                                }}
                              >
                                <FaCopy size={16} />
                              </Button>
                            </div>
                            {copyStates[data._id] && (
                              <div className="pooja-copied-notification">
                                Copied!
                              </div>
                            )}
                          </Modal.Body>
                        </Modal>
                      </div>
                    ) : (
                      'Not available'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    );
  }

  function renderPoojaLink() {
    return (
      <div className="container py-3 py-md-5" data-aos="zoom-in" data-aos-delay="100">
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2 className="fs-1">Pooja Timing</h2>
          </div>
          <div className={isMobileOrTablet ? 'table-responsive' : ''}>
            <table className="custom-table table table-bordered table-striped">
              <thead className="table-warning">
                <tr>
                  <th>Date Of Pooja</th>
                  <th>Pooja Name</th>
                  <th>Pooja Time</th>
                  <th>Link Pooja</th>
                </tr>
              </thead>
              <tbody>
                {confirmedPoojas.length > 0 ? (
                  confirmedPoojas.map((p) => (
                    <tr key={p.id}>
                      <td>
                        {new Date(p.dateOfDelivery).toLocaleDateString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td>{p.heading}</td>
                      <td>{p.poojaLinkTime || '—'}</td>
                      <td>
                        {p.poojaLink ? (
                          <div className="d-flex align-items-center gap-2 position-relative">
                            <a
                              href={p.poojaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm"
                              style={{ background: 'linear-gradient(180deg, #FF7722, #E65C00)', border: 'none' }}
                            >
                              View
                            </a>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => setPopupStates(prev => ({ ...prev, [p.id]: true }))}
                              className="rounded-circle"
                              aria-label="View Pooja Link Details"
                            >
                              <FaInfoCircle size={16} />
                            </Button>
                            <Modal
                              show={popupStates[p.id]}
                              onHide={() => setPopupStates(prev => ({ ...prev, [p.id]: false }))}
                              centered
                              className="pooja-link-modal"
                              animation
                            >
                              <Modal.Header closeButton>
                                <Modal.Title style={{ color: 'var(--primary-color)' }}>
                                  Your Google Meet Link
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <div className="d-flex align-items-center gap-2">
                                  <a
                                    href={p.poojaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary text-truncate"
                                  >
                                    {p.poojaLink}
                                  </a>
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => {
                                      navigator.clipboard.writeText(p.poojaLink);
                                      setCopyStates(prev => ({ ...prev, [p.id]: true }));
                                      setTimeout(() => setCopyStates(prev => ({ ...prev, [p.id]: false })), 2000);
                                    }}
                                  >
                                    <FaCopy size={16} />
                                  </Button>
                                </div>
                                {copyStates[p.id] && (
                                  <div className="pooja-copied-notification">
                                    Copied!
                                  </div>
                                )}
                              </Modal.Body>
                            </Modal>
                          </div>
                        ) : (
                          'Not available'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No confirmed poojas yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  function renderPunditProfile() {
    return (
      <Container className="dashboard-content py-3 py-md-5" data-aos="zoom-in" data-aos-delay="100">
        <Row>
          <Col xs={12}>
            <h1 className="welcome-heading">Pundit Profile</h1>
            <p className="welcome-subtext">Manage your personal and professional details</p>
          </Col>
        </Row>
        <Row>

          <Card className="stats-card">
            <Card.Body className="">
              {isEditingProfile ? (

                <Form className="row " onSubmit={handleProfileSubmit}>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={user.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Expertise</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="expertise"
                      value={user.expertise}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-end mt-4">
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      style={{ background: 'linear-gradient(180deg, #FF7722, #E65C00)', border: 'none' }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </Form>
              ) : (
                <div>
                  <div className="d-flex align-items-center mb-3">
                    <FaUserCircle size={40} className="me-3" style={{ color: 'var(--primary-color)' }} />
                    <h3>{user.fullName}</h3>
                  </div>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                  <p><strong>Address:</strong> {user.address}</p>
                  <p><strong>Expertise:</strong> {user.expertise}</p>
                  <Button
                    style={{ background: 'linear-gradient(180deg, #FF7722, #E65C00)', border: 'none' }}
                    onClick={() => setIsEditingProfile(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

        </Row>
      </Container>
    );
  }

  return (
    <>
      <div className="dashboard-container">
        <div
          className="mobile-toggle d-flex d-md-none"
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
              className={`menu-item ${activeNavItem === "poojaTiming" ? "active" : ""}`}
              onClick={() => handleNavItemClick("poojaTiming")}
            >
              <FaLink size={20} />
              <span>Pooja Timing</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "bookings" ? "active" : ""}`}
              onClick={() => handleNavItemClick("bookings")}
            >
              <FaCalendarAlt size={20} />
              <span>Completed Pooja</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "punditProfile" ? "active" : ""}`}
              onClick={() => handleNavItemClick("punditProfile")}
            >
              <FaUserCircle size={20} />
              <span>Pundit Profile</span>
            </div>
            <div className="mt-auto">
              <div className="menu-item logout" onClick={handleLogout}>
                <MdLogout size={22} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`sidebar col-12 position-sticky col-lg-2 ${showSidebar ? "show" : "hide"} d-none d-lg-block`}
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
              className={`menu-item ${activeNavItem === "poojaTiming" ? "active" : ""}`}
              onClick={() => handleNavItemClick("poojaTiming")}
            >
              <FaLink size={20} />
              <span>Pooja Timing</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "bookings" ? "active" : ""}`}
              onClick={() => handleNavItemClick("bookings")}
            >
              <FaCalendarAlt size={20} />
              <span>Completed Pooja</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "punditProfile" ? "active" : ""}`}
              onClick={() => handleNavItemClick("punditProfile")}
            >
              <FaUserCircle size={20} />
              <span>Pundit Profile</span>
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
            <div className="search-bar d-md-inline d-none ">
              <input type="text" placeholder="Search for poojas, priests, temples..." className="form-control d-none" />
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="nav-right">
              <div
                className="user-profile me-2 me-md-3"
                onClick={() => handleNavItemClick("punditProfile")}
              >
                <FaUserCircle size={24} />
                <span className="user-name">{user.fullName}</span>
              </div>
              <div
                className="notification-bell"
                ref={bellRef}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <MdNotifications size={24} />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
                {showNotifications && (
                  <div className="notification-popup">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 3).map((item, index) => (
                        <div key={index} className="notification-item">
                          <div>
                            <h4 className="popup-heading border-0">{item.heading}</h4>
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
};

export default PanditDashboard;