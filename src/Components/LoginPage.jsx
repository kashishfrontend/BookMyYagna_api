import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaFacebookF, FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { div } from 'framer-motion/client';
// import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState({});

    const { login } = useAuth();

    useEffect(() => {
        setFormData({
            email: '',
            password: '',
            name: '',
            confirmPassword: '',
            rememberMe: false,
        });
        setErrors({});
    }, [isLogin]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'rememberMe' ? checked : value,
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Name validation (only for signup)
        if (!isLogin && !formData.name) {
            newErrors.name = 'Name is required';
        }

        // Confirm password validation (only for signup)
        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const navigate = useNavigate();


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const newErrors = validateForm();
    //     if (Object.keys(newErrors).length > 0) {
    //         setErrors(newErrors);
    //         return;
    //     }

    //     if (isLogin) {
    //         // Login logic
    //         try {
    //             const response = await axios.post('https://bookmyyogna.onrender.com/user/loginUser', {
    //                 email: formData.email,
    //                 password: formData.password
    //             });

    //             const userData = response.data;

    //             if (response.status === 200 && userData.success) {
    //                 alert(userData.Message || 'Login successful!');
    //                 console.log('Login successful:', userData);
    //                 navigate('/', { state: { user: userData } });
    //                 // Save to localStorage
    //                 localStorage.setItem('isLoggedIn', true);
    //                 localStorage.setItem('userData', JSON.stringify(userData))
    //             } else {
    //                 console.log('Login error:', userData.error);
    //                 alert(userData.error || 'Login failed!');
    //             }

    //         } catch (error) {
    //             const errorMessage = error.response?.data?.error || 'Login failed due to server error!';
    //             console.log('Login failed:', errorMessage);
    //             alert(errorMessage);
    //         }

    //     } else {
    //         // ✅ Register logic using correct API field: fullName
    //         try {
    //             const response = await axios.post('https://bookmyyogna.onrender.com/user/registerUser', {
    //                 fullName: formData.name,
    //                 email: formData.email,
    //                 password: formData.password
    //             });

    //             const userData = response.data;

    //             if (response.status === 201 || userData.success) {
    //                 alert(userData.Message || 'Registration successful!');
    //                 console.log('Registration successful:', userData);
    //                 setIsLogin(true); // Switch to login mode
    //             } else {
    //                 console.log('Registration error:', userData.error);
    //                 alert(userData.error || 'Registration failed!');
    //             }

    //         } catch (error) {
    //             const errorMessage = error.response?.data?.error || 'Registration failed due to server error!';
    //             console.log('Registration failed:', errorMessage);
    //             alert(errorMessage);
    //         }
    //     }
    // };


    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await login({
      email: formData.email,
      password: formData.password
    });

    // Login successful, navigate to home or dashboard
    navigate('/');
  } catch (err) {
    console.error("Login failed:", err);

    // Optionally show user-friendly message
    alert("Login failed. Please check your credentials or try again later.");
  }
  };
    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        navigate('/dashboard');
    }
}, []);


    return (

        <>
            <div className='bg-container'>

                <section className="login-section">
                    <Container >
                        <Row className="justify-content-center">
                            <Col lg={10}>
                                <div className="login-container shadow-lg">
                                    <Row>
                                        {/* Left side - Decorative content */}
                                        <Col md={6} className="login-image-container">
                                            <div className="login-decorative-content">
                                                <div className="om-symbol1">ॐ</div>
                                                <h2>{isLogin ? 'Welcome Back' : 'Join Our Community'}</h2>
                                                <p>
                                                    {isLogin
                                                        ? 'Connect with your spiritual journey and manage your pooja bookings'
                                                        : 'Begin your spiritual journey with us and access our exclusive pooja services'}
                                                </p>
                                                <div className="login-mandala"></div>
                                            </div>
                                        </Col>

                                        {/* Right side - Login form */}
                                        <Col md={6} className="login-form-container">
                                            <motion.div
                                                className="login-form-wrapper"
                                                initial="hidden"
                                                animate="visible"
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
                                                    {/* Name field (signup only) */}
                                                    {!isLogin && (
                                                        <Form.Group className="mb-3 form-group">
                                                            <div className="input-icon-wrapper">
                                                                <FaUser className="input-icon" />
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

                                                    {/* Email field */}
                                                    <Form.Group className="mb-3 form-group">
                                                        <div className="input-icon-wrapper">
                                                            <FaEnvelope className="input-icon" />
                                                            <Form.Control
                                                                className='my-input'
                                                                type="email"
                                                                name="email"
                                                                placeholder="Email Address"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                isInvalid={!!errors.email}
                                                            />
                                                        </div>
                                                        {errors.email && <div className="error-message">{errors.email}</div>}
                                                    </Form.Group>

                                                    {/* Password field */}
                                                    <Form.Group className="mb-3 form-group">
                                                        <div className="input-icon-wrapper">
                                                            <FaLock className="input-icon" />
                                                            <Form.Control
                                                                className='my-input'
                                                                type={showPassword ? "text" : "password"}
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
                                                        {errors.password && <div className="error-message">{errors.password}</div>}
                                                    </Form.Group>

                                                    {/* Confirm Password field (signup only) */}
                                                    {!isLogin && (
                                                        <Form.Group className="mb-3 form-group">
                                                            <div className="input-icon-wrapper">
                                                                <FaLock className="input-icon" />
                                                                <Form.Control
                                                                    type={showPassword ? "text" : "password"}
                                                                    name="confirmPassword"
                                                                    placeholder="Confirm Password"
                                                                    value={formData.confirmPassword}
                                                                    onChange={handleInputChange}
                                                                    isInvalid={!!errors.confirmPassword}
                                                                />
                                                            </div>
                                                            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                                                        </Form.Group>
                                                    )}

                                                    {/* Remember me & Forgot password (login only) */}
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
                                                            <a href="#" className="forgot-password">Forgot Password?</a>
                                                        </div>
                                                    )}

                                                    {/* Submit button */}
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        className="login-button w-100"
                                                    >
                                                        {isLogin ? 'Sign In' : 'Register'}
                                                    </Button>

                                                    {/* Social login */}
                                                    <div className="social-login">
                                                        <p>or continue with</p>
                                                        <div className="social-buttons">
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

                                                    {/* Toggle login/signup */}
                                                    <div className="toggle-form text-center mt-3">
                                                        <p>
                                                            {isLogin
                                                                ? "Don't have an account?"
                                                                : "Already have an account?"}
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
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    );
};

export default LoginPage;