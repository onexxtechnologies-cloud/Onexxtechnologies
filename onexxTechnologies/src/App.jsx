"use client";
import HeroSection from "./pages/herosection.jsx";
import Navbar from "./pages/navbar.jsx";
import UltimateBlueHorizon from "./pages/halfmoon.jsx";
import OnexxatronModel from "./pages/3dmodel.jsx";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="relative -mt-[80vh]">
      <UltimateBlueHorizon /></div>
      <OnexxatronModel/>
    </>
  );
}

export default App;
