import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    alert('Please login first!');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
