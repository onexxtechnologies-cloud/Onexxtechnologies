"use client";

import { motion } from "framer-motion";

const WAVES = 15;

// Generate smooth curved sine path
function generateWavePath(amplitude, wavelength, heightOffset) {
  let path = `M 0 ${heightOffset}`;
  for (let x = 0; x <= 1440; x += 20) {
    const y =
      heightOffset + Math.sin((x / wavelength) * Math.PI * 2) * amplitude;
    path += ` L ${x} ${y}`;
  }
  return path;
}

export default function NeonWavesCenterGlow() {
  return (
    <div className="relative w-full h-[350px] md:h-[500px] bg-black overflow-hidden">
      {/* --- NEW: Center Neon Light (White + Blue burst) --- */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.05, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "480px",
          height: "180px",
          background:
            "radial-gradient(circle, rgba(11, 92, 215, 0.55), rgba(0,150,255,0.4), rgba(0,0,0,0) 70%)",
          filter: "blur(40px)",
          mixBlendMode: "screen",
        }}
      />

      {/* small bright white core */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "180px",
          height: "60px",
          background:
            "radial-gradient(circle, rgba(0, 137, 228, 0.95), rgba(0,180,255,0.35), rgba(0,0,0,0) 70%)",
          filter: "blur(18px)",
          mixBlendMode: "screen",
        }}
      />

      {/* --- Waves --- */}
      <svg
        className="absolute inset-0 w-[200%] h-full"
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
      >
        {/* Animated gradient for the waves */}
        <defs>
          <linearGradient id="gradientWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <motion.stop
              offset="0%"
              stopColor="#007BFF"
              animate={{ stopColor: ["#007BFF", "#00D0FF", "#007BFF"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.stop
              offset="100%"
              stopColor="#00D0FF"
              animate={{ stopColor: ["#00D0FF", "#0094FF", "#00D0FF"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </linearGradient>
        </defs>

        {Array.from({ length: WAVES }).map((_, i) => {
          const amplitude = 15 + i * 1.2;
          const wavelength = 280 + i * 10;
          const verticalOffset = 120 + i * 20;
          const opacity = 0.1 + (i / WAVES) * 0.6;
          const speed = 10 + i * 1.3;
          const d = generateWavePath(amplitude, wavelength, verticalOffset);

          return (
            <motion.path
              key={i}
              d={d}
              stroke="url(#gradientWave)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              style={{
                opacity,
                filter: "drop-shadow(0 0 6px #00aaff)",
              }}
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}