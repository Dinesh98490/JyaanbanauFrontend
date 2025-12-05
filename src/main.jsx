import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Slide, ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <QueryClientProvider client={queryClient}>
    <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          theme="light"
          transition={Slide}
        />
         </QueryClientProvider>
  </StrictMode>
)
