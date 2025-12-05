import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import NotFound from '../pages/NotFoundPage';
import LandingPage from '../pages/LandingPage';



export const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <NotFound />,
        children: [
            { path: "/", element: <LandingPage /> },

        
        ],

    },
 
]);


