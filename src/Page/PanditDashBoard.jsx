import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { MdDashboard, MdLogout, MdNotifications, MdClose, MdDelete } from 'react-icons/md';
import { FaLink, FaCalendarAlt, FaUserCircle, FaBars } from 'react-icons/fa';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { logoutPandit, resetLogoutPanditState } from '../redux/action/panditAuthAction';
import axios from '../Api/axios/axios_config';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/PanditDashboard.css';

// Memoized selectors
const selectPanditState = createSelector(
  [(state) => state.panditauth],
  (pandit) => pandit || {}
);

const selectStoreKeys = createSelector(
  [(state) => state],
  (state) => Object.keys(state)
);

const PanditDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bellRef = useRef();
  const panditState = useSelector(selectPanditState);
  const { user: authUser, isPanditAuthenticated, error: logoutError } = panditState;

  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 991);
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [completedPuja, setCompletedPuja] = useState([]);
  const [confirmedPoojas, setConfirmedPoojas] = useState([]);
  const [bookedPuja, setBookedPuja] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState(null);
  const [user, setUser] = useState(authUser || {
    fullName: 'Pandit Ji',
    email: 'panditji@example.com',
    phoneNumber: '9876543210',
    address: '123 Temple Street, Varanasi, Uttar Pradesh, India',
    expertise: 'Vedic Astrology, Ganesh Pooja, Shiv Pooja, Durga Pooja',
  });

  // Debug store configuration
  const storeKeys = useSelector(selectStoreKeys);
  useEffect(() => {
    if (!panditState) {
      console.warn(
        'Redux state.panditauth is undefined. Check store configuration in store.js. ' +
        'Expected panditAuthReducer to be registered under "panditauth". ' +
        'Current state keys: ' + JSON.stringify(storeKeys)
      );
    }
  }, [storeKeys]);

  // Handle sidebar responsiveness
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 991;
      setShowSidebar(!isMobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Redirect if not authenticated
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

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setNotifLoading(true);
      setNotifError(null);
      try {
        const response = await axios.get('/notification/getAllNotifications');
        if (response.data.success) {
          setNotifications(response.data.notifications || []);
        } else {
          throw new Error('Failed to fetch notifications');
        }
      } catch (error) {
        setNotifError(error.message || 'Error fetching notifications');
        console.error('Error fetching notifications:', error);
      } finally {
        setNotifLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (id) => {
    const toastId = toast.loading('Deleting notification...');
    try {
      await axios.delete(`/notification/deleteNotification/${id}`);
      setNotifications((prev) => prev.filter((notification) => notification._id !== id));
      toast.dismiss(toastId);
      toast.success('Notification deleted successfully');
    } catch (error) {
      toast.dismiss(toastId);
      toast.error('Failed to delete notification');
      console.error('Error deleting notification:', error);
    }
  };

  const handleOpenNotification = async (id) => {
    try {
      const response = await axios.get(`/notification/getNotificationById/${id}`);
      if (response.data.success) {
        setSelectedNotification(response.data.notification || response.data);
        setShowModal(true);
        setShowNotifications(false);
      } else {
        throw new Error('Failed to load notification');
      }
    } catch (err) {
      toast.error('Failed to load notification');
      console.error('Error opening notification:', err);
    }
  };

  // Fetch confirmed poojas
  useEffect(() => {
    const fetchConfirmedPoojas = async () => {
      try {
        const response = await axios.post('/bookings/allBookingPandit', {
          startDate: '',
          endDate: '',
          status: 'Confirmed',
        });
        console.log('Confirmed Poojas Response:', response.data);
        if (response.data.success) {
          setConfirmedPoojas(response.data.data || []);
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
        const response = await axios.post('/bookings/allBookingPandit', {
          startDate: '',
          endDate: '',
          status: 'Completed',
        });
        console.log('Completed Poojas Response:', response.data);
        if (response.data.success) {
          setCompletedPuja(response.data.data || []);
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

  // Fetch booked poojas
  useEffect(() => {
    const fetchBookedPoojas = async () => {
      try {
        const response = await axios.post('/bookings/allBookingPandit', {
          startDate: '',
          endDate: '',
          status: 'Cancelled',
        });
        console.log('Booked Poojas Response:', response.data);
        if (response.data.success) {
          setBookedPuja(response.data.data || []);
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

  // Fetch pandit profile
  useEffect(() => {
    const fetchPanditProfile = async () => {
      try {
        const response = await axios.get('/pandit/getPanditProfile', {
          withCredentials: true,
        });
        if (response.data.success) {
          const pandit = response.data.pandit;
          setUser({
            id: pandit._id,
            fullName: pandit.name,
            email: pandit.email,
            phoneNumber: pandit.contactNumber,
            address: '',
            expertise: pandit.poojaTypes.join(', '),
            poojaTypes: pandit.poojaTypes,
            rating: pandit.rating,
            experience: pandit.experience,
            languages: pandit.language,
            image: pandit.image,
            role: pandit.role,
            createdAt: pandit.createdAt,
            updatedAt: pandit.updatedAt,
          });
        } else {
          toast.error('Failed to load profile.');
        }
      } catch (error) {
        toast.error('Error fetching profile.');
        console.error(error);
      }
    };
    fetchPanditProfile();
  }, []);

  // Handle click outside to close notification popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavItemClick = (navItem) => {
    setActiveNavItem(navItem);
    if (window.innerWidth < 992) {
      setShowSidebar(false);
    }
  };

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
      toast.error('Failed to logout. Please try again or contact support. Possible issue: Invalid token or incorrect endpoint.');
      console.warn('Note: Logout uses GET /user/logoutUser, which may be incorrect. Expected POST /pandit/logoutPandit.');
    }
  };


  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/pandit/updateProfile', user);
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

  const renderNotifications = () => (
    <Container className="py-4">
      <h2 className="text-center mb-4">All Notifications</h2>
      <Card className="shadow-sm">
        <Card.Body>
          {notifLoading && <p className="text-center text-muted">Loading notifications...</p>}
          {notifError && <p className="text-center text-danger">{notifError}</p>}
          {!notifLoading && notifications.length === 0 && (
            <p className="text-center text-muted">No notifications available.</p>
          )}
          {notifications.length > 0 && (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-header">
                  <tr>
                    <th>Heading</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((item) => (
                    <tr key={item._id}>
                      <td
                        className="cursor-pointer"
                        onClick={() => handleOpenNotification(item._id)}
                      >
                        {item.heading}
                      </td>
                      <td>{item.message}</td>
                      <td>
                        {new Date(item.createdAt).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );

  const renderContent = () => {
    switch (activeNavItem) {
      case 'dashboard':
        return renderDashboardContent();
      case 'bookings':
        return renderCompletedPoojaDetails();
      case 'poojaTiming':
        return renderPoojaLink();
      case 'notifications':
        return renderNotifications();
      case 'punditProfile':
        return renderPunditProfile();
      default:
        return (
          <Container className="py-4 text-center">
            <h3>Coming Soon</h3>
            <p className="text-muted">This section is under development.</p>
          </Container>
        );
    }
  };

  const renderDashboardContent = () => (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12}>
          <h1 className="welcome-heading">
            <span className="namaste">नमस्ते</span>, {user.fullName.split(' ')[0]}!
          </h1>
          <p className="welcome-subtext">Welcome back to your spiritual journey</p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} sm={6} md={4} className="mb-3">
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
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="stats-card">
            <Card.Body>
              <div className="stats-icon">
                <FaCalendarAlt />
              </div>
              <div className="stats-info">
                <h5>Completed Poojas</h5>
                <h2>{completedPuja.length}</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="stats-card">
            <Card.Body>
              <div className="stats-icon">
                <FaCalendarAlt />
              </div>
              <div className="stats-info">
                <h5>Notifications</h5>
                <h2>{notifications.length}</h2>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <h2 className="mb-4">All Poojas</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-header">
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
                {bookedPuja.map((data) => (
                  <tr key={data._id}>
                    <td>{data.userId?.fullName || data.name || 'N/A'}</td>
                    <td>{data.planId?.heading || 'N/A'}</td>
                    <td>{data.planId?.amount || 'N/A'}</td>
                    <td>{data.phoneNumber || 'N/A'}</td>
                    <td>{data.address || 'N/A'}</td>
                    <td>{data.status || 'N/A'}</td>
                    <td>{data.poojaMode || 'N/A'}</td>
                    <td>
                      {data.dateOfDelivery
                        ? new Date(data.dateOfDelivery).toLocaleString('en-IN', {
                          timeZone: 'Asia/Kolkata',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })
                        : 'N/A'}
                    </td>
                    <td>
                      {data.poojaLink ? (
                        <div className="d-flex align-items-center gap-2">
                          <a
                            href={data.poojaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => setPopupStates((prev) => ({ ...prev, [data._id]: true }))}
                          >
                            <FaLink size={16} />
                          </Button>
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
        </Card.Body>
      </Card>
    </Container>
  );

  const renderCompletedPoojaDetails = () => (
    <Container className="py-4">
      <h2 className="mb-4">Completed Pooja</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-header">
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
                  completedPuja.map((data) => (
                    <tr key={data._id}>
                      <td>{data.userId?.fullName || data.name || 'N/A'}</td>
                      <td>{data.planId?.heading || 'N/A'}</td>
                      <td>{data.planId?.amount || 'N/A'}</td>
                      <td>{data.phoneNumber || 'N/A'}</td>
                      <td>{data.address || 'N/A'}</td>
                      <td>{data.status || 'N/A'}</td>
                      <td>{data.poojaMode || 'N/A'}</td>
                      <td>
                        {data.dateOfDelivery
                          ? new Date(data.dateOfDelivery).toLocaleString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })
                          : 'N/A'}
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
        </Card.Body>
      </Card>
    </Container>
  );

  const renderPoojaLink = () => (
    <Container className="py-4">
      <h2 className="mb-4">Pooja Timing</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-header">
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
                        {p.dateOfDelivery
                          ? new Date(p.dateOfDelivery).toLocaleDateString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })
                          : 'N/A'}
                      </td>
                      <td>{p.poojaId?.heading || p.planId?.heading || 'N/A'}</td>
                      <td>{p.poojaLinkTime || '—'}</td>
                      <td>
                        {p.poojaLink ? (
                          <div className="d-flex align-items-center gap-2">
                            <a
                              href={p.poojaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm"
                            >
                              View
                            </a>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => setPopupStates((prev) => ({ ...prev, [p._id]: true }))}
                            >
                              <FaLink size={16} />
                            </Button>
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
        </Card.Body>
      </Card>
    </Container>
  );

  const renderPunditProfile = () => (
    <Container className="py-4">
      <h1 className="welcome-heading">Pundit Profile</h1>
      <p className="welcome-subtext">Manage your personal and professional details</p>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex align-items-center mb-4">
            <img
              src={user.image || 'https://via.placeholder.com/60'}
              alt="Pandit"
              className="rounded-circle me-3"
              style={{ width: 60, height: 60, objectFit: 'cover', border: '2px solid #FF7722' }}
            />
            <div>
              <h3 className="mb-1">{user.fullName}</h3>
              <p className="mb-0 text-muted">{user.role || 'Pandit'}</p>
            </div>
          </div>
          {isEditingProfile ? (
            <Form onSubmit={handleProfileSubmit}>
              <Row>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={user.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={user.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label>Expertise</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="expertise"
                    value={user.expertise}
                    onChange={handleInputChange}
                    rows={2}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label>Languages</Form.Label>
                  <Form.Control
                    type="text"
                    name="languages"
                    value={user.languages?.join(', ') || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label>Experience (Years)</Form.Label>
                  <Form.Control
                    type="number"
                    name="experience"
                    value={user.experience || ''}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={user.rating || ''}
                    readOnly
                  />
                </Form.Group>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="danger"
                    className="me-2"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </Row>
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
                variant="primary"
                onClick={() => setIsEditingProfile(true)}
              >
                Edit Profile
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );

  return (
    <>
      <div className="dashboard-container">
        <div
          className="mobile-toggle d-flex d-lg-none p-3"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <MdClose size={24} /> : <FaBars size={24} />}
        </div>
        <div
          className={`sidebar col-12 col-lg-2 position-sticky ${showSidebar ? 'd-block' : 'd-none'} d-lg-block`}
        >
          <div className="logo-container p-4">
            <h2 className="logo">BookmyYagna</h2>
          </div>
          <div className="sidebar-menu">
            <div
              className={`menu-item ${activeNavItem === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleNavItemClick('dashboard')}
            >
              <MdDashboard size={22} />
              <span>Dashboard</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === 'poojaTiming' ? 'active' : ''}`}
              onClick={() => handleNavItemClick('poojaTiming')}
            >
              <FaLink size={20} />
              <span>Pooja Timing</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === 'bookings' ? 'active' : ''}`}
              onClick={() => handleNavItemClick('bookings')}
            >
              <FaCalendarAlt size={20} />
              <span>Completed Pooja</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === 'punditProfile' ? 'active' : ''}`}
              onClick={() => handleNavItemClick('punditProfile')}
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
        <div className={`main-content col-12 col-lg-10 ${showSidebar ? '' : 'expanded'}`}>
          <div className="top-nav d-flex justify-content-between align-items-center p-4">
            <div className="search-bar d-none d-md-flex align-items-center">
              <Form.Control
                type="text"
                placeholder="Search for poojas, priests, temples..."
                className="rounded-start"
              />
              <Button variant="primary" className="rounded-end">
                <i className="fas fa-search"></i>
              </Button>
            </div>
            <div className="d-flex align-items-center">
              <div
                className="user-profile me-3 cursor-pointer"
                onClick={() => handleNavItemClick('punditProfile')}
              >
                <span className="user-name">{user.fullName || 'Pandit Ji'}</span>
              </div>
              <div
                className="notification-bell position-relative cursor-pointer"
                ref={bellRef}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <MdNotifications size={24} />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
                {showNotifications && (
                  <div className="notification-popup">
                    {notifLoading && <p className="text-center text-muted p-3">Loading...</p>}
                    {notifError && <p className="text-center text-danger p-3">{notifError}</p>}
                    {notifications.length > 0 ? (
                      notifications.slice(0, 3).map((item, index) => (
                        <div
                          key={item._id}
                          className="notification-item"
                          onClick={() => handleOpenNotification(item._id)}
                        >
                          <h4 className="popup-heading">{item.heading}</h4>
                          <p className="popup-time">
                            {new Date(item.createdAt).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                              timeZone: 'Asia/Kolkata',
                            })}
                          </p>
                          {index !== notifications.slice(0, 3).length - 1 && (
                            <hr className="notification-separator" />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="popup-message">No new notifications.</p>
                    )}
                    <div className="text-center">
                      <Button
                        variant="link"
                        className="view-all-btn"
                        onClick={() => {
                          setShowNotifications(false);
                          handleNavItemClick('notifications');
                        }}
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {renderContent()}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            centered
            animation
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">
                {selectedNotification?.heading || 'Notification'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{selectedNotification?.message || 'No message available.'}</p>
              <p className="text-muted small">
                {selectedNotification?.createdAt
                  ? new Date(selectedNotification.createdAt).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })
                  : 'N/A'}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <footer className="dashboard-footer">
        <div className="footer-content text-center">
          <p className="m-0">© 2025 Innovize Tech All rights reserved.</p>
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