import React, { useState } from 'react';
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
  const [imagePreview, setImagePreview] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    experience: '',
    rating: 0,
    panditImage: null, // Raw file
    poojaTypes: [],
    language: []
  });

  const [poojaInput, setPoojaInput] = useState('');
  const [languageInput, setLanguageInput] = useState('');
  const [showPoojaSuggestions, setShowPoojaSuggestions] = useState(false);
  const [showLanguageSuggestions, setShowLanguageSuggestions] = useState(false);

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
    setError(null);
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Check file size (5MB = 5 * 1024 * 1024 bytes)
  //     if (file.size > 5 * 1024 * 1024) {
  //      setError('Image size must be less than 5MB.');

  //       return;
  //     }
  //     setFormData({ ...formData, panditImage: file });
  //     const reader = new FileReader();
  //     reader.onloadend = () => setImagePreview(reader.result);
  //     reader.readAsDataURL(file);
  //     setError(null);
  //   }
  // };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG or PNG image only.');
      return;
    }

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB.');
      return;
    }

    // Check image dimensions if needed
    const img = new Image();
    img.onload = function () {
      if (this.width < 300 || this.height < 300) {
        setError('Image dimensions should be at least 300x300 pixels.');
        return;
      }

      // All validations passed
      setFormData({ ...formData, panditImage: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setError(null);
    };
    img.src = URL.createObjectURL(file);
  };
  const addPoojaType = (type) => {
    if (type && !formData.poojaTypes.includes(type)) {
      setFormData({ ...formData, poojaTypes: [...formData.poojaTypes, type] });
      setPoojaInput('');
      setShowPoojaSuggestions(false);
    }
  };

  const removePoojaType = (type) => {
    setFormData({ ...formData, poojaTypes: formData.poojaTypes.filter(t => t !== type) });
  };

  const addLanguage = (lang) => {
    if (lang && !formData.language.includes(lang)) {
      setFormData({ ...formData, language: [...formData.language, lang] });
      setLanguageInput('');
      setShowLanguageSuggestions(false);
    }
  };

  const removeLanguage = (lang) => {
    setFormData({ ...formData, language: formData.language.filter(l => l !== lang) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validation conditions
    if (formData.password !== formData.confirmPassword) {
      setError('Password and confirm password do not match!');
      return;
    }

    if (!termsAgreed) {
      setError('Please accept the Terms & Conditions and Privacy Policy!');

      return;
    }

    if (!formData.name || !formData.email || !formData.contactNumber ||
      !formData.password || !formData.experience || !formData.panditImage ||
      formData.poojaTypes.length === 0 || formData.language.length === 0) {
      setError('Please fill all required fields!');
      return;
    }

    // All conditions are true, proceed with submission
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('contactNumber', formData.contactNumber);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('experience', parseInt(formData.experience));
    formDataToSend.append('rating', parseInt(formData.rating) || 0);
    formDataToSend.append('poojaTypes', JSON.stringify(formData.poojaTypes));
    formDataToSend.append('language', JSON.stringify(formData.language));
    formDataToSend.append('panditImage', formData.panditImage); // Raw file

    try {
      const response = await fetch('https://api.bookmyyagna.com/pandit/createPanditCard', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok && data.success && data.pandit) {
        setSuccessMessage(data.message || 'Pandit successfully register');
        setFormData({
          name: '',
          email: '',
          contactNumber: '',
          password: '',
          confirmPassword: '',
          experience: '',
          rating: 0,
          panditImage: null,
          poojaTypes: [],
          language: []
        });
        setImagePreview(null);
        setTermsAgreed(false);
      } else {
        setError(data.message || 'Registration fail try again.');
      }
    } catch (err) {
      setError('Network server error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 position-relative overflow-hidden py-5" >
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

              <div className="registration-form">
                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6">

                    <div className="form-group mb-3">
                      <label className="form-label">Profile Photo *</label>
                      <div className="image-upload-container">
                        <div
                          className="image-upload-area"
                          onClick={() => document.getElementById('imageInput').click()}
                          style={{
                            border: error ? '2px dashed #ff6b35' : '2px dashed #ddd',
                            position: 'relative'
                          }}
                        >
                          {imagePreview ? (
                            <>
                              <img src={imagePreview} alt="Preview" className="image-preview" />
                              <div className="image-overlay">
                                <Camera size={24} color="#fff" />
                                <span style={{ color: '#fff', fontSize: '12px' }}>Change Photo</span>
                              </div>
                            </>
                          ) : (
                            <div className="image-placeholder">
                              <Camera size={40} color="#ff6b35" />
                              <p>Click to upload photo</p>
                              <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                (Limit Upto Max 5MB)
                              </p>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          id="imageInput"
                          accept="image/jpeg, image/png"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                        {error && (
                          <div className="text-danger mt-2" style={{ fontSize: '14px' }}>
                            {error}
                          </div>
                        )}
                      </div>
                    </div>

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

                  {/* Pooja Types */}
                  <div className="form-group mb-4">
                    <label className="form-label">Pooja Types You Perform *</label>
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type or select a Pooja type"
                        value={poojaInput}
                        onChange={(e) => {
                          setPoojaInput(e.target.value);
                          setShowPoojaSuggestions(true);
                        }}
                        onBlur={() => setTimeout(() => setShowPoojaSuggestions(false), 200)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && poojaInput) addPoojaType(poojaInput);
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => addPoojaType(poojaInput)}
                        disabled={!poojaInput}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {showPoojaSuggestions && poojaInput && (
                      <div className="suggestions-container">
                        {poojaTypesList
                          .filter((type) => type.toLowerCase().includes(poojaInput.toLowerCase()))
                          .map((type) => (
                            <div
                              key={type}
                              className="suggestion-item"
                              onMouseDown={() => {
                                addPoojaType(type);
                                setPoojaInput('');
                              }}
                            >
                              {type}
                            </div>
                          ))}
                      </div>
                    )}
                    {formData.poojaTypes.length > 0 && (
                      <div className="selected-items">
                        {formData.poojaTypes.map((type) => (
                          <span key={type} className="selected-chip">
                            {type} <X size={16} onClick={() => removePoojaType(type)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="form-group mb-4">
                    <label className="form-label">Languages You Speak *</label>
                    <div className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type or select a language"
                        value={languageInput}
                        onChange={(e) => {
                          setLanguageInput(e.target.value);
                          setShowLanguageSuggestions(true);
                        }}
                        onBlur={() => setTimeout(() => setShowLanguageSuggestions(false), 200)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && languageInput) addLanguage(languageInput);
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => addLanguage(languageInput)}
                        disabled={!languageInput}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {showLanguageSuggestions && languageInput && (
                      <div className="suggestions-container">
                        {languagesList
                          .filter((lang) => lang.toLowerCase().includes(languageInput.toLowerCase()))
                          .map((lang) => (
                            <div
                              key={lang}
                              className="suggestion-item"
                              onMouseDown={() => {
                                addLanguage(lang);
                                setLanguageInput('');
                              }}
                            >
                              {lang}
                            </div>
                          ))}
                      </div>
                    )}
                    {formData.language.length > 0 && (
                      <div className="selected-items">
                        {formData.language.map((lang) => (
                          <span key={lang} className="selected-chip">
                            {lang} <X size={16} onClick={() => removeLanguage(lang)} />
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="terms"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I agree to the <Link to="/termsofservice" className="terms-link">Terms & Conditions</Link> and <Link to="/privacy-policy" className="terms-link">Privacy Policy</Link>
                    </label>
                  </div>

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

                <div className="text-center mt-4">
                  <p className="login-text">
                    Already have an account?{' '}
                    <Link to="/panditlogin" className="login-link">
                      Sign In Here
                    </Link>
                  </p>
                </div>

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