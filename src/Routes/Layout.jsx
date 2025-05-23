// src/Components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from '../Components/MainNavbar';
import Footer from '../Components/Footer';

function Layout() {
  return (
    <div>
      <MainNavbar />
      <Outlet /> 
      <Footer />
    </div>
  );
}

export default Layout;
