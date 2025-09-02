import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import {
  FaUser, FaEnvelope, FaLock, FaFacebookF, FaGoogle, FaApple, FaEye, FaEyeSlash, FaOm, FaPhone
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLogin } from '../redux/action/authAction';
import toast from 'react-hot-toast';
import axios from "../Api/axios/axios_config";

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error, loading } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [resetStep, setResetStep] = useState('login');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    newPassword: '',
    confirmNewPassword: '',
  });
  const [resetEmail, setResetEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      console.log('Google Login Success:', credentialResponse)

      // Decode the JWT token to get user info
      const decodedToken = JSON.parse(atob(credentialResponse.credential.split('.')[1]))
      console.log('Decoded token:', decodedToken)

      // Extract first and last name from the full name
      const fullName = decodedToken.name || ''
      const nameParts = fullName.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

      const response = await axios.post("/user/registerUserWithGoogle", {
      
          firstName: firstName,
          lastName: lastName,
          email: decodedToken.email,
          picture: decodedToken.picture,
          googleId: decodedToken.sub,
        },
        { withCredentials: true }
      )

      if (response.data.success) {
        toast.success('Google Login Successful!')
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 1000)
      } else {
        toast.error(response.data.message || 'Google Login Failed')
      }
    } catch (error) {
      console.error('Error during Google login:', error)
      toast.error(error.response?.data?.message || 'Google Login Failed')
    }
  }

  const handleGoogleLoginError = () => {
    console.log('Google Login Failed')
    toast.error('Google Login Failed')
  }



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
    if (!resetEmail) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setIsOtpLoading(true);
    try {
      const response = await axios.post("/user/forgetPassword", { email: resetEmail });
      console.log('Send OTP Response:', response.data);
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

    if (!otp || otp.length < 6) {
      toast.error('Invalid OTP');
      return;
    }
    try {
      const response = await axios.post('/user/matchOtp', {
        email: resetEmail,
        otp: otp,
      });

      console.log('Verify OTP Response:', response.data);

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
      toast.error('there might me some in your credentials');
      return;
    }

    setIsOtpLoading(true);
    try {
      const response = await axios.patch("/user/resetPassword", {
        otp: otp,
        email: resetEmail,
        newPassword: formData.newPassword,
      });
      console.log('Reset Password Response:', response.data);
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

      if (newErrors.passwordMismatch) {
        toast.error('Passwords do not match');
      } else {
        toast.error('Please fill all required fields');
      }
      return;
    }

    if (isLogin) {
      const toastId = toast.loading('Loading...');
      try {
        const identifier = formData.email || formData.phoneNumber;
        await dispatch(login(identifier, formData.password));
        toast.dismiss(toastId);
      } catch {
        toast.dismiss(toastId);
      }
    } else {
      handleRegister(e);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email?.trim() && !formData.phoneNumber?.trim()) {
        newErrors.email = 'Email or phone number is required';
      }
      if (!formData.password) newErrors.password = 'Password is required';
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm password is required';
      }

      if (formData.password && formData.confirmPassword &&
        formData.password !== formData.confirmPassword) {
        newErrors.passwordMismatch = 'Passwords do not match';
      }
    } else {
      if (!formData.email?.trim() && !formData.phoneNumber?.trim()) {
        newErrors.email = 'Email or phone number is required';
      }
      if (!formData.password) newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      if (newErrors.passwordMismatch) {
        toast.error('Passwords do not match');
      } else {
        toast.error('Please fill all required fields');
      }
      return;
    }

    const toastId = toast.loading('Registering...');

    try {
      const response = await axios.post("/user/registerUser", {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      toast.dismiss(toastId);

      if (response.data.success) {
        toast.success("Registration successful! Please log in.");
        setIsLogin(true);
      } else {
        toast.error(response.data.error || "Registration failed.");
      }
    } catch (error) {
      toast.dismiss(toastId);
      console.error("Registration error:", error);

      const errorMessage = error.response?.data?.error ||
        error.response?.data?.message ||
        "Registration failed.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success('Login Successful');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }

    if (error) {
      toast.error(error);
    }

    dispatch(resetLogin());
  }, [success, error, dispatch, navigate]);

  useEffect(() => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
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
    <>
      <Helmet>
        <title>Login to Book Your Puja Online | BookMyYagna</title>
        <meta
          name="description"
          content="Access your BookMyYagna account to book online pujas, track your yagna history, and connect with expert priests. Login now for a seamless spiritual experience"
        />
        <meta
          name="keywords"
          content="BookMyYagna login, online puja booking, book puja online, login for yagna, virtual puja, spiritual booking India"
        />
        <meta
          property="og:title"
          content="Login to BookMyYagna - Your Trusted Online Puja Booking Platform"
        />
        <meta
          property="og:description"
          content="Access your BookMyYagna account to manage your puja bookings, view history, and connect with expert priests online. Fast, secure, and spiritual"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bookmyyagna.com/login" />
        <meta property="og:image" content="https://bookmyyagna.com/images/login-og-image.jpg" />
        <link rel="canonical" href="https://bookmyyagna.com/login" />
      </Helmet>

      <GoogleOAuthProvider clientId="376943538663-bj6be7ib2qsh46tqra0bcam7edtvr849.apps.googleusercontent.com">
        <div className="bg-container">
          <section className="login-section">
            <Container>
              <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                  <div className="login-container shadow-lg">
                    <Row>
                      <Col md={6} className="login-image-container d-none d-md-block">
                        <div className="login-decorative-content">
                          <FaOm className="om-symbol text-light" style={{
                            fontSize: "60px",
                            opacity: "1"
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
                                      <FaUser className="input-icon" />
                                      <Form.Control
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.fullName}
                                      />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                      {errors.fullName}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                )}

                                {isLogin ? (
                                  <Form.Group className="mb-3 form-group">
                                    <div className="input-icon-wrapper">
                                      <FaEnvelope className="input-icon" />
                                      <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="Email or Phone Number"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        isInvalid={!!errors.email}
                                      />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                      {errors.email}
                                    </Form.Control.Feedback>
                                  </Form.Group>
                                ) : (
                                  <>
                                    <Form.Group className="mb-3 form-group">
                                      <div className="input-icon-wrapper">
                                        <FaEnvelope className="input-icon" />
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
                                        <FaPhone className="input-icon" />
                                        <Form.Control
                                          type="text"
                                          name="phoneNumber"
                                          placeholder="Phone Number "
                                          value={formData.phoneNumber}
                                          onChange={handleInputChange}
                                          isInvalid={!!errors.phoneNumber}
                                        />
                                      </div>
                                      <Form.Control.Feedback type="invalid">
                                        {errors.phoneNumber}
                                      </Form.Control.Feedback>
                                    </Form.Group>
                                  </>
                                )}

                                <Form.Group className="mb-3 form-group">
                                  <div className="input-icon-wrapper">
                                    <FaLock className="input-icon" />
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
                                      <FaLock className="input-icon" />
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

                                {/* Social Login Section - यहाँ जोड़ा गया है */}
                                {resetStep === 'login' && (
                                  <div className="social-login-section mt-4">
                                    <div className="divider">
                                      <span>Or continue with</span>
                                    </div>

                                    <div className="social-buttons d-flex justify-content-center mt-3">
                                      <GoogleLogin
                                        onSuccess={handleGoogleLoginSuccess}
                                        onError={handleGoogleLoginError}
                                        shape="rectangular"
                                        size="large"
                                        text="signin_with"
                                        theme="filled_blue"
                                        width="300"
                                      />
                                    </div>
                                  </div>
                                )}

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
                                    <FaEnvelope className="input-icon" />
                                    <Form.Control
                                      type="email"
                                      name="resetEmail"
                                      placeholder="Email Address"
                                      value={resetEmail}
                                      onChange={(e) => setResetEmail(e.target.value)}
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
                                    className="btn btn-outline-primary"
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
                                    <Form.Control
                                      type="text"
                                      name="otp"
                                      placeholder="Enter OTP"
                                      value={otp}
                                      onChange={(e) => setOtp(e.target.value)}
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
                                    className="btn btn-outline-primary"
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
                                    <FaLock className="input-icon" />
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
                                    <FaLock className="input-icon" />
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
                                    className="btn btn-outline-danger"
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
      </GoogleOAuthProvider>
    </>
  );
};

export default LoginPage;