import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Rocket, GaugeCircle, Handshake } from "lucide-react";

const UltimateBlueHorizon = () => {
  return (
    <div className="relative w-full h-[140vh] bg-black overflow-hidden flex flex-col items-center font-sans">
      {/* ================= 1. TITLE (MOVED TO TOP) ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 text-center mt-20 md:mt-24 px-4"
      >
        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          Building Brands That Shine Among the Stars
          <br />
          <span className="text-white bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500">
            Crafting Digital Impacts.
          </span>
        </h1>
      </motion.div>

      {/* ================= 2. THE MOON / HORIZON (MOVED TO MIDDLE) ================= */}
      {/* POSITIONING FIX:
          - Changed from 'bottom-[-160vw]' to 'top-[30vh]'.
          - This places the glowing curve vertically in the center of the screen.
      */}

      {/* Planet Body */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[30vh] w-[185vw] h-[185vw] 
                      bg-black rounded-[50%] overflow-hidden z-10
                      shadow-[inset_0_80px_400px_rgba(59,130,246,0.85)] {/* spread blue inner glow */}
                      border-t border-blue-500/30"
      >
        <div
          className="absolute top-0 left-0 w-full h-[32vh]
                        bg-gradient-to-b from-blue-400/90 via-blue-700/35 to-transparent"
        />
      </div>

      {/* Outer Soft Glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[30vh] w-[185vw] h-[185vw] rounded-[50%] 
                      shadow-[0_0_200px_rgba(59,130,246,0.85)]
                      pointer-events-none z-10"
      />

      {/* Bright Horizon Line */}
      <div
            className="absolute left-1/2 -translate-x-1/2 top-[30vh] w-[185vw] h-[185vw] rounded-[50%] 
                          border-t-[8px] border-blue-100/90
                      blur-[1.5px] 
                      shadow-[0_0_60px_rgba(96,165,250,0.95)]
                      pointer-events-none z-20"
      />

      {/* ================= 3. BOXES (MOVED TO BOTTOM) ================= */}
      {/* POSITIONING FIX:
          - Added 'mt-[35vh]'. 
          - This pushes the boxes down so they sit visually *below* the horizon line.
      */}
      {/* ================= THE FRAMER MOTION BLUR BOX ================= */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          type: "spring",
          stiffness: 50,
        }}
        className="relative z-30 w-[70%] max-w-6xl flex flex-col gap-6 top-[40vh]"
      >
        {/* --- MAIN GLASS CONTAINER (SIDE-BY-SIDE FIXED) --- */}
        {/* Key Change: 'grid-cols-3' forces side-by-side. 'divide-x' adds vertical lines. */}
        <div
          className="w-full grid grid-cols-3
                        bg-gradient-to-r from-[#D9D9D9]/10 to-[#737373]/10 
                        backdrop-blur-7xl  
                        rounded-[40px] overflow-hidden shadow-2xl shadow-blue-900/20 
                        divide-x divide-white/10"
        >
          {/* BLOCK 1 */}
          <div className="p-20 flex flex-col items-center xl:items-start text-center xl:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            {/* ICON */}
            <div
              className="w-12 h-12 flex items-center justify-center rounded-2xl 
               bg-gradient-to-br from-blue-500/60 to-cyan-400/60 
               shadow-[0_0_18px_rgba(59,130,246,0.7)]"
            >
              <Rocket className="w-6 h-6 text-white" />
            </div>

            {/* TEXT */}
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">
              Performance-Driven
            </h3>

            <p className="text-gray-300 text-xs lg:text-sm max-w-[250px]">
              We craft every page for speed, SEO and smooth user journeys from
              day one.
            </p>
          </div>

          {/* BLOCK 2 */}
          <div className="p-20 flex flex-col items-center xl:items-start text-center xl:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-2xl 
                    bg-gradient-to-br from-emerald-400/60 to-teal-500/60 
                    shadow-[0_0_18px_rgba(16,185,129,0.7)]"
            >
              <GaugeCircle className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">
                Modern Tech Stack
              </h3>
              <p className="text-gray-300 text-xs lg:text-sm">
                React, Vite, Tailwind and 3D-ready builds—no legacy baggage,
                only fresh code.
              </p>
          </div>

          {/* BLOCK 3 */}
          <div className="p-20 flex flex-col items-center xl:items-start text-center xl:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-2xl 
                    bg-gradient-to-br from-purple-500/60 to-fuchsia-500/60 
                    shadow-[0_0_18px_rgba(168,85,247,0.7)]"
            >
              <Handshake className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">
                Startup-Friendly Partner
              </h3>
              <p className="text-gray-300 text-xs lg:text-sm">
                Transparent communication, fast iterations and a team that grows
                with your brand.
              </p>
            
          </div>
        </div>

        {/* BOTTOM TEXT & BUTTON */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-2">
          <p className="text-gray-400 text-sm md:text-base max-w-lg text-center md:text-center">
            We transform ideas into impactful digital solutions that empower
            your brand to rise above the ordinary.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 md:mt-0 flex items-center gap-3 text-white font-semibold group cursor-pointer"
          >
            Explore More
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <ArrowDown size={20} />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UltimateBlueHorizon;
