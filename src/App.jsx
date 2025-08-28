// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import BookFreeConsultation from "./pages/BookFreeConsultation";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ Admin Dashboard Page
import Header from "./components/Header"; 
import Footer from "./components/Footer"; // ✅ Global Footer

// ✅ Animation wrapper for smooth page transitions
function PageWrapper({ children }) {
  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex-1">{children}</div>
    </motion.div>
  );
}

// ✅ Animated Routes
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about-us" element={<PageWrapper><AboutUs /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/contact-us" element={<PageWrapper><ContactUs /></PageWrapper>} />
        <Route path="/book-free-consultation" element={<PageWrapper><BookFreeConsultation /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} /> {/* ✅ Admin route */}
      </Routes>
    </AnimatePresence>
  );
}

// ✅ Main App
export default function App() {
  return (
    <Router>
      <Header /> {/* Global Header */}
      <div className="pt-20"> {/* Push content below fixed header */}
        <AnimatedRoutes />
      </div>
      <Footer /> {/* ✅ Global Footer */}
    </Router>
  );
}
