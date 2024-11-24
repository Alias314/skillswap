// src/components/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function MainLayout() {
  return (
    <div className="flex flex-col"> {/* Full height with flexbox */}
      <Header />

      {/* Content area with flex-grow to push footer down */}
      <div className="flex-1 w-full">
        <Outlet />
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default MainLayout;