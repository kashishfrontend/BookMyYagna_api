import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../Api/axios/axios_config';
import { Eye, EyeOff, User, Lock, Sun, Moon, Star, Phone } from 'lucide-react';
import { GiLotus } from 'react-icons/gi';
import '../assets/css/PanditLogin.css';

const PanditLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const { userName, password } = formData;

    if (!userName) newErrors.userName = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
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
    setIsLoading(true);

    try {
      const payload = {
        userName: formData.userName,
        password: formData.password,
      };
      console.log('Sending login request with:', payload);

      const response = await axios.post(
        '/pandit/loginPandit',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Login API Response:', response.data);

      if (response.data.success) {
        toast.dismiss(toastId);
        toast.success(response.data.message || 'Login successful!');
        setFormData({
          userName: '',
          password: '',
          rememberMe: false,
        });
        setTimeout(() => {
          navigate('/panditdashboard');
        }, 1000);
      } else {
        throw new Error(response.data.error || response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.dismiss(toastId);
      let errorMessage = 'Failed to login. Please try again.';
      if (err.response) {
        errorMessage = err.response.data.error || err.response.data.message || 'Failed to login. Please try again.';
        if (err.response.data.error === 'All fields are compulsory') {
          errorMessage = 'Please provide both username and password correctly.';
        } else if (err.response.data.error === 'User is not existed') {
          errorMessage = 'This username is not registered. Please check or sign up.';
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else {
        errorMessage = err.message || 'An unexpected error occurred.';
      }
      setErrors({ api: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pandit-login-container" style={{ marginTop: '8%' }}>
      {/* Animated Background Elements */}
      <div className="floating-elements">
        <div className="floating-lotus lotus-1">
          <GiLotus size={40} />
        </div>
        <div className="floating-lotus lotus-2">
          <GiLotus size={30} />
        </div>
        <div className="floating-lotus lotus-3">
          <GiLotus size={35} />
        </div>
        <div className="floating-sun">
          <Sun size={50} />
        </div>
        <div className="floating-moon">
          <Moon size={45} />
        </div>
      </div>

      <div className="container-fluid h-100">
        <div className="row h-100 align-items-center">
          {/* Left Side - Welcome Section */}
          <div className="col-lg-6 col-md-6 d-none d-lg-block">
            <div className="welcome-section">
              <div className="welcome-content text-center">
                <div className="logo-section">
                  <div className="logo-circle">
                    <GiLotus size={60} className="logo-lotus" />
                  </div>
                  <h1 className="brand-name">श्री पूजा सेवा</h1>
                  <p className="brand-tagline">Sacred Services • Divine Connections</p>
                </div>

                <div className="welcome-text">
                  <h2 className="welcome-title">Welcome Back, Pandit Ji</h2>
                  <p className="welcome-description">
                    Connect with devotees and spread the divine light of knowledge.
                    Your spiritual guidance creates sacred moments for countless families.
                  </p>
                </div>

                <div className="stats-section">
                  <div className="row">
                    <div className="col-4">
                      <div className="stat-card">
                        <div className="stat-number">5000+</div>
                        <div className="stat-label">Happy Devotees</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-card">
                        <div className="stat-number">500+</div>
                        <div className="stat-label">Pandits</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-card">
                        <div className="stat-number">50+</div>
                        <div className="stat-label">Cities</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card">
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#FF6B35" color="#FF6B35" />
                    ))}
                  </div>
                  <p className="testimonial-text m-0">
                    "This platform has helped me reach more families and conduct meaningful pujas.
                    The booking system is very convenient."
                  </p>
                  <div className="testimonial-author">- Pandit Rajesh Sharma</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-6 col-md-12 col-12">
            <div className="login-form-section">
              <div className="login-card">
                <div className="card-header text-center">
                  <div className="mobile-logo d-md-none mb-3">
                    <GiLotus size={40} className="text-warning" />
                  </div>
                  <h3 className="login-title">Pandit Login</h3>
                  <p className="login-subtitle">Access your sacred service dashboard</p>
                </div>

                <div className="card-body">
                  {errors.api && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {errors.api}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setErrors({})}
                      ></button>
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label className="form-label">Username</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <User size={18} />
                        </span>
                        <input
                          type="text"
                          className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                          placeholder="Enter your username"
                          required
                        />
                        {errors.userName && (
                          <div className="invalid-feedback">{errors.userName}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label className="form-label">Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={18} />
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me for 30 days
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 login-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <User size={18} className="me-2" />
                          Sign In to Dashboard
                        </>
                      )}
                    </button>
                  </form>

                  <div className="divider-section">
                    <div className="divider">
                      <span>or</span>
                    </div>
                  </div>

                  <div className="alternative-actions">
                    <button className="btn btn-outline-primary w-100 mb-2">
                      <Phone size={18} className="me-2" />
                      Login with Phone OTP
                    </button>
                  </div>

                  <div className="footer-links">
                    <div className="row text-center">
                      <div className="col-6">
                        <a href="#" className="link-primary">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="col-6">
                        <a href="/pandit/register" className="link-success">
                          New Pandit? Join Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditLogin;