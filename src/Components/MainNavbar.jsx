import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Dropdown } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BellFill, CalendarCheck, PersonCircle, House, CaretDownFill } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/action/authAction';
import { logoutPandit } from '../redux/action/panditAuthAction';
import img from '../assets/img/favicon.png';
import { MdPersonPinCircle } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const MainNavbar = ({ isHeroVisible }) => {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isPanditAuthenticated } = useSelector((state) => state.panditauth);
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);


  // function App() {
  useEffect(() => {
    const removeBanner = () => {
      const bannerFrame = document.querySelector('.goog-te-banner-frame');
      if (bannerFrame) {
        bannerFrame.style.display = 'none';
        document.body.style.top = '0px';
      }
    };

    removeBanner();
    setTimeout(removeBanner, 500);

    const observer = new MutationObserver(removeBanner);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // Load Google Translate Script
  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,hi,ar',
          autoDisplay: false
        },
        'google_translate_element'
      );
    };
  }, []);

  const changeLanguage = (lang) => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navTextColor = isDesktop
    ? isHeroVisible
      ? 'text-light'
      : 'text-dark'
    : '';

  const handleBookingClick = () => {
    if (isAuthenticated) {
      navigate("/listofpuja");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLogoutPandit = () => {
    dispatch(logoutPandit());
    navigate('/');
  };

  return (
    <div className='container' style={{ padding: "0px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar
          expand="lg"
          className={`custom-navbar py-0 ${scrolled ? 'scrolled' : ''}`}
          fixed="top"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            style={{ padding: "0px 70px" }}
            className='padding-class'
          >
            <Navbar.Brand as={Link} to="/" className="brand d-flex align-items-center d-block p-1">
              <img
                src={img}
                width="30"
                height="30"
                alt="Om Symbol"
                className="d-inline-block align-top me-2 pl-2 ml-2"
              />
            </Navbar.Brand>
          </motion.div>


          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center ">
              <motion.div>
                <Nav.Link href="/" className={`nav-link ${navTextColor}`}>
                  <House className="icon" /> Home
                </Nav.Link>
              </motion.div>

              <motion.div>
                <NavDropdown
                  title={
                    <>
                      <BellFill className={`icon me-1 ${navTextColor}`} />
                      <span className={navTextColor}>Service</span>
                    </>
                  }
                  id="nav-dropdown-services"
                  className="m-auto"
                >
                  <Dropdown.Item href="./listOfPuja">List of Pooja</Dropdown.Item>
                  <Dropdown.Item href="/panchang">Panchang</Dropdown.Item>
                  <Dropdown.Item href="/blogs">Blogs</Dropdown.Item>
                </NavDropdown>
              </motion.div>

              <motion.div>
                <Nav.Link href="/about-us" className={`nav-link ${navTextColor}`}>
                  <CalendarCheck className="icon" /> About Us
                </Nav.Link>
              </motion.div>

              {isAuthenticated && !isPanditAuthenticated ? (
                <NavDropdown
                  title={<span className={`d-flex align-items-center ${navTextColor}`}><MdPersonPinCircle className={`me-2 ${navTextColor}`} />Account<CaretDownFill className="ms-1" size={12} /></span>}
                  id="user-account-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate('/dashboard')}>Dashboard</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : isPanditAuthenticated ? (
                <NavDropdown
                  title={<span className={`d-flex align-items-center ${navTextColor}`}><MdPersonPinCircle className={`me-2 ${navTextColor}`} />Pandit Account<CaretDownFill className="ms-1" size={12} /></span>}
                  id="pandit-account-dropdown"
                >
                  <NavDropdown.Item onClick={() => navigate('/panditdashboard')}>Pandit Dashboard</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogoutPandit}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title={<span className={`d-flex align-items-center ${navTextColor}`}><PersonCircle className={`me-2 ${navTextColor}`} />Login<CaretDownFill className="ms-1" size={12} /></span>}
                  id="login-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/login">User Login</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/panditlogin">Pandit Login</NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Language Selector */}
              {/* <Dropdown className="ms-3">
                <Dropdown.Toggle variant="outline-secondary" size="md">
                  🌐 Language
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('hi')}>हिंदी</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('ar')}>arabic</Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown> */}

               <motion.div>
                <NavDropdown
                  title={
                    <>
                      <span className={`icon me-1 ${navTextColor}`}>🌐</span>
                      <span className={navTextColor}>Language</span>
                    </>
                  }
                  id="nav-dropdown-services"
                  className="m-auto"
                >
                  <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('hi')}>हिंदी</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeLanguage('ar')}>arabic</Dropdown.Item>
                </NavDropdown>
              </motion.div>

              <div id="google_translate_element" style={{ display: 'none' }}></div>


              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleBookingClick} variant="outline-light m-2" className="book-now-btn ms-2">
                  Book Now
                </Button>
              </motion.div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </motion.div>
    </div>
  );
};

export default MainNavbar;
