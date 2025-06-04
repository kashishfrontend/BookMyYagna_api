import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import {
  FaUser, FaEnvelope, FaLock, FaFacebookF, FaGoogle, FaApple, FaEye, FaEyeSlash, FaOm
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLogin } from '../redux/action/authAction';
import toast from 'react-hot-toast';
import axios from "../Api/axios/axios_config";
// import './Login.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error, loading } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [resetStep, setResetStep] = useState('login'); // 'login', 'email', 'otp', 'reset'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    resetEmail: '',
    otp: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword, resetEmail, otp, newPassword, confirmNewPassword } = formData;

    if (resetStep === 'login') {
      if (!email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
      
      if (!password) newErrors.password = 'Password is required';
      else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

      if (!isLogin) {
        if (!name) newErrors.name = 'Name is required';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (resetStep === 'email') {
      if (!resetEmail) newErrors.resetEmail = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(resetEmail)) newErrors.resetEmail = 'Email is invalid';
    } else if (resetStep === 'otp') {
      if (!otp) newErrors.otp = 'OTP is required';
      else if (!/^\d{4,6}$/.test(otp)) newErrors.otp = 'OTP must be a 4-6 digit number';
    } else if (resetStep === 'reset') {
      if (!newPassword) newErrors.newPassword = 'New password is required';
      else if (newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
      if (newPassword !== confirmNewPassword) newErrors.confirmNewPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rememberMe' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsOtpLoading(true);
    try {
      const response = await axios.post("/user/forgetPassword", { email: formData.resetEmail });
      console.log('Send OTP Response:', response.data); // Debugging log
      if (response.data.success) {
        toast.success('OTP sent to your email');
        setResetStep('otp');
      } else {
        toast.error(response.data.message || 'Failed to send OTP. Try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(error.response?.data?.message || 'Failed to send OTP. Check your email and try again.');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsOtpLoading(true);
    try {
      const response = await axios.post('/user/matchOtp', {
        email: formData.resetEmail,
        otp: formData.otp,
      });
      console.log('Verify OTP Response:', response.data); // Debugging log
      if (response.data.success) {
        toast.success('OTP verified!');
        setResetStep('reset');
      } else {
        toast.error(response.data.message || 'Incorrect OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsOtpLoading(true);
    try {
      const response = await axios.post("/user/resetPassword", {
        email: formData.resetEmail,
        newPassword: formData.newPassword,
      });
      console.log('Reset Password Response:', response.data); // Debugging log
      if (response.data.success) {
        toast.success('Password reset successfully');
        setShowSuccessModal(true);
      } else {
        toast.error(response.data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.response?.data?.message || 'Error resetting password');
    } finally {
      setIsOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Please fix the errors in the form');
      return;
    }

    const toastId = toast.loading('Authenticating...');
    try {
      await dispatch(login(formData.email, formData.password)).unwrap();
      toast.dismiss(toastId);
    } catch {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success('Authentication Successful');
      setTimeout(() => {
        dispatch(resetLogin());
        navigate('/');
      }, 1000);
    }
    if (error) {
      toast.error(error);
      dispatch(resetLogin());
    }
  }, [success, error, dispatch, navigate]);

  useEffect(() => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
      resetEmail: '',
      otp: '',
      newPassword: '',
      confirmNewPassword: '',
    });
    setErrors({});
  }, [isLogin, resetStep]);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
            <Col xs={12} md={10} lg={8}>
              <div className="login-container shadow-lg">
                <Row>
                  <Col md={6} className="login-image-container d-none d-md-block">
                    <div className="login-decorative-content">
                      <FaOm className="om-symbol text-light" style={{fontSize:"60px",
                        opacity:"1"
                      }} />
                      <h2>
                        {resetStep === 'login'
                          ? isLogin
                            ? 'Welcome Back'
                            : 'Join Our Community'
                          : resetStep === 'email'
                          ? 'Reset Your Password'
                          : resetStep === 'otp'
                          ? 'Verify OTP'
                          : 'Set New Password'}
                      </h2>
                      <p>
                        {resetStep === 'login'
                          ? isLogin
                            ? 'Connect with your spiritual journey'
                            : 'Begin your spiritual journey with us'
                          : resetStep === 'email'
                          ? 'Enter your email to receive an OTP'
                          : resetStep === 'otp'
                          ? 'Enter the OTP sent to your email'
                          : 'Set a new password to continue'}
                      </p>
                      <div className="login-mandala"></div>
                    </div>
                  </Col>
                  <Col xs={12} md={6} className="login-form-container">
                    <AnimatePresence mode="wait">
                      {resetStep === 'login' && (
                        <motion.div
                          key="login"
                          className="login-form-wrapper"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={variants}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="login-header">
                            <h3>{isLogin ? 'Sign In' : 'Create Account'}</h3>
                            <p>{isLogin ? 'Access your account' : 'Register to start'}</p>
                          </div>
                          <Form onSubmit={handleSubmit}>
                            {!isLogin && (
                              <Form.Group className="mb-3 form-group">
                                <div className="input-icon-wrapper">
                                  {/* <FaUser className="input-icon" /> */}
                                  <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    isInvalid={!!errors.name}
                                  />
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {errors.name}
                                </Form.Control.Feedback>
                              </Form.Group>
                            )}
                            <Form.Group className="mb-3 form-group">
                              <div className="input-icon-wrapper">
                                {/* <FaEnvelope className="input-icon" /> */}
                                <Form.Control
                                  type="email"
                                  name="email"
                                  placeholder="Email Address"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                  isInvalid={!!errors.email}
                                />
                              </div>
                              <Form.Control.Feedback type="invalid">
                                {errors.email}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 form-group">
                              <div className="input-icon-wrapper">
                                {/* <FaLock className="input-icon" /> */}
                                <Form.Control
                                  type={showPassword ? 'text' : 'password'}
                                  name="password"
                                  placeholder="Password"
                                  value={formData.password}
                                  onChange={handleInputChange}
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
                              <Form.Control.Feedback type="invalid">
                                {errors.password}
                              </Form.Control.Feedback>
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
                                <Form.Control.Feedback type="invalid">
                                  {errors.confirmPassword}
                                </Form.Control.Feedback>
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
                                  onClick={() => setResetStep('email')}
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
                                {isLogin ? "Don't have an account?" : 'Already have an account?'}
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
                      {resetStep === 'email' && (
                        <motion.div
                          key="email"
                          className="login-form-wrapper"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={variants}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="login-header">
                            <h3>Reset Password</h3>
                            <p>Enter your email to receive an OTP</p>
                          </div>
                          <Form onSubmit={handleSendOtp}>
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
                              <Form.Control.Feedback type="invalid">
                                {errors.resetEmail}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                              variant="primary"
                              type="submit"
                              className="login-button w-100"
                              disabled={isOtpLoading}
                            >
                              {isOtpLoading ? 'Sending...' : 'Send OTP'}
                            </Button>
                            <div className="toggle-form text-center mt-3">
                              <Button
                                variant="link"
                                onClick={() => setResetStep('login')}
                                className="toggle-link"
                              >
                                Back to Login
                              </Button>
                            </div>
                          </Form>
                        </motion.div>
                      )}
                      {resetStep === 'otp' && (
                        <motion.div
                          key="otp"
                          className="login-form-wrapper"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={variants}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="login-header">
                            <h3>Verify OTP</h3>
                            <p>Enter the OTP sent to your email</p>
                          </div>
                          <Form onSubmit={handleVerifyOtp}>
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
                              <Form.Control.Feedback type="invalid">
                                {errors.otp}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                              variant="primary"
                              type="submit"
                              className="login-button w-100"
                              disabled={isOtpLoading}
                            >
                              {isOtpLoading ? 'Verifying...' : 'Verify OTP'}
                            </Button>
                            <div className="toggle-form text-center mt-3">
                              <Button
                                variant="link"
                                onClick={() => setResetStep('login')}
                                className="toggle-link"
                              >
                                Back to Login
                              </Button>
                            </div>
                          </Form>
                        </motion.div>
                      )}
                      {resetStep === 'reset' && (
                        <motion.div
                          key="reset"
                          className="login-form-wrapper"
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={variants}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="login-header">
                            <h3>Set New Password</h3>
                            <p>Create a new password</p>
                          </div>
                          <Form onSubmit={handleResetPassword}>
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
                              <Form.Control.Feedback type="invalid">
                                {errors.newPassword}
                              </Form.Control.Feedback>
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
                              <Form.Control.Feedback type="invalid">
                                {errors.confirmNewPassword}
                              </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                              variant="primary"
                              type="submit"
                              className="login-button w-100"
                              disabled={isOtpLoading}
                            >
                              {isOtpLoading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                            <div className="toggle-form text-center mt-3">
                              <Button
                                variant="link"
                                onClick={() => setResetStep('login')}
                                className="toggle-link"
                              >
                                Back to Login
                              </Button>
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
        <Modal
          show={showSuccessModal}
          onHide={() => setShowSuccessModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Password Reset Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your password has been successfully reset. You can now log in with your new password.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccessModal(false);
                setResetStep('login');
              }}
            >
              Go to Login
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </div>
  );
};

export default LoginPage;