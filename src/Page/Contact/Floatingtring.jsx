// import React from "react";
// import { Link } from "react-router-dom";
// import { FaPhoneAlt } from "react-icons/fa";

// const FloatingContactButton = () => {
//   return (
//     <Link
//       to="/contact"
//       className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center gap-2 animate-bounce"
//     >
//       <FaPhoneAlt className="text-white" />
//       <span className="hidden md:inline">Contact Us</span>
//     </Link>
//   );
// };

// export default FloatingContactButton;

import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import './Floating.css'; // Import the CSS file

const FloatingContactButton = () => {
  return (
    <Link
      to="/contact"
      className="btn btn-success position-fixed bottom-0 end-0 m-4 d-flex align-items-center gap-2 shadow-lg floating-glow"
      style={{ zIndex: 1050, borderRadius: "50px", padding: "10px 16px" }}
    >
      <FaPhoneAlt />
      <span className="d-none d-md-inline">Contact Us</span>
    </Link>
  );
};

export default FloatingContactButton;




