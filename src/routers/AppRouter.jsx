import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import NotFound from '../pages/NotFoundPage';
import LandingPage from '../pages/LandingPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';



export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            { path: "/", element: <LandingPage /> },
            {path:"/register", element:<RegisterPage/>},
            {path:"/login", element:<LoginPage/>},
            {path:"/forgotpassword", element:<ForgetPasswordPage/>},

        
        ],

    },
 
]);


