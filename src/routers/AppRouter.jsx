// import { createBrowserRouter } from 'react-router-dom';
// import AppLayout from '../layouts/AppLayout';
// import NotFound from '../pages/NotFoundPage';
// import LandingPage from '../pages/LandingPage';
// import RegisterPage from '../pages/RegisterPage';
// import LoginPage from '../pages/LoginPage';
// import ForgetPasswordPage from '../pages/ForgetPasswordPage';
// import UpdatePasswordPage from "../pages/UpdatePasswordPage";



// export const router = createBrowserRouter([
//     {
//         element: <AppLayout />,
//         errorElement: <NotFound />,
//         children: [
//             { path: "/", element: <LandingPage /> },
//             {path:"/register", element:<RegisterPage/>},
//             {path:"/login", element:<LoginPage/>},
//             {path:"/forgotpassword", element:<ForgetPasswordPage/>},
//             {path:"/updatepassword", element:<UpdatePasswordPage/>},

        
//         ],
        





//     },
 
// ]);


import { createBrowserRouter } from 'react-router-dom';
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




export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            { path: "/", element: <LandingPage /> },
            {path:"/register", element:<RegisterPage/>},
            {path:"/login", element:<LoginPage/>},
            {path:"/forgotpassword", element:<ForgetPasswordPage/>},
            {path:"/updatepassword", element:<UpdatePasswordPage/>},
            {path: "/customer/membership", element: <Membership/> },
            {path: "/customer/classes", element: <Classes/>},
            {path: "/customer/progress", element: <Progress/>},
            {path: "/customer/diets", element: <Diets/>},
            {path: "/customer/payment", element: <Payment/>},
            {path: "/customer/profile", element: <ProfilePage/> },

            

        
        ],
    },
    {
        element: <ProtectedRoute requiredRole="Customer">
        <CustomerLayout/>
        </ProtectedRoute>,
        errorElement: <NotFound />,
        children: [
          { path: "/customer/membership", element: <Membership/> },
          
          
        ],
        





    },
 
]);



