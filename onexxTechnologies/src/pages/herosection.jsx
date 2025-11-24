"use client";

import React from "react";
import AuroraBackground from "./Aurorabackground";
import "./AuroraBackground.css"

const HeroSection = () => {
  return (
    <>
      {/* Fonts */}


      <AuroraBackground
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />


      <div className="relative w-full text-center -translate-y-[200%] sm:-translate-y-[50%] px-6">
        <div className="mx-auto max-w-3xl mx-[2%] sm:mx-0">
          <h1
            className="relative text-4xl sm:text-5xl md:text-6xl font-bold glow-layer"
          >
            Innovative Solution To <br /> Accelerate Your Business
          </h1>

          <p className="mt-6 text-lg sm:text-xl glow-layer2">
            Customize every element with optun’s intuitive design tools
            and robust editing options.
          </p>
        </div>
      </div>


    </>
  );
};

export default HeroSection;