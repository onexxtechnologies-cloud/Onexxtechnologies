<<<<<<< Updated upstream
"use client";

import React from "react";
import AuroraBackground from "./Aurorabackground";
import "./AuroraBackground.css"
<<<<<<< Updated upstream
import NeonWavesCenterGlow from "./wavetest";
=======
=======
import React from "react"; 
// import Wave3d from "./wave3d";
>>>>>>> Stashed changes
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      <div className="relative w-full text-center px-6 -mb-[34%]">
=======

<<<<<<< Updated upstream
=======
      <div className="relative w-full h-screen bg-black text-white overflow-hidden">

        {/* FULLSCREEN BACKGROUND */}
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          {/* <Wave3d amplitude={0.5} distance={0}  /> */}
        </div>

        {/* CONTENT */}
        <div className=" relative z-10 flex flex-col justify-center h-full pl-20 max-w-xl translate-y-[-135px]">
>>>>>>> Stashed changes

      <div className="relative w-full text-center -translate-y-[200%] sm:-translate-y-[50%] px-6">
>>>>>>> Stashed changes
        <div className="mx-auto max-w-3xl mx-[2%] sm:mx-0">
          <h1 className="relative text-4xl sm:text-5xl md:text-6xl font-bold glow-layer">
            Innovative Solution To <br /> Accelerate Your Business
          </h1>

          <p className="mt-6 text-lg sm:text-xl glow-layer2">
            Customize every element with <br />optun’s intuitive design tools
            and robust editing options.
          </p>
        </div>
      </div>

      <div className="-mt-10 sm:-mt-16 md:-mt-20">
        <NeonWavesCenterGlow />
      </div>



    </>
  );
};

export default HeroSection;