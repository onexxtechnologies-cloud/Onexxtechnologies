import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Rocket, GaugeCircle, Handshake } from "lucide-react";
import Particles from "react-tsparticles";
import { loadStarsPreset } from "tsparticles-preset-stars";

// ====================== SINGLE SHOOTING STAR COMPONENT ======================
const ShootingStar = ({ id }) => {
  // We use a key to trigger a complete re-render (reset) of the animation
  const [resetKey, setResetKey] = useState(0);
  const [pos, setPos] = useState(null);

  // Generate random coordinates and delay
  useEffect(() => {
    const xStart = Math.random() * 100;
    const yStart = Math.random() * 100;
    const xEnd = xStart + (Math.random() * 20 - 10); // End slightly offset for realism
    const yEnd = yStart + (Math.random() * 20 + 20); // Generally moving down/across
    
    // Calculate angle for the tail rotation
    const angle = Math.atan2(yEnd - yStart, xEnd - xStart) * (150 / Math.PI);

    // Random delay between 0 and 10 seconds so they don't all start at once
    const delay = Math.random() * 5000;

    const timeout = setTimeout(() => {
      setPos({ xStart, yStart, xEnd, yEnd, angle });
    }, delay);

    return () => clearTimeout(timeout);
  }, [resetKey]);

  // When animation completes, wait a bit then reset to spawn again
  const handleAnimationComplete = () => {
    setPos(null); // Hide
    // Wait random time before respawning
    setTimeout(() => {
      setResetKey(prev => prev + 2);
    }, Math.random() * 3000 + 1000);
  };

  if (!pos) return null;

  return (
    <motion.div
      initial={{ x: `${pos.xStart}vw`, y: `${pos.yStart}vh`, opacity: 0, scale: 0.5 }}
      animate={{ x: `${pos.xEnd}vw`, y: `${pos.yEnd}vh`, opacity: [0, 1, 1, 0], scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      onAnimationComplete={handleAnimationComplete}
      className="absolute top-0 left-0 pointer-events-none"
      style={{ rotate: `${pos.angle}deg` }}
    >
      <div className="relative">
        {/* ⭐ STAR HEAD */}
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_4px_white] z-10 relative"></div>
        
        {/* 🌠 "LINE LIKE SHADOW" (THE TAIL) */}
        {/* This creates the long trailing line behind the star */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[150px] h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-white origin-right -mr-[1px] blur-[1px]"></div>
      </div>
    </motion.div>
  );
};

// ====================== MAIN COMPONENT ======================
const UltimateBlueHorizon = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadStarsPreset(engine);
  }, []);

  // BACKGROUND STARS CONFIGURATION
  const particlesOptions = {
    preset: "stars",
    fullScreen: { enable: false },
    background: { color: "transparent" },
    particles: {
      number: { value: 200, density: { enable: true, area: 1300 } }, // Increased count
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: { enable: true, speed: 1, sync: false } // Twinkle effect
      },
      size: { value: { min: 0.5, max: 3 } },
      move: {
        enable: true, // ✅ ENABLED MOVEMENT
        speed: 0.9,   // ✅ SPEED OF FLOW
        direction: "top", // ✅ FLOWS "UPSIDE"
        straight: false,
        outModes: { default: "top" }, // Stars disappear when leaving screen
      },
    },
  };

  return (
    <div className="relative w-full h-[160vh] md:h-[150vh] bg-black overflow-hidden flex flex-col items-center font-sans pt-24 md:pt-32 -mt-80">

      {/* Nebula Background (Static Glows) */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[90vw] h-[10vh] blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute top-[30%] right-[-20%] w-[60vw] h-[60vh] blur-[130px] rounded-full pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute top-[30%] left-[-20%] w-[50vw] h-[50vh] blur-[100px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      {/* Moving Background Particles */}
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0 h-full w-full" />

      {/* Multiple Shooting Stars Layer */}
      {/* We render 5 independent shooting stars */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <ShootingStar key={i} id={i} />
        ))}
      </div>

      {/* Main Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full z-30 text-center px-4 -mt-20 md:-mt-20"
      >
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-tight drop-shadow-2xl">
          <span className="bg-gradient-to-b from-[#D8E2FF] to-[#6A75FF] text-transparent bg-clip-text">
            Building Brands That Shine Among the Stars
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#7AA0FF] via-[#5C68FF] to-[#4A3BFF] text-transparent bg-clip-text">
            Crafting Digital Impacts.
          </span>
        </h1>
      </motion.div>

      {/* Horizon Planet Visuals */}
      <div className="absolute top-[14vh] sm:top-[27vh] w-[2000px] md:w-[185vw] h-[2000px] md:h-[185vw] bg-black rounded-[50%] overflow-hidden z-10 shadow-[inset_0_80px_400px_rgba(59,130,246,0.85)] border-t border-blue-500/30 mt-40" />
      <div className="absolute top-[14vh] sm:top-[27vh] w-[2000px] md:w-[185vw] h-[2000px] md:h-[185vw] rounded-[50%] shadow-[0_0_200px_rgba(59,130,246,0.85)] pointer-events-none z-10 mt-40" />
      <div className="absolute top-[14vh] sm:top-[27vh] w-[2000px] md:w-[185vw] h-[2000px] md:h-[185vw] rounded-[50%] border-t-[8px] border-blue-100/90 blur-[1.5px] shadow-[0_0_60px_rgba(96,165,250,0.95)] pointer-events-none z-20 mt-40" />

      {/* Feature Cards */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 50 }}
        className="relative z-30 w-[90%] max-w-6xl grid gap-6 mt-[35vh]"
      >
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">

          {/* Card 1 */}
          <div className="p-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/60 to-cyan-400/60 shadow-[0_0_18px_rgba(59,130,246,0.7)]">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">Performance-Driven</h3>
            <p className="text-gray-300 text-xs lg:text-sm max-w-[250px]">
              We craft every page for speed, SEO and smooth user journeys from day one.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400/60 to-teal-500/60 shadow-[0_0_18px_rgba(16,185,129,0.7)]">
              <GaugeCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">Modern Tech Stack</h3>
            <p className="text-gray-300 text-xs lg:text-sm">
              React, Vite, Tailwind and 3D-ready builds — no legacy baggage, only fresh code.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 hover:bg-white/5 transition-colors duration-300">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/60 to-fuchsia-500/60 shadow-[0_0_18px_rgba(168,85,247,0.7)]">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-white uppercase tracking-wide">Startup-Friendly Partner</h3>
            <p className="text-gray-300 text-xs lg:text-sm">
              Transparent communication, fast iterations and a team that grows with your brand.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-2 sm:mt-0 -mt-13">
          <p className="text-gray-400 text-sm md:text-base max-w-lg text-center md:text-center">
            We transform ideas into impactful digital solutions that empower your brand to rise above the ordinary.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="sm:mt-0 -mt-1 flex items-center gap-3 text-white font-semibold cursor-pointer"
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