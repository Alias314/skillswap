import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
