// components/FaviconImage.js
import React from 'react';
import favicon from '../assets/img/favicon.png'; // adjust the path as needed

const FaviconImage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img src={favicon} alt="Favicon" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default FaviconImage;
