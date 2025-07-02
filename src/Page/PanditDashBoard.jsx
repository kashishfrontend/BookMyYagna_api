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
import { createSelector } from 'reselect';
import { logoutPandit, resetLogoutPanditState } from "../redux/action/panditAuthAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../Api/axios/axios_config";

// Memoized selector for pandit state
const selectPanditState = createSelector(
  [(state) => state.panditauth], // Changed to panditauth
  (pandit) => pandit || {}
);

// Memoized selector for debugging store keys
const selectStoreKeys = createSelector(
  [(state) => state],
  (state) => Object.keys(state)
);

const PanditDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use memoized selector for pandit state
  const panditState = useSelector(selectPanditState);
  const { user: authUser, isPanditAuthenticated, error: logoutError } = panditState;

  // Debug store configuration
  const storeKeys = useSelector(selectStoreKeys);
  useEffect(() => {
    if (!panditState) { // Changed to check panditState directly
      console.warn(
        "Redux state.panditauth is undefined. Check store configuration in store.js. " +
        "Expected panditAuthReducer to be registered under 'panditauth'. " +
        "Current state keys: " + JSON.stringify(storeKeys)
      );
    }
  }, [storeKeys]);

  const [showSidebar, setShowSidebar] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [completedPuja, setCompletedPuja] = useState([]);
  const [confirmedPoojas, setConfirmedPoojas] = useState([]);
  const [notifications, setNotifications] = useState([]); // Static or replace with API
  const [popupStates, setPopupStates] = useState({});
  const [copyStates, setCopyStates] = useState({});
  const [bookedPuja, setBookedPuja] = useState([]);
  const [user, setUser] = useState(authUser || {
    fullName: "Pandit Ji",
    email: "panditji@example.com",
    phoneNumber: "9876543210",
    address: "123 Temple Street, Varanasi, Uttar Pradesh, India",
    expertise: "Vedic Astrology, Ganesh Pooja, Shiv Pooja, Durga Pooja"
  });
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth <= 991);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef();

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

  // Update user when authUser changes
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isPanditAuthenticated === false) {
      navigate('/panditlogin');
    }
  }, [isPanditAuthenticated, navigate]);

  // Show logout error toast
  useEffect(() => {
    if (logoutError) {
      toast.error(logoutError);
      dispatch(resetLogoutPanditState());
    }
  }, [logoutError, dispatch]);

  // Fetch confirmed poojas for Pooja Timing
  useEffect(() => {
    const fetchConfirmedPoojas = async () => {
      try {
        const response = await axios.post(
          '/bookings/allBookingPandit',
          {
            startDate: "",
            endDate: "",
            status: "Confirmed"
          }
        );

        console.log('Confirmed Poojas Response:', response.data);
        if (response.data.success) {
          setConfirmedPoojas(response.data.data);
        } else {
          toast.error('Failed to fetch confirmed poojas');
        }
      } catch (err) {
        console.error('Error fetching confirmed poojas:', err);
        toast.error('Error fetching confirmed poojas. Please try again.');
      }
    };

    if (isPanditAuthenticated) {
      fetchConfirmedPoojas();
    }
  }, [isPanditAuthenticated]);

  // Fetch completed poojas
  useEffect(() => {
    const fetchCompletedPoojas = async () => {
      try {
        const response = await axios.post(
          '/bookings/allBookingPandit',
          {
            startDate: "",
            endDate: "",
            status: "Completed"
          }
        );

        console.log('Completed Poojas Response:', response.data);
        if (response.data.success) {
          setCompletedPuja(response.data.data);
        } else {
          toast.error('Failed to fetch completed poojas');
        }
      } catch (err) {
        console.error('Error fetching completed poojas:', err);
        toast.error('Error fetching completed poojas. Please try again.');
      }
    };

    if (isPanditAuthenticated) {
      fetchCompletedPoojas();
    }
  }, [isPanditAuthenticated]);

  // Fetch all booked poojas for dashboard
  useEffect(() => {
    const fetchBookedPoojas = async () => {
      try {
        const response = await axios.post(
          '/bookings/allBookingPandit',
          {
            startDate: "",
            endDate: "",
            status: "Cancelled"
          }
        );

        console.log('Booked Poojas Response:', response.data);
        if (response.data.success) {
          setBookedPuja(response.data.data);
        } else {
          toast.error('Failed to fetch booked poojas');
        }
      } catch (err) {
        console.error('Error fetching booked poojas:', err);
        toast.error('Error fetching booked poojas. Please try again.');
      }
    };

    if (isPanditAuthenticated) {
      fetchBookedPoojas();
    }
  }, [isPanditAuthenticated]);

  // getPanditPtrofile
  // const [user, setUser] = useState({});
  // const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanditProfile = async () => {
      try {
        const response = await axios.get('/pandit/getPanditProfile', {
          withCredentials: true
        });

        if (response.data.success) {
          const pandit = response.data.pandit;

          setUser({
            id: pandit._id,
            fullName: pandit.name,
            email: pandit.email,
            phoneNumber: pandit.contactNumber,
            address: '', // Not provided in API, optional
            expertise: pandit.poojaTypes.join(', '), // Pooja types as string
            poojaTypes: pandit.poojaTypes,           // Pooja types as array (for edit forms)
            rating: pandit.rating,
            experience: pandit.experience,
            languages: pandit.language,              // Languages as array
            image: pandit.image,
            role: pandit.role,
            createdAt: pandit.createdAt,
            updatedAt: pandit.updatedAt
          });


        } else {
          toast.error('Failed to load profile.');
        }
      } catch (error) {
        toast.error('Error fetching profile.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanditProfile();
  }, []);


  // Handle logout
  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    try {
      console.log('Initiating pandit logout');
      const result = await dispatch(logoutPandit());
      if (result.payload?.success) {
        console.log('Pandit logout successful');
        toast.dismiss(toastId);
        toast.success(result.payload.message || 'Logout successful!');
        dispatch(resetLogoutPanditState());
        navigate('/panditlogin');
      } else {
        throw new Error(result.payload?.error || 'Logout failed');
      }
    } catch (err) {
      console.error('Pandit logout error:', err);
      toast.dismiss(toastId);
      toast.error(err.message || 'Failed to logout. Please try again or contact support.');
      console.warn('Note: Logout uses GET /user/logoutUser, which may be incorrect. Expected POST /pandit/logoutPandit.');
    }
  };

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    if (window.innerWidth < 992) {
      setShowSidebar(false);
    }
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((item) => item._id !== id));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        '/pandit/updateProfile', // Replace with actual endpoint
        user,
      );
      if (response.data.success) {
        toast.success('Profile updated successfully');
        setIsEditingProfile(false);
      } else {
        toast.error('Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error('Error updating profile. Please try again.');
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
        return renderCompletedPoojaDetails();
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

  function renderCompletedPoojaDetails() {
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
                {completedPuja.length > 0 ? (
                  completedPuja.map((data, index) => (
                    <tr key={index}>
                      <td>{data.userId?.fullName || data.name || 'N/A'}</td>
                      <td>{data.planId?.heading || 'N/A'}</td>
                      <td>{data.planId?.amount || 'N/A'}</td>
                      <td>{data.phoneNumber || 'N/A'}</td>
                      <td>{data.address || 'N/A'}</td>
                      <td>{data.status || 'N/A'}</td>
                      <td>{data.poojaMode || 'N/A'}</td>
                      <td>
                        {data.dateOfDelivery ? new Date(data.dateOfDelivery).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        }) : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No completed poojas available.</td>
                  </tr>
                )}
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
                  <h2>{bookedPuja.filter(p => p.status === 'Confirmed' || p.status === 'Pending').length}</h2>
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
              {bookedPuja.map((data, index) => (
                <tr key={index}>
                  <td>{data.userId?.fullName || data.name || 'N/A'}</td>
                  <td>{data.planId?.heading || 'N/A'}</td>
                  <td>{data.planId?.amount || 'N/A'}</td>
                  <td>{data.phoneNumber || 'N/A'}</td>
                  <td>{data.address || 'N/A'}</td>
                  <td>{data.status || 'N/A'}</td>
                  <td>{data.poojaMode || 'N/A'}</td>
                  <td>
                    {data.dateOfDelivery ? new Date(data.dateOfDelivery).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    }) : 'N/A'}
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
                    <tr key={p._id}>
                      <td>
                        {p.dateOfDelivery ? new Date(p.dateOfDelivery).toLocaleDateString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        }) : 'N/A'}
                      </td>
                      <td>{p.poojaId?.heading || p.planId?.heading || 'N/A'}</td>
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
                              onClick={() => setPopupStates(prev => ({ ...prev, [p._id]: true }))}
                              className="rounded-circle"
                              aria-label="View Pooja Link Details"
                            >
                              <FaInfoCircle size={16} />
                            </Button>
                            <Modal
                              show={popupStates[p._id]}
                              onHide={() => setPopupStates(prev => ({ ...prev, [p._id]: false }))}
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
                                      setCopyStates(prev => ({ ...prev, [p._id]: true }));
                                      setTimeout(() => setCopyStates(prev => ({ ...prev, [p._id]: false })), 2000);
                                    }}
                                  >
                                    <FaCopy size={16} />
                                  </Button>
                                </div>
                                {copyStates[p._id] && (
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
          <Card className="stats-card p-4">
            <div className="d-flex align-items-center mb-4">
              <img
                src={user.image || 'https://via.placeholder.com/60'} // fallback image
                alt="Pandit"
                className="rounded-circle me-3"
                style={{ width: 60, height: 60, objectFit: 'cover', border: '2px solid #FF7722' }}
              />
              <div>
                <h3 className="mb-1">{user.fullName}</h3>
                <p className="mb-0 text-muted" style={{ fontSize: '0.9rem' }}>{user.role || 'Pandit'}</p>
              </div>
            </div>

            <Card.Body>
              {isEditingProfile ? (
                <Form className="row" onSubmit={handleProfileSubmit}>
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
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Expertise (Pooja Types)</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="expertise"
                      value={user.expertise}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Languages</Form.Label>
                    <Form.Control
                      type="text"
                      name="languages"
                      value={user.languages?.join(', ') || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Experience (Years)</Form.Label>
                    <Form.Control
                      type="number"
                      name="experience"
                      value={user.experience || ''}
                      onChange={handleInputChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      type="number"
                      name="rating"
                      value={user.rating || ''}
                      readOnly
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end mt-4">
                    <Button variant="danger" className="me-2" onClick={() => setIsEditingProfile(false)}>
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
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                  <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                  <p><strong>Expertise:</strong> {user.expertise}</p>
                  <p><strong>Languages:</strong> {user.languages?.join(', ') || 'N/A'}</p>
                  <p><strong>Experience:</strong> {user.experience} years</p>
                  <p><strong>Rating:</strong> {user.rating} / 5</p>

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
          className="mobile-toggle d-flex d-lg-none"
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
            <div className="search-bar d-md-inline d-none">
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