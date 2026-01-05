import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import AdminSidebar from '../components/adminsidebar/AdminSidebar';
import CustomerNavbar from '../components/customernavbar/CustomerNavbar';
import CustomerFooter from '../components/customerfooter/CustomerFooter';
import Navbar from '../components/navbar/Navbar';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <CustomerNavbar />

      {/* Page Content */}
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <CustomerFooter />
    </div>
  );
};

export default CustomerLayout;


