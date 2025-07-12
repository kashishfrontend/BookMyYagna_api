import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  CloseButton,
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
  FaMoneyBill,
} from "react-icons/fa";
import {
  MdDashboard,
  MdLogout,
  MdNotifications,
  MdClose,
  MdDelete,
  MdOutlineMoney,
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../assets/css/Dashbord.css";
import axios from "../../Api/axios/axios_config";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../redux/action/authAction";
import { Link, useNavigate } from "react-router-dom";
import { CCloseButton } from "@coreui/react";
import { GiClosedBarbute } from "react-icons/gi";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable"; // Updated import
import toast from "react-hot-toast";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [completedPuja, setCompletePuja] = useState([]);
  const bellRef = useRef();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [popupStates, setPopupStates] = useState({});
  const [copyStates, setCopyStates] = useState({});
  const [user, setUser] = useState(null);
  const [bookedPuja, setBookedPuja] = useState([]);
  const [confirmedPoojas, setConfirmedPoojas] = useState([]);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth <= 991);
  const [payments, setPayments] = useState([]);



  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 300,
      offset: 10, // animation duration in ms
      // once: true,     // animation happens only once on scroll
    });
  }, [renderPoojaLink]);
  // Fetch user profile
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

  // Fetch notifications
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

  // Fetch booked and completed poojas
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

  // Fetch confirmed poojas
  useEffect(() => {
    const fetchConfirmedPoojas = async () => {
      try {
        const { data: res } = await axios.post("/bookings/getAllBookingForUser", {
          startDate: '',
          endDate: '',
          status: ''
        });

        if (res.success) {
          const confirmed = res.data
            .filter(b => b.status === 'Confirmed' && b.poojaLink)
            .map(b => ({
              id: b._id,
              heading: b.poojaId?.heading || b.planId?.heading || 'Unknown',
              confirmedAt: b.updatedAt,
              dateOfDelivery: b.dateOfDelivery,
              poojaLink: b.poojaLink,
              poojaLinkTime: b.poojaLinkTime
            }));

          setConfirmedPoojas(confirmed);
        }
      } catch (e) {
        console.error("Error fetching bookings:", e);
      }
    };

    fetchConfirmedPoojas();
  }, []);

  // Fetch payment data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/receipt/getAllPaymentsUser");
        if (response.data.success) {
          setPayments(response.data.payments);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };
    fetchPayments();
  }, []);

  const handleDownload = (payment) => {
    try {
      const doc = new jsPDF();
      // console.log("jsPDF instance:", doc); // Debug jsPDF instance
      // console.log("jsPDF setFontSize available:", typeof doc.setFontSize); // Debug setFontSize

      // Set document title
      doc.setFontSize(18);
      doc.text("Payment Receipt - BookmyYagna", 14, 22);

      // Prepare table data
      const tableData = [
        ["Order ID", payment.razorpay_order_id || "N/A"],
        ["Amount", payment.amount ? `${payment.amount / 100} ${payment.currency}` : "N/A"],
        ["Currency", payment.currency || "N/A"],
        ["Status", payment.status ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1) : "N/A"],
        ["Date", payment.createdAt ? new Date(payment.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }) : "N/A"],
        ["Phone Number", payment.phoneNumber || "N/A"],
        ["Email", payment.email || "N/A"],
        ["Payment ID", payment.razorpay_payment_id || "N/A"],
      ];

      // Generate table
      autoTable(doc, {
        startY: 30,
        body: tableData,
        theme: 'striped',
        styles: { fontSize: 12 },
        headStyles: { fillColor: [255, 140, 0] }, // Orange header
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 100 },
        },
      });

      // Save PDF
      doc.save(`receipt-${payment.razorpay_order_id || 'payment'}.pdf`);
    } catch (error) {
      console.error("Error generating PDF receipt:", error);
      alert("Failed to generate receipt. Please try again.");
    }
  };

  // Handle mobile/tablet detection
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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    if (window.innerWidth < 992) {
      setShowSidebar(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`/user/editUser`, {
        fullName: user.fullName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        country: user.country,
      });

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        setShowProfileModal(false);
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
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
      case "book":
        return renderMyBookedDetals();
      case "notifications":
        return renderNotifications();
      case "Pooja Link":
        return renderPoojaLink();
      case "Payment":
        return renderPayment();
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

  return (
    <>
      <div className="dashboard-container">
        <div
          className="mobile-toggle d-flex d-lg-none"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <MdClose size={24} /> : <FaBars size={24} />}
        </div>
        <div
          className={`sidebar d-block d-lg-none ${showSidebar ? "active" : ""}`}
        >
          <div className="logo-container">
            <h2 className="logo ">BookmyYagna</h2>
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
              <span>Completed Puja</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "Pooja Link" ? "active" : ""}`}
              onClick={() => handleNavItemClick("Pooja Link")}
            >
              <FaLink size={20} />
              <span>Puja Link</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "Payment" ? "active" : ""}`}
              onClick={() => handleNavItemClick("Payment")}
            >
              <FaMoneyBill size={20} />
              <span>Payment</span>
            </div>
            <div className="mt-auto">
              <div className="menu-item logout" onClick={() => handleLogout()}>
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
            <h2 className="logo "><Link className="logo text-decoration-none" to={'/'}>BookmyYagna</Link></h2>
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
              <span>Booked Puja</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "bookings" ? "active" : ""}`}
              onClick={() => handleNavItemClick("bookings")}
            >
              <FaCalendarAlt size={20} />
              <span>Completed Puja</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "Pooja Link" ? "active" : ""}`}
              onClick={() => handleNavItemClick("Pooja Link")}
            >
              <FaLink size={20} />
              <span>Puja Link</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === "Payment" ? "active" : ""}`}
              onClick={() => handleNavItemClick("Payment")}
            >
              <FaMoneyBill size={20} />
              <span>Payment</span>
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
            <div className="search-bar d-none d-md-flex">
              {/* <input type="text" placeholder="Search for poo" /> */}
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
              <div>
                <Col>
                  <Form onSubmit={handleProfileSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
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

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={user?.phoneNumber || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={user?.address || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={user?.country || ''}
                        onChange={handleInputChange}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end mt-4">
                      <Button variant="danger" className="me-2" onClick={() => setShowProfileModal(false)}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        style={{
                          backgroundImage: 'linear-gradient(15deg, #ff8c00, #b22222, #fdd835)',
                          border: 'none',
                        }}
                      >
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
      <div className="container py-3 py-md-5  margin-class" >
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2>All Notifications</h2>
          </div>
          <div className="table-responsive col-md-10">
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
      <div className="container py-3 py-md-5 margin-class" data-aos="zoom-in" data-aos-delay="100">
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2>Booked Puja</h2>
          </div>
          <div className="table-responsive d-flex justify-content-center align-items-center ">
            <table className="custom-table table table-bordered table-striped">
              <thead className="table-warning">
                <tr>
                  <th>Account Name</th>
                  <th>Plan Name</th>
                  <th>Amount</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Puja Mode</th>
                  <th>Date of Puja</th>
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

  function renderCompletedPoojaDetals() {
    return (
      <div className="container py-3 py-md-5 margin-class" data-aos="zoom-in" data-aos-delay="100">
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2>Completed Puja</h2>
          </div>
          <div className="table-responsive d-flex justify-content-center align-items-center">
            <table className="custom-table table table-bordered table-striped">
              <thead className="table-warning">
                <tr>
                  <th>Account Name</th>
                  <th>Plan Name</th>
                  <th>Amount</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Puja Mode</th>
                  <th>Date of Puja</th>
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
      <Container fluid className="dashboard-content py-3 py-md-5 margin-class col-md-10" >
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
        <Row className="stats-row col-md-11">
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
                  <h5>Upcoming Pujas</h5>
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
                  <h5>Completed Pujas</h5>
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
          <div className="text-center col-md-10">
            <h2 className="text-center">Booked Puja</h2>
          </div>
        </div>
        <div className="table-responsive col-md-10">
          <table className="custom-table table table-bordered table-striped">
            <thead className="table-warning">
              <tr>
                <th>Account Name</th>
                <th>Plan Name</th>
                <th>Amount</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Status</th>
                <th>Puja Mode</th>
                <th>Date of Puja</th>
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

  function renderPoojaLink() {
    const handleTogglePopup = (id) => {
      setPopupStates((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const handleCopyLink = (id, poojaLink) => {
      navigator.clipboard.writeText(poojaLink);
      setCopyStates((prev) => ({
        ...prev,
        [id]: true,
      }));
      setTimeout(() => {
        setCopyStates((prev) => ({
          ...prev,
          [id]: false,
        }));
      }, 2000);
    };

    return (
      <div className="container py-5 margin-class" data-aos="zoom-in">
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2 className="fs-2">Puja Link</h2>
          </div>
          <div className={isMobileOrTablet ? 'table-responsive col-md-10' : 'd-flex justify-content-center align-items-center'}>
            <table className="custom-table table-bordered table-striped  ">
              <thead className="table-warning">
                <tr>
                  <th>Date Of Puja</th>
                  <th>Puja Id</th>
                  <th>Puja Time</th>
                  <th>Link Puja</th>
                </tr>
              </thead>
              <tbody>
                {confirmedPoojas.length > 0 ? (
                  confirmedPoojas.map((p) => (
                    <tr key={p.id}>
                      <td>{new Date(p.dateOfDelivery).toLocaleDateString()}</td>
                      <td>{p.id}</td>
                      <td>{p.poojaLinkTime || '—'}</td>
                      <td className="pooja-link-cell">
                        {p.poojaLink ? (
                          <div className="pooja-link-container">
                            <a
                              className="pooja-view-button"
                              href={p.poojaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View
                            </a>
                            <button
                              className="pooja-info-button"
                              onClick={() => handleTogglePopup(p.id)}
                              aria-label="View Details"
                            >
                              <FaInfoCircle size={20} />
                            </button>
                            {popupStates[p.id] && (
                              <div className="pooja-popup">
                                <button
                                  className="pooja-close-button"
                                  onClick={() => handleTogglePopup(p.id)}
                                  aria-label="Close"
                                >
                                  <CloseButton size={24} />
                                </button>
                                <h2 className="pooja-popup-heading">
                                  Your Google Meet Link
                                </h2>
                                <div className="pooja-link-wrapper">
                                  <a
                                    className="pooja-link-text"
                                    href={p.poojaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {p.poojaLink}
                                  </a>
                                  <button
                                    className="pooja-copy-button"
                                    onClick={() => handleCopyLink(p.id, p.poojaLink)}
                                    aria-label="Copy Link"
                                  >
                                    <FaCopy size={16} />
                                  </button>
                                </div>
                                {copyStates[p.id] && (
                                  <div className="pooja-copied-notification">
                                    Copied!
                                  </div>
                                )}
                              </div>
                            )}
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

  function renderPayment() {
    return (
      <div className="container py-3 py-md-5 margin-class" data-aos="zoom-in" data-aos-delay="100">
        <div className="row">
          <div className="text-center fs-1 mb-3">
            <h2>Payment History</h2>
          </div>
          <div className={isMobileOrTablet ? 'table-responsive' : 'd-flex justify-content-center align-items-center'}>
            <table className="custom-table table table-bordered table-striped">
              <thead className="table-warning">
                <tr>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment.razorpay_order_id || "N/A"}</td>
                      <td>{payment.amount ? `${payment.amount / 100} ${payment.currency}` : "N/A"}</td>
                      <td>{payment.currency || "N/A"}</td>
                      <td>
                        <span className={`status-${payment.status?.toLowerCase() || 'unknown'}`}>
                          {payment.status ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1) : "Unknown"}
                        </span>
                      </td>
                      <td>
                        {payment.createdAt ? new Date(payment.createdAt).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
                        }) : "N/A"}
                      </td>
                      <td>{payment.phoneNumber || "N/A"}</td>
                      <td>{payment.email || "N/A"}</td>
                      <td>
                        {payment.status?.toLowerCase() === 'success' ? (
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleDownload(payment)}
                            title="Download Receipt"
                          >
                            <Download size={20} />
                          </Button>
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No payment history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
}

export default Dashboard;
