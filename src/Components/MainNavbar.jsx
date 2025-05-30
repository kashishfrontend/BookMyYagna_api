// Navbar.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button, Dropdown } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BellFill, CalendarCheck, PersonCircle, House } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
// import img from "../assets/img/logo.png"
import DivineJournal from '../Page/DivineJournal'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/action/authAction';
import img from '../assets/img/image.png';

const MainNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
 const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigate = useNavigate();

 
  const handleLogout = () => {
    dispatch(logout()); 
    navigate('/');
  };

 
  return (
    <div className='container ' style={{ padding: "0px 0px" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar
          expand="lg"
          className={ ` custom-navbar py-0  ${scrolled ? 'scrolled' : ''}`}
          fixed="top"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            style={{ padding: "0px 70px" }}
            className='padding-class'
          >
            <Navbar.Brand href="#home" className="brand d-flex  align-items-center d-block p-1">
              <img
                src={img}
                width="30"
                height="30"
                alt="Om Symbol"
                style={{
                  // borderRadius: '50%', // makes it circular
                  // boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)' // tight shadow around shape
                }}
                className="d-inline-block align-top me-2 pl-2 ml-2"
              />
              {/* <span className="brand-text p-2">Bookmy<span className="highlight">Yagna</span></span> */}
            </Navbar.Brand>
          </motion.div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center ">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Nav.Link href="/" className="nav-link shadow">
                  <House className="icon" /> Home
                </Nav.Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <NavDropdown
                
                  title={
                    <>
                    
                      <BellFill className="icon me-1" />
                      Services
                    </>
                  }
                  id="nav-dropdown-services"
                  className=" d-flex align-content-center justify-content-center "
                >
                  <Dropdown.Item className='text-light nav-service-link' href="./listOfPooja">List of Pooja</Dropdown.Item>
                  <Dropdown.Item className='text-light nav-service-link' href="/panchang">Panchang</Dropdown.Item>

                </NavDropdown>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Nav.Link href="/about-us" className="nav-link">
                  <CalendarCheck className="icon" /> About Us 
                </Nav.Link>
              </motion.div>
              {/* <motion.div whileHover={{ scale: 1.1 }}>
                <Nav.Link href="/login" className="nav-link">
                  <PersonCircle className="icon" /> Login
                </Nav.Link>
              </motion.div> */}

 {!isAuthenticated ? (
        <motion.div whileHover={{ scale: 1.1 }}>
          <Nav.Link href="/login" className="nav-link">
            <PersonCircle className="icon" /> Login
          </Nav.Link>
        </motion.div>
      ) : (
        // <NavDropdown title="Account" id="account-dropdown">
          <NavDropdown
    title={
      <>
        <PersonCircle className="icon" /> Account
      </>
    }
    id="account-dropdown"
  >
          <NavDropdown.Item onClick={() => navigate('/dashboard')}>Dashboard</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  as="a"
                  href="/booking"
                  variant="outline-light m-2"
                  className="book-now-btn ms-2"
                >
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