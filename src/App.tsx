/**
 * Main App Router
 * Routes all pages and integrates AI features
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { ChatWidget } from "@/components/ai";

// Public Pages
import LandingPage from "@/pages/landing/LandingPage";
import AboutUs from "@/pages/public/AboutUs";
import ContactUs from "@/pages/public/ContactUs";
import OralHealthTips from "@/pages/public/OralHealthTips";
import SymptomCheckerPage from "@/pages/public/SymptomCheckerPage";
import MarketerApplication from "@/pages/public/MarketerApplication";
import OrderTracking from "@/pages/tracking/OrderTracking";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ContentGeneratorPage from "@/pages/admin/ContentGeneratorPage";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      {/* Chat Widget on all pages */}
      <ChatWidget userId={user?.id || "anonymous"} mode="chat" />

      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Routes */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/oral-health-tips" element={<OralHealthTips />} />
        <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
        <Route path="/marketer-application" element={<MarketerApplication />} />
        <Route path="/order-tracking" element={<OrderTracking />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/content-generator" element={<ContentGeneratorPage />} />

        {/* Fallback */}
        <Route path="*" element={<div className="p-10 text-center text-gray-600">Page not found</div>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
