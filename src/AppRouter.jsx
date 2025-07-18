import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import FlightPage from './pages/FlightPage';
import CheckFlightPage from './pages/CheckFlightPage';
import TravelTripPage from './pages/TravelTripPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import PromotionsPage from './pages/PromotionsPage';
import DestinationsPage from './pages/DestinationsPage';
import TravelGuidesPage from './pages/TravelGuidesPage';
import QuickBookingPage from './pages/QuickBookingPage';

// Placeholder component for new pages
const ComingSoonPage = () => (
  <div style={{ 
    padding: '40px', 
    textAlign: 'center', 
    maxWidth: '800px', 
    margin: '40px auto',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
  }}>
    <h1 style={{ color: '#1890ff', marginBottom: '20px' }}>Coming Soon!</h1>
    <p style={{ fontSize: '18px', marginBottom: '20px' }}>
      We're working hard to bring you this exciting new feature. Please check back soon!
    </p>
    <div style={{ 
      padding: '20px', 
      background: '#f5f8ff', 
      borderRadius: '8px',
      marginTop: '20px'
    }}>
      <p>In the meantime, you can explore our other features or contact our support team if you have any questions.</p>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <FlightPage />,
      },
      {
        path: 'check-flight',
        element: <CheckFlightPage />,
      },
      {
        path: 'travel-trip',
        element: <TravelTripPage />,
      },
      {
        path: 'promotions',
        element: <PromotionsPage />,
      },
      {
        path: 'destinations',
        element: <DestinationsPage />,
      },
      {
        path: 'travel-guides',
        element: <TravelGuidesPage />,
      },
      {
        path: 'quick-booking',
        element: <QuickBookingPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'support',
        element: <SupportPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'terms',
        element: <ComingSoonPage />,
      },
      {
        path: 'privacy',
        element: <ComingSoonPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
