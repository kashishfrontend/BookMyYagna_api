import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import '../../assets/css/Floating.css'; // Import the CSS file

const FloatingContactButton = () => {
  return (
    <Link
  to="/contact"
  className="btn btn-success position-fixed bottom-0 end-0 m-4 d-flex align-items-center justify-content-center shadow-lg phone-wave"
  style={{
    zIndex: 1050,
    borderRadius: "50%",
    padding: "16px",
    width: "60px",
    height: "60px",
  }}
>
  <FaPhoneAlt style={{ fontSize: "1.5rem", zIndex: 2 }} />
  <span className="wave-circle"></span>
  <span className="wave-circle delay-1"></span>
</Link>

  );
};

export default FloatingContactButton;




