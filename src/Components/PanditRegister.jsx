import React, { useState } from 'react';
import axios from 'axios';
import {
  User,
  Mail,
  Phone,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Star,
  Calendar,
  Globe,
  Flower,
  Sparkles,
  Plus,
  X,
  Upload
} from 'lucide-react';
import '../assets/css/PandiRegister.css';
import { Link } from 'react-router-dom';

const PanditRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedPoojaTypes, setSelectedPoojaTypes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    experience: '',
    rating: 0,
    image: null,
    poojaTypes: [],
    language: []
  });

  const poojaTypesList = [
    'Ganesh Puja', 'Satyanarayan Puja', 'Lakshmi Puja', 'Durga Puja',
    'Hanuman Puja', 'Shiva Puja', 'Vishnu Puja', 'Graha Shanti',
    'Havan/Yagna', 'Rudrabhishek', 'Navgraha Puja', 'Katha Path',
    'Marriage Ceremony', 'Mundan Ceremony', 'Janeu Ceremony', 'Griha Pravesh'
  ];

  const languagesList = [
    'Hindi', 'English', 'Sanskrit', 'Bengali', 'Gujarati', 'Marathi',
    'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Punjabi', 'Urdu'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null); // Clear error on input change
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
    setError(null);
  };

  const togglePoojaType = (type) => {
    const updated = selectedPoojaTypes.includes(type)
      ? selectedPoojaTypes.filter(t => t !== type)
      : [...selectedPoojaTypes, type];
    setSelectedPoojaTypes(updated);
    setFormData({ ...formData, poojaTypes: updated });
    setError(null);
  };

  const toggleLanguage = (lang) => {
    const updated = selectedLanguages.includes(lang)
      ? selectedLanguages.filter(l => l !== lang)
      : [...selectedLanguages, lang];
    setSelectedLanguages(updated);
    setFormData({ ...formData, language: updated });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.contactNumber ||
      !formData.password || !formData.experience || !formData.image ||
      selectedPoojaTypes.length === 0 || selectedLanguages.length === 0) {
      setError('Please fill in all required fields!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://bookmyyogna.onrender.com/pandit/createPanditCard',
        {
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contactNumber,
          password: formData.password,
          image: formData.image || undefined,
          poojaTypes: formData.poojaTypes,
          language: formData.language,
          experience: parseInt(formData.experience),
          rating: parseInt(formData.rating) || 0
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Log the full response for debugging
      console.log('API Response:', response.data);

      // Check if response.data exists and has the expected structure
      if (!response.data) {
        throw new Error('No data received from the server');
      }

      // Check if success is true and pandit object exists
      if (response.data.success && response.data.pandit) {
        setSuccessMessage(response.data.message || 'Pandit registered successfully!');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          password: '',
          confirmPassword: '',
          experience: '',
          rating: 0,
          image: null,
          poojaTypes: [],
          language: []
        });
        setSelectedPoojaTypes([]);
        setSelectedLanguages([]);
        setImagePreview(null);
      } else {
        throw new Error(response.data.message || 'Unexpected response structure');
      }
    } catch (err) {
      console.error('Error during API call:', err);
      if (err.response) {
        // Server responded with an error status
        setError(err.response.data.message || 'Failed to register. Please try again.');
      } else if (err.request) {
        // No response received (network error)
        setError('Network error. Please check your internet connection.');
      } else {
        // Other errors (e.g., client-side issue)
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 position-relative overflow-hidden py-5" style={{marginTop:"2%"}}>
      {/* Background with animated elements */}
      <div className="position-absolute w-100 h-100 top-0 start-0" style={{
        background: 'linear-gradient(135deg, #fff8f0 0%, #fff2e6 50%, #ffe6cc 100%)',
        zIndex: -2
      }}>
        <div className="floating-elements">
          <div className="floating-lotus lotus-1">
            <Flower size={25} color="#ff6b35" />
          </div>
          <div className="floating-lotus lotus-2">
            <Flower size={30} color="#ff8c42" />
          </div>
          <div className="floating-lotus lotus-3">
            <Flower size={28} color="#ff6b35" />
          </div>
          <div className="floating-sparkle sparkle-1">
            <Sparkles size={18} color="#ffb347" />
          </div>
          <div className="floating-sparkle sparkle-2">
            <Sparkles size={22} color="#ff8c42" />
          </div>
          <div className="floating-sparkle sparkle-3">
            <Sparkles size={20} color="#ff6b35" />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="registration-card">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="logo-container mb-3">
                  <div className="logo-circle">
                    <Flower size={35} color="#ffffff" />
                  </div>
                </div>
                <h2 className="registration-title">पंडित जी पंजीकरण</h2>
                <h4 className="registration-subtitle">Pandit Registration</h4>
                <p className="registration-description">
                  Join our sacred community and serve devotees with divine blessings
                </p>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError(null)}
                  ></button>
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setSuccessMessage(null)}
                  ></button>
                </div>
              )}

              {/* Registration Form */}
              <div className="registration-form">
                <div className="row">
                  {/* Left Column */}
                  <div className="col-md-6">
                    {/* Name Field */}
                    <div className="form-group mb-3">
                      <label className="form-label">Full Name *</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <User size={20} color="#ff6b35" />
                        </span>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="form-group mb-3">
                      <label className="form-label">Email Address *</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Mail size={20} color="#ff6b35" />
                        </span>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div className="form-group mb-3">
                      <label className="form-label">Contact Number *</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Phone size={20} color="#ff6b35" />
                        </span>
                        <input
                          type="tel"
                          name="contactNumber"
                          className="form-control"
                          placeholder="Enter your contact number"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="form-group mb-3">
                      <label className="form-label">Experience (Years) *</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Calendar size={20} color="#ff6b35" />
                        </span>
                        <input
                          type="number"
                          name="experience"
                          className="form-control"
                          placeholder="Years of experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  {/* Right Column */}
                  <div className="col-md-6">
                    {/* Profile Image Upload */}
                    <div className="form-group mb-3">
                      <label className="form-label">Profile Photo *</label>
                      <div className="image-upload-container">
                        <div className="image-upload-area" onClick={() => document.getElementById('imageInput').click()}>
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                          ) : (
                            <div className="image-placeholder">
                              <Camera size={40} color="#ff6b35" />
                              <p>Click to upload photo</p>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="form-group mb-3">
                      <label className="form-label">Password *</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={20} color="#ff6b35" />
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          className="form-control"
                          placeholder="Create password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-group mb-3">
                      <label className="form-label">Confirm Password *</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <Lock size={20} color="#ff6b35" />
                        </span>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                        />
                        <div>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pooja Types */}
                  <div className="form-group mb-4">
                    <label className="form-label">Pooja Types You Perform *</label>
                    <div className="selection-container">
                      {poojaTypesList.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`selection-chip ${selectedPoojaTypes.includes(type) ? 'selected' : ''}`}
                          onClick={() => togglePoojaType(type)}
                        >
                          {type}
                          {selectedPoojaTypes.includes(type) && <X size={16} className="ms-1" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="form-group mb-4">
                    <label className="form-label">Languages You Speak *</label>
                    <div className="selection-container">
                      {languagesList.map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          className={`selection-chip ${selectedLanguages.includes(lang) ? 'selected' : ''}`}
                          onClick={() => toggleLanguage(lang)}
                        >
                          {lang}
                          {selectedLanguages.includes(lang) && <X size={16} className="ms-1" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="form-check mb-4">
                    <input className="form-check-input" type="checkbox" id="terms" required />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the <a href="#" className="terms-link">Terms & Conditions</a> and <a href="#" className="terms-link">Privacy Policy</a>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    className="btn btn-primary w-100 register-btn"
                    disabled={isLoading}
                    onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating Account...
                      </>
                    ) : (
                      'Register as Pandit'
                    )}
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <p className="login-text">
                    Already have an account?{' '}
                    <Link to="/panditlogin" className="login-link">
                      Sign In Here
                    </Link>
                  </p>
                </div>

                {/* Footer */}
                <div className="text-center mt-4">
                  <p className="footer-text">
                    🙏 Serving devotees with divine blessings since 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditRegistration;