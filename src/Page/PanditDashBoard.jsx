import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { MdDashboard, MdLogout, MdNotifications, MdClose, MdDelete, MdEdit } from 'react-icons/md';
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
  const [selectedImage, setSelectedImage] = useState(null);
  // const [activeNavItem, setActiveNavItem] = useState('dashboard'); // or any default

  // const handleNavItemClick = (item) => {
  //   setActiveNavItem(item);
  //   // Add more logic here if needed, like navigating to a route or logging
  // };


  // Initialize user state
  const [user, setUser] = useState({
    id: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    expertise: '',
    poojaTypes: [],
    rating: 0,
    experience: 0,
    languages: [],
    image: " ",
    role: 'Pandit',
  });

  // Debug store configuration
  useEffect(() => {
    if (!panditState) {
      console.warn(
        'Redux state.panditauth is undefined. Check store configuration in store.js. ' +
        'Expected panditAuthReducer to be registered under "panditauth".'
      );
    }
    console.log('Pandit State:', panditState);
  }, [panditState]);

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
      console.log('Not authenticated, redirecting to /panditlogin');
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
        const response = await axios.get('/notification/getAllNotifications', {
          withCredentials: true,
          params: { panditId: user.id },
        });
        console.log('Notifications Response:', response.data);
        if (response.data.success) {
          setNotifications(response.data.notifications || response.data.data || []);
        } else {
          throw new Error(response.data.message || 'Failed to fetch notifications');
        }
      } catch (error) {
        setNotifError(error.message || 'Error fetching notifications');
        console.error('Error fetching notifications:', error);
        toast.error('Failed to load notifications.');
      } finally {
        setNotifLoading(false);
      }
    };
    if (isPanditAuthenticated && user.id) {
      fetchNotifications();
    }
  }, [isPanditAuthenticated, user.id]);

  // Fetch confirmed poojas
  useEffect(() => {
    const fetchConfirmedPoojas = async () => {
      try {
        const response = await axios.post('/bookings/allBookingPandit', {
          startDate: '',
          endDate: '',
          status: 'Confirmed',
          panditId: user.id,
        }, { withCredentials: true });
        console.log('Confirmed Poojas Response:', response.data);
        if (response.data.success) {
          setConfirmedPoojas(response.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching confirmed poojas:', err);
        toast.error('Error fetching confirmed poojas.');
      }
    };
    if (isPanditAuthenticated && user.id) {
      fetchConfirmedPoojas();
    }
  }, [isPanditAuthenticated, user.id]);

  // Fetch completed poojas
  useEffect(() => {
    const fetchCompletedPoojas = async () => {
      try {
        const response = await axios.post('/bookings/allBookingPandit', {
          startDate: '',
          endDate: '',
          status: 'Completed',
          panditId: user.id,
        }, { withCredentials: true });
        console.log('Completed Poojas Response:', response.data);
        if (response.data.success) {
          setCompletedPuja(response.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching completed poojas:', err);
        toast.error('Error fetching completed poojas.');
      }
    };
    if (isPanditAuthenticated && user.id) {
      fetchCompletedPoojas();
    }
  }, [isPanditAuthenticated, user.id]);

  // Fetch booked poojas
  useEffect(() => {
    const fetchBookedPoojas = async () => {
      try {
        const response = await axios.post('/bookings/allBookingPandit', {
          startDate: '',
          endDate: '',
          status: 'Cancelled',
          panditId: user.id,
        }, { withCredentials: true });
        console.log('Booked Poojas Response:', response.data);
        if (response.data.success) {
          setBookedPuja(response.data.data || []);
        }
      } catch (err) {
        console.error('Error fetching booked poojas:', err);
        toast.error('Error fetching booked poojas.');
      }
    };
    if (isPanditAuthenticated && user.id) {
      fetchBookedPoojas();
    }
  }, [isPanditAuthenticated, user.id]);

  // Fetch pandit profile
  useEffect(() => {
    const fetchPanditProfile = async () => {
      try {
        const response = await axios.get('/pandit/getPanditProfile', {
          withCredentials: true,
        });
        // console.log('Profile Response:', response.data);
        if (response.data.success) {
          const pandit = response.data.pandit;
          setUser({
            id: pandit._id,
            fullName: pandit.name,
            email: pandit.email,
            phoneNumber: pandit.contactNumber,
            address: pandit.address || '',
            expertise: pandit.poojaTypes?.join(', ') || '',
            poojaTypes: pandit.poojaTypes || [],
            rating: pandit.rating || 0,
            experience: pandit.experience || 0,
            languages: pandit.language || [],
            image: pandit.image,
            role: pandit.role || 'Pandit',
           
          });
        } else {
          toast.error('Failed to load profile.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Error fetching profile.');
      }
    };
    if (isPanditAuthenticated) {
      fetchPanditProfile();
    }
  }, [isPanditAuthenticated]);

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
    const result = await dispatch(logoutPandit());
    if (result.success) {
      toast.dismiss(toastId);
      toast.success(result.message || 'Logout successful!');
      dispatch(resetLogoutPanditState());
      navigate('/panditlogin');
    } else {
      throw new Error(result.error || 'Logout failed');
    }
  } catch (err) {
    console.error('Pandit logout error:', err);
    toast.dismiss(toastId);
    toast.error('Failed to logout.');
  }
};


  const handleDeleteNotification = async (id) => {
    const toastId = toast.loading('Deleting notification...');
    try {
      await axios.delete(`/notification/deleteNotification/${id}`, {
        withCredentials: true,
      });
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
      const response = await axios.get(`/notification/getNotificationById/${id}`, {
        withCredentials: true,
      });
      console.log('Notification By ID Response:', response.data);
      if (response.data.success) {
        setSelectedNotification(response.data.notification || response.data);
        setShowModal(true);
        setShowNotifications(false);
      } else {
        throw new Error(response.data.message || 'Failed to load notification');
      }
    } catch (err) {
      toast.error('Failed to load notification');
      console.error('Error opening notification:', err);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!user.id) {
      toast.error('Pandit ID not available');
      return;
    }
    try {
      // Use FormData to send profile data and image
      const formData = new FormData();
      formData.append('name', user.fullName || user.name);
      formData.append('email', user.email);
      formData.append('contactNumber', user.phoneNumber);
      formData.append('experience', user.experience || '');

      // Append poojaTypes as array
      const poojaTypes = user.expertise
        ? user.expertise.split(',').map((item) => item.trim())
        : [];
      poojaTypes.forEach((type, index) => {
        formData.append(`poojaTypes[${index}]`, type);
      });

      // Append languages as array
      const languages = Array.isArray(user.languages)
        ? user.languages
        : user.languages?.split(',').map((item) => item.trim()) || [];
      languages.forEach((lang, index) => {
        formData.append(`language[${index}]`, lang);
      });

      // Append image and imageName if selected
      if (selectedImage) {
        // formData.append('image' , selectedImage);  
        formData.append('image', selectedImage.name); // Send file name
      }

      const response = await axios.patch(
        `/pandit/updatePanditcard/${user.id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Profile Update Response:', response.data); // Debug response

      if (response.data.success) {
        toast.success('Profile updated successfully');
        setIsEditingProfile(false);
        if (response.data.updatedPandit) {
          setUser((prev) => ({
            ...prev,
            fullName: response.data.updatedPandit.name,
            name: response.data.updatedPandit.name,
            contactNumber: response.data.updatedPandit.phoneNumber,
            poojaTypes: response.data.updatedPandit.poojaTypes,
            expertise: response.data.updatedPandit.poojaTypes?.join(', ') || '',
            language: response.data.updatedPandit.language,
            languages: response.data.updatedPandit.language,
            experience: response.data.updatedPandit.experience,
            image: response.data.updatedPandit.image || prev.image,
          }));
          setSelectedImage(null); // Reset image after successful update
        }
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers,
      });
      const errorMsg = err.response?.data?.message || 'Error updating profile. Please try again.';
      toast.error(errorMsg);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      setSelectedImage(file);
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

  const renderDashboardContent = () => (
    <Container fluid className="py-4">
      <Row>
        <Col xs={12}>
          <h1 className="welcome-heading">
            <span className="namaste">नमस्ते</span>, {user.fullName?.split(' ')[0] || 'Pandit Ji'}!
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
                <h2>{confirmedPoojas.length}</h2>
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
                  <tr key={data.id}>
                    <td>{data.userId?.fullName || data.name || 'N/A'}</td>
                    <td>{data.planId?.heading || 'N/A'}</td>
                    <td>{data.planId?.amount || 'N/A'}</td>
                    <td>{data.phoneNumber}</td>
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
                        <a
                          href={data.poojaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </a>
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
                    <tr key={data.id}>
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
                    <tr key={p.id}>
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
                          <a
                            href={p.poojaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm"
                          >
                            View
                          </a>
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
      <h1 className="welcome-heading">Pandit Profile</h1>
      <p className="welcome-subtext">Manage your personal and professional details</p>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex align-items-center mb-4 position-relative">
            <div className="position-relative">
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage) // Show preview if user selects new image
                    : user.image  // Show existing image or fallback
                }
                alt="Pandit"
                className="rounded-circle me-3"
                style={{ width: 60, height: 60, objectFit: 'cover', border: '2px solid #FF7722' }}
              // onError={(e) => (e.target.src = 'https://via.placeholder.com/60')}
              />

              {isEditingProfile && (
                <div
                  className="position-absolute bottom-0 start-0 bg-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 24, height: 24, cursor: 'pointer' }}
                >
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                  />
                  <MdEdit size={14} color="white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="mb-1">{user.fullName   }</h3>
              <p className="mb-0 text-muted">{user.role}</p>
            </div>
          </div>
          {/* {selectedImage && (
            <div className="mb-3 text-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="img-fluid rounded"
                style={{ maxHeight: '100px' }}
              />
              <p className="text-muted small mt-2">File: {selectedImage.name}</p>
            </div>
          )} */}
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
                    value={Array.isArray(user.languages) ? user.languages.join(', ') : user.languages || ''}

                    
                    // value={user.languages?.join(', ') || ''}
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
                    onClick={() => {
                      setIsEditingProfile(false);
                      setSelectedImage(null);
                    }}
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
              <p><strong>Email:</strong> {user.email || 'N/A'}</p>
              <p><strong>Phone Number:</strong> {user.phoneNumber || 'N/A'}</p>
              <p><strong>Expertise:</strong> {user.expertise || 'N/A'}</p>
              {/* <p><strong>Languages:</strong> {user.languages?.join(', ') || 'N/A'}</p>  */}
              <p><strong>Languages:</strong> 
  {Array.isArray(user.languages) 
    ? user.languages.join(', ') 
    : typeof user.languages === 'string' 
      ? user.languages 
      : 'N/A'}
</p>

              <p><strong>Experience:</strong> {user.experience ? `${user.experience} years` : 'N/A'}</p>
              <p><strong>Address:</strong> {user.address || 'N/A'}</p>
              <p><strong>Rating:</strong> {user.rating ? `${user.rating} / 5` : 'N/A'}</p>
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
         className={`sidebar col-12 col-lg-2 position-sticky ${showSidebar ? 'd-block active' : 'd-none'} d-lg-block`}
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
              <span>Pandit Profile</span>
            </div>
            <div
              className={`menu-item ${activeNavItem === 'notifications' ? 'active' : ''}`}
              onClick={() => handleNavItemClick('notifications')}
            >
              <MdNotifications size={20} />
              <span>Notifications</span>
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
                onClick={() => handleNavItemurethane('punditProfile')}
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
                      notifications.slice(0, 3).map((item) => (
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
                          <hr className="notification-separator" />
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