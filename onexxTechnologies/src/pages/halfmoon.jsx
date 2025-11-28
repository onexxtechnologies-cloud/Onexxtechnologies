import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Rocket, GaugeCircle, Handshake } from "lucide-react";

const UltimateBlueHorizon = () => {
  return (
    <div className="relative w-full h-[160vh] md:h-[120vh] bg-black overflow-hidden flex flex-col items-center font-sans pt-24 md:pt-32 -mt-80">
      {/* ================= 1. TITLE ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full z-30 text-center px-4 -mt-20 md:-mt-20"
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight">
          <span className="bg-gradient-to-b from-[#D8E2FF] to-[#6A75FF] text-transparent bg-clip-text">
            Building Brands That Shine Among the Stars
          </span>
          <br />
          <span className=" bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-400 to-purple-500">
            <span className="bg-gradient-to-r from-[#7AA0FF] via-[#5C68FF] to-[#4A3BFF] text-transparent bg-clip-text">
              Crafting Digital Impacts.
            </span>
          </span>
        </h1>
      </motion.div>
      
      {/* ================= 2. THE MOON / HORIZON ================= */}
      {/* MAIN PLANET CONTAINER */}
      <div
        className="
          absolute top-[14vh] sm:top-[27vh]
          w-[2000px] md:w-[185vw] h-[2000px] md:h-[185vw]
          bg-black rounded-[50%] overflow-hidden z-10
          shadow-[inset_0_80px_400px_rgba(59,130,246,0.85)]
          border-t border-blue-500/30 mt-40
        "
      ></div>

      {/* OUTER BLUE SOFT GLOW */}
      <div
        className="
          absolute top-[14vh] sm:top-[27vh]
          w-[2000px] md:w-[185vw] h-[2000px] md:h-[185vw]
          rounded-[50%]
          shadow-[0_0_200px_rgba(59,130,246,0.85)]
          pointer-events-none z-10 mt-40
        "
      ></div>

      {/* BRIGHT HORIZON LINE */}
      <div
        className="
          absolute top-[14vh] sm:top-[27vh]
          w-[2000px] md:w-[185vw] h-[2000px] md:h-[185vw]
          rounded-[50%]
          border-t-[8px] border-blue-100/90
          blur-[1.5px]
          shadow-[0_0_60px_rgba(96,165,250,0.95)]
          pointer-events-none z-20 mt-40
        "
      ></div>

      {/* ================= 3. BOXES ================= */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          type: "spring",
          stiffness: 50,
        }}
        className="relative z-30 w-[90%] max-w-6xl grid gap-6 mt-[35vh]"
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 
         divide-y sm:divide-y-0 sm:divide-x divide-white/10">



          {/* BLOCK 1 */}
          <div className="p-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl 
      bg-gradient-to-br from-blue-500/60 to-cyan-400/60 
      shadow-[0_0_18px_rgba(59,130,246,0.7)]">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">
              Performance-Driven
            </h3>

            <p className="text-gray-300 text-xs lg:text-sm max-w-[250px]">
              We craft every page for speed, SEO and smooth user journeys from day one.
            </p>
          </div>

          {/* BLOCK 2 */}
          <div className="p-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl 
      bg-gradient-to-br from-emerald-400/60 to-teal-500/60 
      shadow-[0_0_18px_rgba(16,185,129,0.7)]">
              <GaugeCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">
              Modern Tech Stack
            </h3>
            <p className="text-gray-300 text-xs lg:text-sm">
              React, Vite, Tailwind and 3D-ready builds — no legacy baggage, only fresh code.
            </p>
          </div>

          {/* BLOCK 3 */}
          <div className="p-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl 
      bg-gradient-to-br from-purple-500/60 to-fuchsia-500/60 
      shadow-[0_0_18px_rgba(168,85,247,0.7)]">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">
              Startup-Friendly Partner
            </h3>
            <p className="text-gray-300 text-xs lg:text-sm">
              Transparent communication, fast iterations and a team that grows with your brand.
            </p>
          </div>

        </div>
        {/* BOTTOM TEXT & BUTTON */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-2 sm:mt-0 -mt-13">
          <p className="text-gray-400 text-sm md:text-base max-w-lg text-center md:text-center">
            We transform ideas into impactful digital solutions that empower
            your brand to rise above the ordinary.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="sm:mt-0 -mt-1 flex items-center gap-3 text-white font-semibold group cursor-pointer"
          >
            Explore More
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <ArrowDown size={20} />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div >
  );
};

export default UltimateBlueHorizon;
