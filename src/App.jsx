"use client";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";


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


// --------------------------------------------------
// 🔥 Improved Scroll + Refresh Handler
function ScrollToHash() {
  const { hash, pathname } = useLocation();

  // Disable browser auto scroll restore
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Force reset URL + scroll top on refresh
  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      window.history.replaceState({}, "", "/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 50);
    }
  }, []);

  // Handle hash or pathname scroll behavior
  useEffect(() => {
    let id = hash ? hash.replace("#", "") : pathname.replace("/", "");

    if (!id || id === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
    }
  }, [hash, pathname]);

  return null;
}


// --------------------------------------------------
// 👉 Main Content
// --------------------------------------------------
function AppContent() {
  return (
    <><Helmet>
      <title>Onexx-Technologies Custom Website, App & 3D Model Development</title>

      <meta
        name="description"
        content="We provide professional website development, custom web apps, mobile app development, and high-quality 3D model creation."
      />

      <meta
        name="keywords"
        content="website development, app development, 3D model design, UI UX, custom software"
      />
    </Helmet>

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
      <div id="about" className="mt-[-60%] sm:mt-[-60%]">
        <OpenCloseScroll />
      </div>

      {/* WORK SECTION */}
      <div className="pt-0">
        <ScrollingCards />
      </div>

      {/* SERVICES SECTION */}
      <div id="services" className="pt-0">
        <ProcessScroll />
        <ServicesSection />
      </div>

      {/* FAQ */}
      <div id="faq" className="pt-0">
        <FAQs />
      </div>

      {/* CLOSE HALF MOON */}
      <div className="pt-0">
        <CloseHalfMoon />
      </div>

      {/* CONTACT */}
      <div id="contact" className="sm:mt-[-5%] mt-[-20%] flex flex-col sm:flex-row justify-centre">
        <CenteredEnquiryForm />
      </div>

      <Footer />
    </>
  );
}


// --------------------------------------------------
// 🧠 Router Setup
// --------------------------------------------------
export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}
