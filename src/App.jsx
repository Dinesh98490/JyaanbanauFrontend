import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  );
}



