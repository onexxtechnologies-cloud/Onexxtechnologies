"use client";

import React from "react";
import AuroraBackground from "./Aurorabackground";
import "./AuroraBackground.css"
import NeonWavesCenterGlow from "./wavetest";
const HeroSection = () => {
  return (
    <>
      {/* Fonts */}


      <AuroraBackground
        colorStops={["#0000FF", "#728FCE", "#0059ff"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="relative w-full text-center px-6  pt-10 md:pt-10 ">
        <div className="mx-auto max-w-3xl">
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold glow-layer">
            Innovative Solution To <br /> Accelerate Your Business
          </h1>

          <p className="mt-8 text-lg sm:text-xl glow-layer2 ">
            Customize every element with optun’s intuitive design tools
            and robust editing options.
          </p>
        </div>
      </div>
      <div className="translate-y-[-20vh] sm:translate-y-[-10vh]">
        <NeonWavesCenterGlow /></div>

    </>
  );
};

export default HeroSection;