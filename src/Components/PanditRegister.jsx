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
  Upload,
  CameraIcon,
  User2,
  Check
} from 'lucide-react';
import '../assets/css/PandiRegister.css';
import { Link } from 'react-router-dom';
import PanditRegistrationBg from '../assets/img/PanditRegistrationBg.png';
import step1 from '../assets/img/pandit-pic1.png';
import step2 from '../assets/img/pandit-pic2.png';
import step3 from '../assets/img/pandit-pic3.png';

const PanditRegistration = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG or PNG image only.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB.');
      return;
    }

    const img = new Image();
    img.onload = function () {
      if (this.width < 300 || this.height < 300) {
        setError('Image dimensions should be at least 300x300 pixels.');
        return;
      }

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
    formDataToSend.append('panditImage', formData.panditImage);

    try {
      const response = await fetch('https://api.bookmyyagna.com/pandit/createPanditCard', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok && data.success && data.pandit) {
        setSuccessMessage(data.message || 'Pandit successfully registered');
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
        setShowPopup(true);
      } else {
        setError(data.message || 'Registration failed, try again.');
      }
    } catch (err) {
      setError('Network server error.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.email || !formData.contactNumber || !formData.panditImage)) {
      setError('Please fill all required fields in Step 1!');
      return;
    }
    if (step === 2 && (!formData.password || !formData.confirmPassword || !formData.experience)) {
      setError('Please fill all required fields in Step 2!');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const stepTitles = {
    1: '🔥 Register as Pandit🔥',
    2: '🔥 Credentials & Experience 🔥',
    3: '🔥 Expertise & Terms 🔥'
  };

  const isStep1Complete = formData.name && formData.email && formData.contactNumber && formData.panditImage;
  const isStep2Complete = formData.password && formData.confirmPassword && formData.experience;

  return (
    <div className="min-vh-100 position-relative overflow-hidden py-2" style={{ backgroundImage: `url(${PanditRegistrationBg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', width: '100%' }}>
      <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'rgba(255, 248, 240, 0.85)', zIndex: -1 }}>
        <div className="floating-elements">
          <div className="floating-lotus lotus-1"><Flower size={25} color="#ff6b35" /></div>
          <div className="floating-lotus lotus-2"><Flower size={30} color="#ff8c42" /></div>
          <div className="floating-lotus lotus-3"><Flower size={28} color="#ff6b35" /></div>
          <div className="floating-sparkle sparkle-1"><Sparkles size={18} color="#ffb347" /></div>
          <div className="floating-sparkle sparkle-2"><Sparkles size={22} color="#ff8c42" /></div>
          <div className="floating-sparkle sparkle-3"><Sparkles size={20} color="#ff6b35" /></div>
        </div>
      </div>

      <div className="container">
        <div className="row mb-3">
          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <div
              className="side-image h-75"
              style={{
                backgroundImage: `url(${step === 1 ? step1 : step === 2 ? step2 : step3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "20px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
                width: "100%",
              }}
            ></div>
          </div>

          <div className="col-lg-6">
            <div className="registration-card">
              <div className="progress-container">
                <div className="progress-steps">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={`step ${step === s ? 'active' : (s < step || (s === 1 && isStep1Complete)) ? 'completed' : ''}`}>
                      {(s < step || (s === 1 && isStep1Complete)) ? <Check size={18} /> : s}
                    </div>
                  ))}
                </div>
                <div className="steps-remaining">
                  Step {step} of 3
                </div>
              </div>

              <div className="text-center mb-2">
                <h2 className="registration-title">{stepTitles[step]}</h2>
                <p className="registration-description">
                  Join our sacred community and serve devotees with divine blessings
                </p>
              </div>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
              )}
              {successMessage && !showPopup && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {successMessage}
                  <button type="button" className="btn-close" onClick={() => setSuccessMessage(null)}></button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="registration-form">
                {step === 1 && (
                  <div className="row">
                    <div className="form-group mb-4" style={{ textAlign: "center" }}>
                      <div
                        style={{
                          position: "relative",
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          border: "2px solid #d4a017",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#f7e1b5",
                          margin: "0 auto",
                          cursor: "pointer",
                        }}
                        onClick={() => document.getElementById("imageInput").click()}
                      >
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <User2 size={45} color="#d4a017" />
                        )}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            background: "#fff",
                            borderRadius: "50%",
                            padding: "5px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          }}
                        >
                          <CameraIcon size={21} color="#000" />
                        </div>
                      </div>
                      <p className='m-0'
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#8b4d2d",
                        }}
                      >
                        Upload your Profile Photo
                      </p>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/jpeg, image/png"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <div className="input-group placeholder-text-color">
                        <input type="text" name="name" className="form-control" placeholder="Enter Your Full Name" value={formData.name} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="input-group placeholder-text-color">
                        <input type="email" name="email" className="form-control" placeholder="Enter Your Email Address" value={formData.email} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <div className="input-group placeholder-text-color">
                        <input type="tel" name="contactNumber" className="form-control" placeholder="Enter Your Contact Number" value={formData.contactNumber} onChange={handleInputChange} required />
                      </div>
                    </div>

                    <div className="col-12 text-end">
                      <button type="button" className="btn btn-primary next-btn w-100" onClick={nextStep} disabled={isLoading}>Next Step <span className="ms-2">&rarr;</span></button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="row">
                    <div className="form-group mb-4 placeholder-text-color">
                      <div className="input-group">
                        <input type={showPassword ? 'text' : 'password'} name="password" className="form-control" placeholder="Enter Your Password" value={formData.password} onChange={handleInputChange} required />
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                      </div>
                    </div>
                    <div className="form-group mb-4 placeholder-text-color">
                      <div className="input-group">
                        <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" className="form-control" placeholder="Confirm Your Password" value={formData.confirmPassword} onChange={handleInputChange} required />
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                      </div>
                    </div>
                    <div className="form-group mb-4 placeholder-text-color">
                      <div className="input-group">
                        <input type="number" name="experience" className="form-control" placeholder="Enter Your Experience" value={formData.experience} onChange={handleInputChange} min="0" required />
                      </div>
                    </div>

                    <div className="col-12 text-end">
                      <div className='row'>
                        <div className='col-md-6 text-center'>
                          <button type="button" className="btn btn-secondary w-75" style={{ padding: '10px 25px' }} onClick={prevStep}><span className="me-2">&larr;</span> Back</button>
                        </div>
                        <div className='col-md-6 text-center'>
                          <button type="button" className="btn btn-primary next-btn w-75" onClick={nextStep} disabled={isLoading}>Next <span className="ms-2">&rarr;</span></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="row">
                    <div className="form-group mb-4 placeholder-text-color">
                      <div className="input-group mb-2">
                        <input type="text" className="form-control" placeholder="Enter Pooja Type" value={poojaInput} onChange={(e) => { setPoojaInput(e.target.value); setShowPoojaSuggestions(true); }} onBlur={() => setTimeout(() => setShowPoojaSuggestions(false), 200)} onKeyPress={(e) => { if (e.key === 'Enter' && poojaInput) addPoojaType(poojaInput); }} />
                        <button type="button" className="btn btn-outline-secondary" onClick={() => addPoojaType(poojaInput)} disabled={!poojaInput}><Plus size={16} /></button>
                      </div>
                      {showPoojaSuggestions && poojaInput && (
                        <div className="suggestions-container">
                          {poojaTypesList.filter((type) => type.toLowerCase().includes(poojaInput.toLowerCase())).map((type) => (
                            <div key={type} className="suggestion-item" onMouseDown={() => { addPoojaType(type); setPoojaInput(''); }}>{type}</div>
                          ))}
                        </div>
                      )}
                      {formData.poojaTypes.length > 0 && (
                        <div className="selected-items">
                          {formData.poojaTypes.map((type) => (
                            <span key={type} className="selected-chip">{type} <X size={14} onClick={() => removePoojaType(type)} /></span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="form-group mb-4 placeholder-text-color">
                      <div className="input-group mb-2">
                        <input type="text" className="form-control" placeholder="Enter Language" value={languageInput} onChange={(e) => { setLanguageInput(e.target.value); setShowLanguageSuggestions(true); }} onBlur={() => setTimeout(() => setShowLanguageSuggestions(false), 200)} onKeyPress={(e) => { if (e.key === 'Enter' && languageInput) addLanguage(languageInput); }} />
                        <button type="button" className="btn btn-outline-secondary" onClick={() => addLanguage(languageInput)} disabled={!languageInput}><Plus size={16} /></button>
                      </div>
                      {showLanguageSuggestions && languageInput && (
                        <div className="suggestions-container">
                          {languagesList.filter((lang) => lang.toLowerCase().includes(languageInput.toLowerCase())).map((lang) => (
                            <div key={lang} className="suggestion-item" onMouseDown={() => { addLanguage(lang); setLanguageInput(''); }}>{lang}</div>
                          ))}
                        </div>
                      )}
                      {formData.language.length > 0 && (
                        <div className="selected-items">
                          {formData.language.map((lang) => (
                            <span key={lang} className="selected-chip">{lang} <X size={14} onClick={() => removeLanguage(lang)} /></span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="form-check mb-4 position-relative" style={{ left: '20px' }}>
                      <input className="form-check-input me-3" type="checkbox" id="terms" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} required />
                      <label className="form-check-label" htmlFor="terms">I agree to the <Link to="/termsofservice" className="terms-link">Terms & Conditions</Link> and <Link to="/privacy-policy" className="terms-link">Privacy Policy</Link></label>
                    </div>
                    <div className="col-12 text-end">
                      <div className='row d-flex justify-content-center align-content-center'>
                        <div className='col-md-6 text-center'>
                          <button type="button" className="btn btn-secondary  me-2 w-75" style={{ padding: "10px 25px" }} onClick={prevStep}><span className="me-2">&larr;</span> Back</button>
                        </div>
                        <div className='col-md-6'>
                          <button type="submit" className="btn btn-primary register-btn w-100" disabled={isLoading}>{isLoading ? (<><span className="spinner-border spinner-border-sm me-2" /> Creating Account...</>) : 'Register as Pandit'}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
              <div className="text-center w-100 position-absolute" style={{ bottom: '10px' }}>
                <p className="login-text m-0" style={{ color: '#009B27', fontSize: 'small' }}>Already have an account? <Link to="/panditlogin" className="login-link">Sign In Here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popup-title">Registration Successful!</h3>
            <p className="popup-message">Your profile has been created successfully. You can now log in.</p>
            <button className="btn btn-primary popup-btn" onClick={() => { setShowPopup(false); setStep(1); }}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanditRegistration;