// src/Components/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainNavbar from '../Components/MainNavbar';
import Footer from '../Components/Footer';
import FloatingContactButton from '../Page/Contact/Floatingtring';
// import FloatingContactButton from '../Components/';

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Routes where each component should be hidden
  const hideNavbarPaths = ['/favicon.png', '/no-navbar'];
  const hideFooterPaths = ['/favicon.png', '/no-footer'];
  const hideFloatingBtnPaths = ['/favicon.png', ' '];

  const hideNavbar = hideNavbarPaths.some((path) => currentPath.startsWith(path));
  const hideFooter = hideFooterPaths.some((path) => currentPath.startsWith(path));
  const hideFloating = hideFloatingBtnPaths.some((path) => currentPath.startsWith(path));

  return (
    <div>
      {!hideNavbar && <MainNavbar />}
      <Outlet />
      {!hideFooter && <Footer />}
      {!hideFloating && <FloatingContactButton />}
    </div>
  );
}

export default Layout;
