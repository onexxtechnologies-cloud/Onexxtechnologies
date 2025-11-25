import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const UltimateBlueHorizon = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center font-sans">
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
                      bg-black rounded-full overflow-hidden z-0
                      shadow-[inset_0_-40px_140px_rgba(56,189,248,0.55)]
                      border-t border-blue-500/30"
      >
        <div
          className="absolute top-0 left-0 w-full h-[32vh]
                        bg-gradient-to-b from-blue-400/90 via-blue-700/35 to-transparent"
        />
      </div>

      {/* Outer Soft Glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[30vh] w-[185vw] h-[185vw] rounded-full 
                      shadow-[0_0_200px_rgba(59,130,246,0.85)]
                      pointer-events-none z-10"
      />

      {/* Bright Horizon Line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-[30vh] w-[185vw] h-[185vw] rounded-full 
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
        className="relative z-30 w-[60%] max-w-6xl flex flex-col gap-6 top-[40vh]"
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
          <div className="p-8 flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-5 hover:bg-white/5 transition-colors duration-300">
            {/* Icon Placeholder */}
            <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg blur-[1px] opacity-80" />
            <div className="text-center xl:text-left">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-1">
                10+
              </h3>
              <p className="text-gray-300 text-xs lg:text-sm uppercase tracking-wide">
                Years of Experience
              </p>
            </div>
          </div>

          {/* BLOCK 2 */}
          <div className="p-8 flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-5 hover:bg-white/5 transition-colors duration-300">
            {/* Icon Placeholder */}
            {/* <div className="w-12 h-12 shrink-0 rounded-full border-4 border-emerald-500/30 relative flex items-center justify-center">
                <div className="w-6 h-6 bg-emerald-400 rounded-full blur-sm" />
            </div> */}
            <div className="text-center xl:text-left">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-1">
                250+
              </h3>
              <p className="text-gray-300 text-xs lg:text-sm uppercase tracking-wide">
                Successful Projects
              </p>
            </div>
          </div>

          {/* BLOCK 3 */}
          <div className="p-8 flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-5 hover:bg-white/5 transition-colors duration-300">
            {/* Icon Placeholder */}
            {/* <div className="w-12 h-12 shrink-0 flex items-center justify-center relative">
                <div className="w-8 h-8 bg-purple-600 rotate-45 blur-md absolute" />
                <div className="w-8 h-8 border border-purple-300 rotate-45 relative z-10" />
            </div> */}
            <div className="text-center xl:text-left">
              <h3 className="text-4xl lg:text-5xl font-bold text-white mb-1">
                300%
              </h3>
              <p className="text-gray-300 text-xs lg:text-sm uppercase tracking-wide">
                Average Client Growth
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM TEXT & BUTTON */}
        <div className="flex flex-col md:flex-row justify-between items-end w-full px-2">
          <p className="text-gray-400 text-sm md:text-base max-w-lg text-left md:text-left">
            We transform ideas into impactful digital solutions that empower
            your brand to rise above the ordinary.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 md:mt-0 flex items-center gap-3 text-white font-semibold group cursor-pointer"
          >
            Explore More
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.6)] group-hover:bg-blue-500 transition-colors">
              <ArrowDown size={18} />
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default UltimateBlueHorizon;
