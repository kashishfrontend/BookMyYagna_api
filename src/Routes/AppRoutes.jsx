// src/Routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Components/HomePage';
import LoginPage from '../Components/LoginPage';
import Booking from '../Page/Booking';
import ListOfPooja from '../Page/List-Of-Pooja/ListOfPooja';
import PoojaBookingDetails from '../Page/PoojaBookingDetails';
import DashBord from '../Page/Dashbord/DashBord';
import DivineJournal from '../Page/DivineJournal';
import Contact from '../Page/Contact/Contact';
import TermsAndVision from '../Page/TermsVission';
import ScaredBooking from '../Page/ScaredBooking';
import FaqFooter from '../Page/FaqFooter';
import Layout from './Layout';
import PrivacyPolicy from '../Page/PrivacyPolicy';
import FAQ from '../Components/FAQ';
import TermsOfService from '../Page/TermsOfService';
import PanchangCalendar from '../Page/Panchang';
import AboutUs from '../Components/About';
import Account from '../Components/Account';
import ProtectedRoute from '../Page/ProtectedRoute';
// import useAuth from '../context/authContext';

function AppRoutes() {
  // const { isAuthenticated, user } = useAuth();

  return (
    <Routes>

      {/* Routes WITHOUT Navbar & Footer */}
     <Route path="/login" element={<LoginPage />} />
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashBord />
    </ProtectedRoute>
  
    }/>

      {/* Routes WITH Navbar & Footer */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="booking" element={<Booking />} />
        <Route path="listofpooja" element={<ListOfPooja />} />
        <Route path="poojaBookingDetails" element={<PoojaBookingDetails />} />
        <Route path="divinejournal" element={<DivineJournal />} />
        <Route path="termsVision" element={<TermsAndVision />} />
        <Route path="scaredbooking" element={<ScaredBooking />} />
        <Route path="faq" element={<FaqFooter />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="termsofservice" element={<TermsOfService />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="panchang" element={<PanchangCalendar />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="account" element={<Account />} />

      </Route>
      
    </Routes>
  );
}

export default AppRoutes;
