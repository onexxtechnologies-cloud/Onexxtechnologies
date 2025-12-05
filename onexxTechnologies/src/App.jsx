"use client";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// ---- Existing Imports ----
import HeroSection from "./pages/herosection.jsx";
import Navbar from "./pages/navbar.jsx";
import UltimateBlueHorizon from "./pages/halfmoon.jsx";
import OpenCloseScroll from "./pages/aboutus.jsx";
import ScrollingCards from "./pages/Scrollingcard.jsx";
import ProcessScroll from "./pages/stickyscroll.jsx";
import ServicesSection from "./pages/servicesection.jsx";
import FAQs from "./pages/faq.jsx";
import CloseHalfMoon from "./pages/closehalfmoon.jsx";
import CenteredEnquiryForm from "./pages/enquiryform.jsx";
import Footer from "./pages/footer.jsx";

// 🔥 Improved Scroll Handler
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    // 1. Handle standard Hash (#about)
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 80; // slightly larger than nav height for breathing room
        const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } 
    // 2. Handle Pathname masquerading as hash (/about -> scroll to #about)
    else if (pathname !== "/" && pathname !== "") {
       const id = pathname.replace("/", "");
       const element = document.getElementById(id);
       if (element) {
         const navbarHeight = 80;
         const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
         window.scrollTo({ top: y, behavior: "smooth" });
       } else {
         window.scrollTo(0, 0);
       }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

function AppContent() {
  return (
    <>
      <Navbar />

      {/* HOME SECTION */}
      <div id="home" className="pt-0">
        <HeroSection />
      </div>

      {/* HALF MOON */}
      <div className="relative sm:mt-[-35%] mt-[-150%]">
        <UltimateBlueHorizon />
      </div>

      {/* ABOUT SECTION */}
      <div id="about" className="mt-[-60%] sm:mt-[-3%]">
        <OpenCloseScroll />
      </div>

      {/* WORK SECTION (Added ID here) */}
      <div className="pt-0">
        <ScrollingCards />
      </div>

      {/* SERVICES SECTION */}
      <div id="services" className="pt-0">
        <ProcessScroll />
        <ServicesSection />
      </div>

      {/* FAQ SECTION */}
      <div id="faq" className="pt-0">
        <FAQs />
      </div>

      {/* CLOSE HALF MOON */}
      <div className="pt-0">
        <CloseHalfMoon />
      </div>

      {/* CONTACT SECTION */}
      <div id="contact" className="sm:mt-0 mt-[-50%] flex flex-col sm:flex-row justify-centre">
        <CenteredEnquiryForm />
        
      </div>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        {/* All routes render AppContent because it's a Single Page App */}
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}