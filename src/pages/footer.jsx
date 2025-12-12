import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";

const Footer = () => {
  // Navigation items configuration
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
    { name: 'FAQ', id: 'faq' },
  ];
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [policyText, setPolicyText] = useState("");

  useEffect(() => {
    if (showPrivacy) {
      fetch("/privacy_policy.txt")
        .then((res) => res.text())
        .then((txt) => setPolicyText(txt));
    }
  }, [showPrivacy]);

  return (
    <footer className="w-full bg-black text-white overflow-hidden py-1 ">
      <div className="max-w-9xl mx-auto px-6 flex flex-col items-center">

        {/* Title container set to w-1/2 (half width) and centered with mx-auto */}
        <div className="relative w-1/2 mx-auto flex justify-center items-center">

          {/* Main text layer with black fill (text-black) to mask the internal glow, positioned highest (z-20) */}
          <h1
            className="relative text-[25vw] md:text-[20vw] font-black tracking-[0.05em] text-black select-none z-15"
            style={{
              // text-black class ensures the fill is black, "cutting out" the glow layers
            }}
          >
            ONEXX
          </h1>

          {/* Glow layer 2 (largest blur) - Absolute position, z-10 */}
          <h1
            className="absolute text-[25vw] md:text-[20vw] font-black tracking-[0.05em] text-transparent select-none z-10"
            style={{
              WebkitTextStroke: '9px rgba(0,20,255,1)',
              filter: 'blur(24px)',
            }}
          >
            ONEXX
          </h1>

          {/* Glow layer 1 (medium blur) - Absolute position, z-10 */}
          <h1
            className="absolute text-[25vw] md:text-[20vw] font-black tracking-[0.05em] text-transparent select-none z-10"
            style={{
              WebkitTextStroke: '4px rgba(0,60,255,1)',
              filter: 'blur(12px)',
            }}
          >
            ONEXX
          </h1>

          {/* Main stroke layer (crisp edge) - Absolute position, z-10 */}
          <h1
            className="absolute text-[25vw] md:text-[20vw] font-black tracking-[0.05em] text-transparent select-none z-12"
            style={{
              WebkitTextStroke: '2px rgba(0,180,255,1)',
            }}
          >
            ONEXX
          </h1>

        </div>
        {/* --- Instagram Icon --- */}
        <div className="mb-6">
          <a
            href="https://www.instagram.com/onexx_technologies?igsh=MTZwemlqcTJyMjdtYg=="
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
            <button
              onClick={() => setShowPrivacy(true)}
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </button>

            {/* Popup Modal */}
            {showPrivacy && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-xl overflow-y-auto max-h-[80vh]">

                  {/* Header Row */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Privacy Policy</h2>

                    <button
                      onClick={() => setShowPrivacy(false)}
                      className="bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800"
                    >
                      Close
                    </button>
                  </div>

                  {/* Content */}
                  <pre className="whitespace-pre-wrap text-gray-800 mb-6">
                    {policyText}
                  </pre>

                </div>
              </div>

            )}

          </div>
        </div>

      </div>
    </footer >
  );
};

export default Footer;