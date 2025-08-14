import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Pages & Components
import HomePage from '../Components/HomePage';
import LoginPage from '../Components/LoginPage';
import ListOfPooja from '../Page/List-Of-Pooja/ListOfPooja';
import PoojaBookingDetails from '../Page/PoojaBookingDetails';
import Dashboard from '../Page/Dashbord/DashBord';
import Contact from '../Page/Contact/Contact';
import ScaredBooking from '../Page/ScaredBooking';
import Layout from './Layout';
import PrivacyPolicy from '../Page/PrivacyPolicy';
import FAQPage from '../Page/FAQpage';
import TermsOfService from '../Page/TermsOfService';
import PanchangCalendar from '../Page/Panchang';
import AboutUs from '../Components/About';
import GalleryPage from '../Page/GalleryPage';
import NotFoundPage from '../Page/NotFoundPage';
import Booking from '../Page/Booking';
import Blogs from '../Components/BlogsSection/Blogs'
import PanditDashboard from '../Page/PanditDashBoard';
import PanditLogin from '../Components/PanditLogin';
import PanditRegister from '../Components/PanditRegister';
import ShippingDelivery from '../Page/ShippingDelivery';
import CancellationRefund from '../Page/CancellationRefund';

// Auth check actions
import { checkAuth } from '../redux/action/authAction';
import { checkPanditAuth } from '../redux/action/panditAuthAction';
import PanditRegistration from '../Components/PanditRegister';
import FaviconImage from '../Page/FaviconImage';
import AllPandits from '../Components/SeeAllPandits';
import SingleBlogPage from '../Components/BlogsSection/SingleBlogPage';
import BlogsPage from '../Components/BlogsSection/BlogPage';

// ✅ User Protected Route
const ProtectedUserRoute = ({ children }) => {
  const { isAuthenticated, authLoaded } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!authLoaded) return <div className="pt-3 text-center">Loading...</div>;

  return isAuthenticated ? children : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

// ✅ Pandit Protected Route
const ProtectedPanditRoute = ({ children }) => {
  const { isPanditAuthenticated, authPanditLoaded } = useSelector((state) => state.panditauth);
  const location = useLocation();

  if (!authPanditLoaded) return <div className="pt-3 text-center">Loading...</div>;

  return isPanditAuthenticated ? children : (
    <Navigate to="/panditlogin" state={{ from: location }} replace />
  );
};


function AppRoutes() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isPanditAuthenticated } = useSelector((state) => state.panditauth);
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(checkPanditAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* ================= Public Auth Routes ================= */}

      <Route
        path="/login"
        element={
          isAuthenticated
            ? <Navigate to={location.state?.from?.pathname || '/dashboard'} replace />
            : <LoginPage />
        }
      />

      <Route
        path="/panditlogin"
        element={
          isPanditAuthenticated
            ? <Navigate to={location.state?.from?.pathname || '/panditdashboard'} replace />
            : <PanditLogin />
        }
      />

      <Route path="/panditregister" element={<PanditRegister />} />

      {/* ================= Protected Routes ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedUserRoute>
            <Dashboard />
          </ProtectedUserRoute>
        }
      />

      <Route
        path="/panditdashboard"
        element={
          <ProtectedPanditRoute>
            <PanditDashboard />
          </ProtectedPanditRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <ProtectedUserRoute>
            <Booking />
          </ProtectedUserRoute>
        }
      />

      {/* ================= Public Routes with Layout ================= */}

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="listofpuja" element={<ListOfPooja />} />
        <Route path="pujaBookingDetails" element={<PoojaBookingDetails />} />
        <Route path="scaredbooking" element={<ScaredBooking />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="termsofservice" element={<TermsOfService />} />
        <Route path="shippingAndDelivery" element={<ShippingDelivery />} />
        <Route path="cancellationAndRefund" element={<CancellationRefund />} />
        <Route path="/all-pandits" element={<AllPandits />} />
    <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blog/:id" element={<SingleBlogPage />} />


        <Route path="faq" element={<FAQPage />} />
        <Route path="panchang" element={<PanchangCalendar />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="gallery" element={<GalleryPage />} />
         <Route path="favicon.png" element={<FaviconImage/>} />
        {/* <Route path="panditregistration" element={<PanditRegistration />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
