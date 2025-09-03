import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { GiLotus } from 'react-icons/gi';
import '../assets/css/PanditLogin.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginPandit, resetLoginPandit } from '../redux/action/panditAuthAction';
import bg from "../assets/img/panditloginbg.png";
import img from "../assets/img/favicon.png";
// import img1 from '../assets/img/login-bg-new.png';

const PanditLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, successPandit, isPanditAuthenticated } = useSelector(
    (state) => state.panditauth
  );

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in...');
    dispatch(loginPandit(userName, password)).then(() => {
      toast.dismiss(toastId);
    });
  };

  useEffect(() => {
    console.log('Login check =>', {
      successPandit,
      isPanditAuthenticated,
      error,
    });

    if (successPandit && isPanditAuthenticated) {
      toast.success('Login successful!');
      navigate('/');
    }

    if (error) {
      toast.error(error);
    }

    return () => {
      dispatch(resetLoginPandit());
    };
  }, [successPandit, isPanditAuthenticated, error, dispatch, navigate]);

  return (
    <div className="pandit-login-container" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', minHeight: '100vh', position: 'relative' }}>
      <div className="overlay"></div>
      <div className="login-wrapper">
        <div className="login-card">
          <div className="logo-section text-center mb-2">
            <div className="logo-circle-1 ">
              <img src={img} alt="Logo" className="logo-image" />
            </div>
          </div>
          <div className="welcome-text text-center mb-2">
            <h2 className="welcome-title">Welcome Back, Pandit Ji</h2>
            <p className="welcome-description ">
              Connect with devotees and spread the divine light of knowledge. Your spiritual guidance creates sacred moments for countless families.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control custom-input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter Your Username"
                required
              />
            </div>
            <div className="form-group mb-3">
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control custom-input password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>
            <div className="form-check mb-3 d-flex 
            ">
              <input
                type="checkbox"
                className="form-check-input me-2"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Signing in...
                </>
              ) : (
                'Sign in to Dashboard'
              )}
            </button>
          </form>
          <div className="divider-section text-center my-2">or</div>
          <div className="footer-links text-center ">
            <Link to="/panditregister" className="link-success">
              New Pandit? Join Us
            </Link>
          </div>
          <div className='row mb-3'></div>
          <div className="testimonial-section text-center mt-2">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: '#FF6B35' }}>★</span>
              ))}
            </div>
            <p className="testimonial-text-pandit-login m-0">
              "This platform has helped me reach more families and conduct meaningful pujas. The booking system is very convenient."
            </p>
            <div className="testimonial-author">- Pandit Rajesh Sharma</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditLogin;