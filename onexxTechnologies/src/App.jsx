"use client";
import HeroSection from "./pages/herosection.jsx";
import Navbar from "./pages/navbar.jsx";
import UltimateBlueHorizon from "./pages/halfmoon.jsx";
import OnexxatronModel from "./pages/3dmodel.jsx";
import OpenCloseScroll from "./pages/aboutus.jsx";
import ScrollingCards from "./pages/Scrollingcard.jsx";
import ProcessScroll from "./pages/stickyscroll.jsx"

function App() {
  return (
    <>
    <div id="home">
      <Navbar /></div>
      <HeroSection />
      <div className="relative -mt-[70vh]">
      <UltimateBlueHorizon /></div>
      <div id="about" className="sm:mt-[0] mt-[-30%]">
      <OpenCloseScroll /></div>
      <ScrollingCards />
      <ProcessScroll/>
      <OnexxatronModel/>
    </>
  );
}

export default App;
