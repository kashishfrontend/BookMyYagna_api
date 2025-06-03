import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {
  FaUser, FaLock, FaEnvelope, FaFacebookF, FaGoogle, FaApple, FaEye, FaEyeSlash, FaOm
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLogin } from '../redux/action/authAction';
import toast from 'react-hot-toast';
// import './Login.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, loading, isAuthenticated } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetSection, setShowResetSection] = useState('login'); // 'login', 'email', 'otp', 'reset'
  const [formData, setFormData] = useState({
    name: '',
    confirmPassword: '',
    rememberMe: false,
    resetEmail: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  let loadingToastId = null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (showResetSection === 'login') {
      loadingToastId = toast.loading('Authenticating...');
      dispatch(login(email, password));
    } else if (showResetSection === 'email') {
      // Simulate sending OTP
      toast.success('OTP sent to your email');
      setShowResetSection('otp');
    } else if (showResetSection === 'otp') {
      // Simulate OTP verification
      toast.success('OTP verified');
      setShowResetSection('reset');
    } else if (showResetSection === 'reset') {
      if (formData.newPassword !== formData.confirmNewPassword) {
        setErrors({ confirmNewPassword: 'Passwords do not match' });
        return;
      }
      toast.success('Password reset successful');
      setShowResetSection('login');
    }
  };

  useEffect(() => {
    if (success) {
      toast.dismiss(loadingToastId);
      toast.success('Authentication Successful');
      setTimeout(() => {
        dispatch(resetLogin());
        navigate('/');
      }, 1000);
    }

    if (error) {
      toast.dismiss(loadingToastId);
      toast.error(error);
      dispatch(resetLogin());
    }
  }, [success, error, dispatch, navigate]);

  useEffect(() => {
    setFormData({
      name: '',
      confirmPassword: '',
      rememberMe: false,
      resetEmail: '',
      otp: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    setErrors({});
    setEmail('');
    setPassword('');
  }, [isLogin, showResetSection]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (showResetSection === 'login') {
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
      }

      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!isLogin && !formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!isLogin && password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (showResetSection === 'email') {
      if (!formData.resetEmail) {
        newErrors.resetEmail = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.resetEmail)) {
        newErrors.resetEmail = 'Email is invalid';
      }
    } else if (showResetSection === 'otp') {
      if (!formData.otp) {
        newErrors.otp = 'OTP is required';
      }
    } else if (showResetSection === 'reset') {
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'Password must be at least 6 characters';
      }

      if (formData.newPassword !== formData.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Passwords do not match';
      }
    }

    return newErrors;
  };

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <div className="bg-container">
      <section className="login-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} className="">
              <div className="login-container shadow-lg">
                <Row>
                  <Col md={6} className="login-image-container">
                    <div className="login-decorative-content  height-class">
                      <FaOm className="om-symbol1" />
                      <h2>
                        {showResetSection === 'login'
                          ? isLogin
                            ? 'Welcome Back'
                            : 'Join Our Community'
                          : showResetSection === 'email'
                            ? 'Reset Your Password'
                            : showResetSection === 'otp'
                              ? 'Verify OTP'
                              : 'Set New Password'}
                      </h2>
                      <p>
                        {showResetSection === 'login'
                          ? isLogin
                            ? 'Connect with your spiritual journey and manage your pooja bookings'
                            : 'Begin your spiritual journey with us and access our exclusive pooja services'
                          : showResetSection === 'email'
                            ? 'Enter your email to receive an OTP for password reset'
                            : showResetSection === 'otp'
                              ? 'Enter the OTP sent to your email to verify'
                              : 'Set a new password to continue your spiritual journey'}
                      </p>
                      <div className="login-mandala"></div>
                    </div>
                  </Col>

                  <Col md={6} className="login-form-container">
                    <AnimatePresence mode="wait">
                      {showResetSection === 'login' && (
                        <motion.div
                          key="login"
                          className="login-form-wrapper"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={variants}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="login-header">
                            <h3>{isLogin ? 'Sign In' : 'Create Account'}</h3>
                            <p>
                              {isLogin
                                ? 'Enter your details to access your account'
                                : 'Fill in your information to register'}
                            </p>
                          </div>

                          <Form onSubmit={handleSubmit}>
                            {!isLogin && (
                              <Form.Group className="mb-3 form-group">
                                <div className="input-icon-wrapper">
                                  <FaUser  className="input-icon" />
                                  <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.name}
                                  />
                                </div>
                                {errors.name && <div className="error-message">{errors.name}</div>}
                              </Form.Group>
                            )}

                            <Form.Group className="mb-3 form-group">
                              <div className="input-icon-wrapper">
                                {/* <FaEnvelope className="input-icon" /> */}
                                <Form.Control
                                  className="my-input"
                                  type="email"
                                  name="email"
                                  placeholder="Email Address"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  isInvalid={!!errors.email}
                                />
                              </div>
                              {errors.email && <div className="error-message">{errors.email}</div>}
                            </Form.Group>

                            <Form.Group className="mb-3 form-group">
                              <div className="input-icon-wrapper">
                                {/* <FaLock className="input-icon" /> */}
                                <Form.Control
                                  className="my-input"
                                  type={showPassword ? 'text' : 'password'}
                                  name="password"
                                  placeholder="Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  isInvalid={!!errors.password}
                                />
                                <button
                                  type="button"
                                  className="password-toggle"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              {errors.password && <div className="error-message">{errors.password}</div>}
                            </Form.Group>

                            {!isLogin && (
                              <Form.Group className="mb-3 form-group">
                                <div className="input-icon-wrapper">
                                  {/* <FaLock className="input-icon" /> */}
                                  <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.confirmPassword}
                                  />
                                </div>
                                {errors.confirmPassword && (
                                  <div className="error-message">{errors.confirmPassword}</div>
                                )}
                              </Form.Group>
                            )}

                            {isLogin && (
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <Form.Check
                                  type="checkbox"
                                  name="rememberMe"
                                  label="Remember me"
                                  checked={formData.rememberMe}
                                  onChange={handleInputChange}
                                  className="remember-me"
                                />
                                <button
                                  type="button"
                                  className="forgot-password"
                                  onClick={() => setShowResetSection('email')}
                                >
                                  Forgot Password?
                                </button>
                              </div>
                            )}

                            <Button
                              variant="primary"
                              type="submit"
                              className="login-button w-100"
                              disabled={loading}
                            >
                              {isLogin ? 'Sign In' : 'Register'}
                            </Button>

                            <div className="social-login mt-3 text-center">
                              <p>or continue with</p>
                              <div className="social-buttons d-flex justify-content-center gap-2">
                                <Button variant="outline-primary" className="social-button">
                                  <FaFacebookF />
                                </Button>
                                <Button variant="outline-danger" className="social-button">
                                  <FaGoogle />
                                </Button>
                                <Button variant="outline-dark" className="social-button">
                                  <FaApple />
                                </Button>
                              </div>
                            </div>

                            <div className="toggle-form text-center mt-3">
                              <p>
                                {isLogin
                                  ? "Don't have an account?"
                                  : 'Already have an account?'}
                                <Button
                                  variant="link"
                                  onClick={() => setIsLogin(!isLogin)}
                                  className="toggle-link"
                                >
                                  {isLogin ? 'Register' : 'Login'}
                                </Button>
                              </p>
                            </div>
                          </Form>
                        </motion.div>
                      )}

                      {showResetSection === 'email' && (
                        <motion.div
                          key="email"
                          className="login-form-wrapper"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={variants}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="login-header">
                            <h3>Reset Password</h3>
                            <p>Enter your email to receive an OTP</p>
                          </div>

                          <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 form-group">
                              <div className="input-icon-wrapper">
                                {/* <FaEnvelope className="input-icon" /> */}
                                <Form.Control
                                  type="email"
                                  name="resetEmail"
                                  placeholder="Email Address"
                                  value={formData.resetEmail}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.resetEmail}
                                />
                              </div>
                              {errors.resetEmail && <div className="error-message">{errors.resetEmail}</div>}
                            </Form.Group>

                            <Button
                              variant="primary"
                              type="submit"
                              className="login-button w-100"
                              disabled={loading}
                            >
                              Send OTP
                            </Button>

                            <div className="toggle-form text-center mt-3">
                              <p>
                                Back to{' '}
                                <Button
                                  variant="link"
                                  onClick={() => setShowResetSection('login')}
                                  className="toggle-link"
                                >
                                  Login
                                </Button>
                              </p>
                            </div>
                          </Form>
                        </motion.div>
                      )}

                      {showResetSection === 'otp' && (
                        <motion.div
                          key="otp"
                          className="login-form-wrapper"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={variants}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="login-header">
                            <h3>Verify OTP</h3>
                            <p>Enter the OTP sent to your email</p>
                          </div>

                          <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 form-group">
                              <div className="input-icon-wrapper">
                                {/* <FaOm className="input-icon" /> */}
                                <Form.Control
                                  type="text"
                                  name="otp"
                                  placeholder="Enter OTP"
                                  value={formData.otp}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.otp}
                                />
                              </div>
                              {errors.otp && <div className="error-message">{errors.otp}</div>}
                            </Form.Group>

                            <Button
                              variant="primary"
                              type="submit"
                              className="login-button w-100"
                              disabled={loading}
                            >
                              Verify OTP
                            </Button>

                            <div className="toggle-form text-center mt-3">
                              <p>
                                Back to{' '}
                                <Button
                                  variant="link"
                                  onClick={() => setShowResetSection('login')}
                                  className="toggle-link"
                                >
                                  Login
                                </Button>
                              </p>
                            </div>
                          </Form>
                        </motion.div>
                      )}

                      {showResetSection === 'reset' && (
                        <motion.div
                          key="reset"
                          className="login-form-wrapper"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={variants}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="login-header">
                            <h3>Set New Password</h3>
                            <p>Create a new password for your account</p>
                          </div>

                          <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 form-group">
                              <div className="input-icon-wrapper">
                                {/* <FaLock className="input-icon" /> */}
                                <Form.Control
                                  type={showPassword ? 'text' : 'password'}
                                  name="newPassword"
                                  placeholder="New Password"
                                  value={formData.newPassword}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.newPassword}
                                />
                                <button
                                  type="button"
                                  className="password-toggle"
                                  onClick={togglePasswordVisibility}
                                >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                              </div>
                              {errors.newPassword && <div className="error-message">{errors.newPassword}</div>}
                            </Form.Group>

                            <Form.Group className="mb-3 form-group">
                              <div className="input-icon-wrapper">
                                {/* <FaLock className="input-icon" /> */}
                                <Form.Control
                                  type={showPassword ? 'text' : 'password'}
                                  name="confirmNewPassword"
                                  placeholder="Confirm New Password"
                                  value={formData.confirmNewPassword}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.confirmNewPassword}
                                />
                              </div>
                              {errors.confirmNewPassword && (
                                <div className="error-message">{errors.confirmNewPassword}</div>
                              )}
                            </Form.Group>

                            <Button
                              variant="primary"
                              type="submit"
                              className="login-button w-100"
                              disabled={loading}
                            >
                              Reset Password
                            </Button>

                            <div className="toggle-form text-center mt-3">
                              <p>
                                Back to{' '}
                                <Button
                                  variant="link"
                                  onClick={() => setShowResetSection('login')}
                                  className="toggle-link"
                                >
                                  Login
                                </Button>
                              </p>
                            </div>
                          </Form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LoginPage;