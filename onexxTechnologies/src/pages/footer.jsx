import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Navigation items configuration
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
    { name: 'FAQ', id: 'faq' },
  ];

  return (
    <footer className="w-full bg-black text-white overflow-hidden py-12 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

        <div className="relative w-full flex justify-center items-center">
          {/* Glow layer 1 */}
          <h1
            className="absolute text-[12vw] md:text-[15vw] font-black tracking-[0.05em] text-transparent select-none"
            style={{
              WebkitTextStroke: '4px rgba(0,180,255,1)',
              filter: 'blur(12px)',
            }}
          >
            ONEXX
          </h1>

          {/* Glow layer 2 */}
          <h1
            className="absolute text-[12vw] md:text-[15vw] font-black tracking-[0.05em] text-transparent select-none"
            style={{
              WebkitTextStroke: '6px rgba(0,180,255,1)',
              filter: 'blur(24px)',
            }}
          >
            ONEXX
          </h1>

          {/* Main stroke layer */}
          <h1
            className="relative text-[12vw] md:text-[15vw] font-black tracking-[0.05em] text-transparent select-none"
            style={{
              WebkitTextStroke: '2px rgba(0,180,255,1)',
            }}
          >
            ONEXX
          </h1>
        </div>
        {/* --- Instagram Icon --- */}
        <div className="mb-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-gray-700 bg-gray-900/50 hover:bg-white hover:text-black transition-all duration-300"
          >
            {/* SVG for Instagram Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>

        {/* --- Navigation Links --- */}
        <nav className="w-full flex flex-wrap justify-between items-center mb-8 px-4 md:px-20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={`/#${link.id}`}
              className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wide py-2"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* --- Divider Line --- */}
        <div className="w-full h-px bg-gray-800 mb-8" />

        {/* --- Footer Bottom --- */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p className="mb-4 md:mb-0">
            &copy; 2025 ONEXX Inc. All rights reserved
          </p>

          <div className="flex space-x-6">
            <Link to="/terms" className="hover:text-gray-300 transition-colors">
              Term of Service
            </Link>
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer >
  );
};

export default Footer;