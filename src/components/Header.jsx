import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about-us", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/contact-us", label: "Contact Us" },
    { path: "/book-free-consultation", label: "Book Consultation" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-gray-900/90 to-black/80 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* ✅ Logo with Circle Background */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
            {/* 👉 If you want to use an image, replace span with <img src="/logo.png" /> */}
            <span className="text-white font-bold text-lg">RK</span>
          </div>
          <span className="text-2xl md:text-3xl font-extrabold tracking-wide text-orange-400 hover:text-orange-300 transition">
            Research<span className="text-white">Kart</span>
          </span>
        </Link>

        {/* ✅ Desktop Navigation */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium text-lg transition duration-300 ${
                location.pathname === link.path
                  ? "text-orange-400"
                  : "text-white hover:text-orange-300"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-orange-400"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* ✅ CTA Button on Desktop */}
        <div className="hidden md:block">
          <Link
            to="/book-free-consultation"
            className="px-5 py-2 bg-orange-400 text-black font-semibold rounded-lg shadow-md hover:bg-orange-500 transition"
          >
            Book Now
          </Link>
        </div>

        {/* ✅ Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ✅ Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md px-6 py-4 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block text-lg font-medium transition ${
                location.pathname === link.path
                  ? "text-orange-400"
                  : "text-white hover:text-orange-300"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* CTA button on mobile */}
          <Link
            to="/book-free-consultation"
            className="block mt-4 px-5 py-2 bg-orange-400 text-black font-semibold rounded-lg text-center hover:bg-orange-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
