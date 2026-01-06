import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import NotFound from '../pages/NotFoundPage';
import LandingPage from '../pages/LandingPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import UpdatePasswordPage from "../pages/UpdatePasswordPage";
import Membership from '../pages/Membership';
import ProtectedRoute from './AdminGuard';
import CustomerLayout from '../layouts/CustomerLayout';
import Classes from '../pages/Classes';
import Progress from '../pages/Progress';
import Diets from '../pages/Diets';
import Payment from '../pages/Payment';
import ProfilePage from '../pages/Profile';
import AdminLayout from '../layouts/AdminLayout';
import DashboardPage from '../pages/DashboardPage';
import MemberPage from '../pages/MemberPage';


export const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/forgotpassword", element: <ForgetPasswordPage /> },
        { path: "/updatepassword", element: <UpdatePasswordPage /> },
      ],
    },
    {
      path: "/customer",
      element: (
        <ProtectedRoute requiredRole="Customer">
          <CustomerLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="membership" /> },
        { path: "membership", element: <Membership /> },
        { path: "classes", element: <Classes /> },
        { path: "progress", element: <Progress /> },
        { path: "diets", element: <Diets /> },
        { path: "payment", element: <Payment /> },
        { path: "profile", element: <ProfilePage /> },
      ],
    },

    {
      path: "/admin",
      element: (
        <ProtectedRoute requiredRole="Admin">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Navigate to="dashboard" /> },
        {path: "dashboard", element: <DashboardPage />},
        {path: "members", element:<MemberPage/>}, 
        
      ],
    },
  ]);