import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AdminNavbar from '../components/adminnavbar/AdminNavbar';
import AdminSidebar from '../components/adminsidebar/AdminSidebar';


const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Page Content */}
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>

      {/* Footer */}
      <AdminNavbar />
    </div>
  );
};

export default AdminLayout;


