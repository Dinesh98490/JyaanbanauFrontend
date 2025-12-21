import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import AdminSidebar from '../components/adminsidebar/AdminSidebar';
import CustomerNavbar from '../components/customernavbar/CustomerNavbar';
import CustomerFooter from '../components/customerfooter/CustomerFooter';
import Navbar from '../components/navbar/Navbar';

const CustomerLayout = () => {
  
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <div className="flex h-screen">
      
      <CustomerNavbar activeItem={activeItem} setActiveItem={setActiveItem} />
      <CustomerNavbar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex flex-col flex-1">
        <CustomerNavbar/>
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
        <CustomerFooter/>
      </div>
    </div>
  );
};

export default CustomerLayout;