/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-white to-orange-50 border-t border-orange-100">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand Section */}
        <motion.div {...fadeUp(0)}>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Research<span className="text-orange-600">Kart</span>
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-6 max-w-xs">
            Structured, ethical, and expert guidance for PhD scholars at every stage of their journey — from ideation to publication and beyond.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div {...fadeUp(0.1)}>
          <h3 className="text-sm font-semibold text-gray-900">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/" className="text-gray-600 hover:text-orange-600">Home</Link></li>
            <li><Link to="/about-us" className="text-gray-600 hover:text-orange-600">About Us</Link></li>
            <li><Link to="/services" className="text-gray-600 hover:text-orange-600">Services</Link></li>
            <li><Link to="/contact-us" className="text-gray-600 hover:text-orange-600">Contact Us</Link></li>
            <li><Link to="/book-free-consultation" className="text-gray-600 hover:text-orange-600">Book Consultation</Link></li>
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div {...fadeUp(0.2)}>
          <h3 className="text-sm font-semibold text-gray-900">Our Services</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="text-gray-600 hover:text-orange-600">Topic Ideation</li>
            <li className="text-gray-600 hover:text-orange-600">Methodology Support</li>
            <li className="text-gray-600 hover:text-orange-600">Data Analysis</li>
            <li className="text-gray-600 hover:text-orange-600">Thesis Structuring</li>
            <li className="text-gray-600 hover:text-orange-600">Publication Guidance</li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div {...fadeUp(0.3)}>
          <h3 className="text-sm font-semibold text-gray-900">Get in Touch</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2 text-gray-600"><MapPin size={16} /> India</li>
            
            <li className="flex items-center gap-2 text-gray-600"><Mail size={16} /> contact@researchkart.in</li>
            <li className="flex items-center gap-2 text-gray-600"><Mail size={16} /> hello@researchkart.in</li>
            <li className="flex items-center gap-2 text-gray-600"><Phone size={16} /> +91 1135629155 (Telephone)</li>
            <li className="flex items-center gap-2 text-gray-600"><Phone size={16} /> +91 9296564604 (Mobile)</li>
          </ul>
        </motion.div>
      </div>

      {/* Social Icons */}
      <div className="mx-auto max-w-7xl px-6 flex justify-center gap-5 pb-6">
        <a href="#" className="text-gray-600 hover:text-orange-600"><Linkedin size={20} /></a>
        <a href="#" className="text-gray-600 hover:text-orange-600"><Instagram size={20} /></a>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} <span className="font-semibold text-gray-700">ResearchKart</span>. All rights reserved.
      </div>
    </footer>
  );
}
