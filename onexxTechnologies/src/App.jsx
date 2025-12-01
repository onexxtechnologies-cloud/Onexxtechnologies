"use client";
import HeroSection from "./pages/herosection.jsx";
import Navbar from "./pages/navbar.jsx";
import UltimateBlueHorizon from "./pages/halfmoon.jsx";
import OnexxatronModel from "./pages/3dmodel.jsx";
import OpenCloseScroll from "./pages/aboutus.jsx";
import ScrollingCards from "./pages/Scrollingcard.jsx";


function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="relative -mt-[70vh]">
      <UltimateBlueHorizon /></div>
      <OpenCloseScroll />
      <ScrollingCards />

      <OnexxatronModel/>
    </>
  );
}

export default App;
