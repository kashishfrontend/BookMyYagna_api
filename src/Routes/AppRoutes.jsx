import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// Page & Component Imports
import HomePage from '../Components/HomePage';
import LoginPage from '../Components/LoginPage';
import ListOfPooja from '../Page/List-Of-Pooja/ListOfPooja';
import PoojaBookingDetails from '../Page/PoojaBookingDetails';
import Dashboard from '../Page/Dashbord/DashBord';
import Contact from '../Page/Contact/Contact';  
import ScaredBooking from '../Page/ScaredBooking';
import Layout from './Layout';
import PrivacyPolicy from '../Page/PrivacyPolicy';
import FAQ from '../Components/FAQ';
import TermsOfService from '../Page/TermsOfService';
import PanchangCalendar from '../Page/Panchang';
import AboutUs from '../Components/About';
import { checkAuth } from '../redux/action/authAction';
import Gallery from '../Components/gallery';
import Booking from '../Page/Booking';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authLoaded } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!authLoaded) {
    return <div className="pt-3 text-center">Loading......</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function AppRoutes() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={location.state?.from?.pathname || '/dashboard'} replace />
          ) : (
            <LoginPage />
          )
        }
      />
      {/* Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Routes under Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="listofpooja" element={<ListOfPooja />} />
        <Route path="poojaBookingDetails" element={<PoojaBookingDetails />} />
        <Route path="scaredbooking" element={<ScaredBooking />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="termsofservice" element={<TermsOfService />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="panchang" element={<PanchangCalendar />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="gallery" element={<Gallery />} />
        <Route
          path="booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;