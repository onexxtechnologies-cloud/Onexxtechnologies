"use client";

import { motion } from "framer-motion";

const WAVES = 10;

// Generate a simple sine wave path
function generateWavePath(amplitude, wavelength, heightOffset) {
  const PERIODS = 12;
  const totalWidth = wavelength * PERIODS;

  let path = `M 0 ${heightOffset}`;
  for (let x = 0; x <= totalWidth; x += 20) {
    const y = heightOffset + Math.sin((x / wavelength) * Math.PI * 2) * amplitude;
    path += ` L ${x} ${y}`;
  }
  return path;
}

export default function NeonWaveLight() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    // Increased container height for larger viewport
    <div className="relative w-full h-[800px] overflow-hidden bg-black -mt-80 -mb-80">
      <svg
        className="absolute top-0 left-0 w-[300%] h-[500px] -mt-20"
        viewBox="0 0 8000 500"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="gradientWaveLight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#007BFF" />
            <stop offset="100%" stopColor="#00D0FF" />
          </linearGradient>
        </defs>

        {Array.from({ length: isMobile ? Math.floor(WAVES * 0.6) : WAVES }).map((_, i) => {
          const amplitude = 15 + i * 1.2;
          const baseWavelength = 600 + i * 20;
          const wavelength = isMobile ? baseWavelength * 2 : baseWavelength;
          const verticalOffset = 100 + i * 25; // Same vertical offset
          const opacity = 0.1 + (i / WAVES) * 0.6;

          const path = generateWavePath(amplitude, wavelength, verticalOffset);

          return (
            <motion.path
              key={i}
              d={path}
              stroke="url(#gradientWaveLight)"
              strokeWidth="2"
              fill="none"
              style={{ opacity, filter: "drop-shadow(0 0 6px #00aaff)" }}
              animate={{ x: [0, -wavelength * 6] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          );
        })}
      </svg>
    </div>
  );
}
