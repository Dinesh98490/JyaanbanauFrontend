import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const AppLayout = () => (
  <>
    <div className="fixed top-0 left-0 w-full z-50">
      <Navbar />
    </div>
    <main className="pt-16">
      <Outlet />
    </main>
    <Footer />
  </>
);
export default AppLayout;

// const AppLayout = () => {
//     const { pathname } = useLocation();
//     const hideNavbar = HIDDEN_NAV_ROUTES.some((route) => pathname.startsWith(route));
  
//     return (
//       <div className="flex min-h-screen flex-col bg-white">
//         {!hideNavbar && <Navbar />}
//         <main className="flex-1">
//           <Outlet />
//         </main>
//       </div>
//     );
//   };
