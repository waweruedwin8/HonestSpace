import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import Index from "@/pages/Index";
import Browse from "@/pages/Browse";
import HowItWorks from "@/pages/HowItWorks";
import BecomeScout from "@/pages/BecomeScout";
import About from "@/pages/About";
import ListProperty from "@/pages/ListProperty";
import PropertyDetails from "@/pages/PropertyDetails";
import LovedProperties from "@/pages/LovedProperties";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

import { AdminDashboard } from "@/pages/AdminDashboard";
import { ScoutDashboard } from "@/pages/ScoutDashboard";
import { LandlordDashboard } from "@/pages/LandlordDashboard";

export const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Route users based on their type when authentication state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      // Don't redirect if user is already on their correct dashboard
      const currentPath = location.pathname;
      const isDashboardRoute = ['/landlord', '/scout', '/admin'].includes(currentPath);
      
      switch (user.userType) {
        case 'landlord':
          if (!isDashboardRoute || currentPath !== '/landlord') {
            navigate('/landlord');
          }
          break;
        case 'scout':
          if (!isDashboardRoute || currentPath !== '/scout') {
            navigate('/scout');
          }
          break;
        case 'admin':
          if (!isDashboardRoute || currentPath !== '/admin') {
            navigate('/admin');
          }
          break;
        case 'tenant':
        default:
          // Tenants stay on main app, only redirect if on auth page
          if (currentPath === '/auth') {
            navigate('/');
          }
          break;
      }
    }
  }, [isAuthenticated, user, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/become-scout" element={<BecomeScout />} />
      <Route path="/about" element={<About />} />
      <Route path="/list-property" element={<ListProperty />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/loved-properties" element={<LovedProperties />} />
      <Route path="/auth" element={<Auth />} />

      {/* Dashboards */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/scout" element={<ScoutDashboard />} />
      <Route path="/landlord" element={<LandlordDashboard />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};