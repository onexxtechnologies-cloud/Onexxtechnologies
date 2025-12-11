"use client";

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      window.history.replaceState({}, "", "/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 50);
    }
  }, []);

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
function AppContent({ forceDesktopView }) {
  return (
    <>
      <Helmet>
        <title>Onexx Technologies Custom Website, App & 3D Model Development</title>

        <meta
          name="description"
          content="We provide professional website development, custom web apps, mobile app development, and high-quality 3D model creation."
        />

        <meta
          name="keywords"
          content="onexx, website development, app development, 3D model design, UI UX, custom software"
        />

        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Onexx Technologies",
  "url": "https://onexxtechnologies.com",
  "logo": "https://onexxtechnologies.com/ONEXX.png",
  "description": "We provide professional website development, custom web apps, mobile app development, and high-quality 3D model creation.",
  "foundingDate": "2025",
  "founder": {
    "@type": "Person",
    "name": "Onexx Technologies Team"
  },
  "sameAs": [
    "https://www.instagram.com/onexx_technologies"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "onexxtechnologies@gmail.com",
    "contactType": "customer support",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN"
  },
  "service": [
    {
      "@type": "Service",
      "name": "Website Development",
      "description": "Custom website design and development services with modern UI/UX."
    },
    {
      "@type": "Service",
      "name": "Web App Development",
      "description": "Professional custom web application development."
    },
    {
      "@type": "Service",
      "name": "Mobile App Development",
      "description": "High-quality Android and iOS app development."
    },
    {
      "@type": "Service",
      "name": "3D Model Creation",
      "description": "High-quality 3D product and character models."
    },
    {
      "@type": "Service",
      "name": "UI/UX Design",
      "description": "Modern UI/UX design for websites and applications."
    }
  ]
}
`}
        </script>
      </Helmet>

      <Navbar />

      <div id="home" className={forceDesktopView ? "pt-0 mt-1" : "pt-0"}>
        <HeroSection />
      </div>

      <div className={forceDesktopView ? "relative mt-2" : "relative sm:mt-[-35%] mt-[-150%]"}>
        <UltimateBlueHorizon />
      </div>

      <div id="about" className={forceDesktopView ? "mt-2" : "mt-[-60%] sm:mt-[-60%]"}>
        <OpenCloseScroll />
      </div>

      <div className={forceDesktopView ? "mt-2" : ""}>
        <ScrollingCards />
      </div>

      <div id="services" className={forceDesktopView ? "mt-2" : ""}>
        <ProcessScroll />
        <ServicesSection />
      </div>

      <div id="faq" className={forceDesktopView ? "mt-2" : ""}>
        <FAQs />
      </div>

      <div className={forceDesktopView ? "mt-2" : ""}>
        <CloseHalfMoon />
      </div>

      <div
        id="contact"
        className={
          forceDesktopView
            ? "mt-2 flex flex-col"
            : "sm:mt-[-5%] mt-[-20%] flex flex-col sm:flex-row justify-centre"
        }
      >
        <CenteredEnquiryForm />
      </div>

      <Footer />
    </>
  );
}

// --------------------------------------------------
// 🧠 Router + Mobile Desktop Site Detection
// --------------------------------------------------
export default function App() {
  const [forceDesktopView, setForceDesktopView] = useState(false);

  useEffect(() => {
    const checkDesktopSite = () => {
      const isMobile = window.screen.width <= 500;
      const isDesktopSite = window.innerWidth > 500;
      setForceDesktopView(isMobile && isDesktopSite);
    };

    checkDesktopSite();
    window.addEventListener("resize", checkDesktopSite);

    return () => window.removeEventListener("resize", checkDesktopSite);
  }, []);

  return (
    <div
      className={
        forceDesktopView
          ? "max-w-full px-4 sm:px-6 mx-auto overflow-x-hidden"
          : "w-full"
      }
    >
      <Router>
        <ScrollToHash />
        <Routes>
          <Route path="/*" element={<AppContent forceDesktopView={forceDesktopView} />} />
        </Routes>
      </Router>
    </div>
  );
}
