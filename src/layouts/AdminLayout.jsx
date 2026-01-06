import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/adminsidebar/AdminSidebar';
import AdminNavbar from '../components/adminnavbar/AdminNavbar';

const AdminLayout = () => {
  //   activeItem state and handler
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="flex h-screen">
      
      <AdminSidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

