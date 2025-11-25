"use client";

import { motion } from "framer-motion";

const WAVES = 15;

// Perfect wave split into 2 equal halves
function generatePerfectWave(amplitude, wavelength, heightOffset) {
  const PERIODS = 12;
  const totalWidth = wavelength * PERIODS;
  const halfWidth = totalWidth / 2;

  let path = `M 0 ${heightOffset}`;
  for (let x = 0; x <= totalWidth; x += 20) {
    const y = heightOffset + Math.sin((x / wavelength) * Math.PI * 2) * amplitude;
    path += ` L ${x} ${y}`;
  }

  return { d: path, totalWidth, halfWidth };
}

export default function NeonWavesCenterGlow() {
  return (
    <div className="relative w-full h-[350px] md:h-[500px] bg-black overflow-hidden">

      {/* THIN BEAM EMITTED FROM FIRST WAVE */}
      <motion.div
        className="absolute left-0 w-full pointer-events-none"
        style={{
          bottom: "100px",
          height: "150px",
          background:
            "linear-gradient(to top, rgba(0,150,255,0.55), rgba(0,150,255,0.32), transparent)",
          mixBlendMode: "screen",
        }}
        animate={{
          opacity: [0.05, 0.25, 0.1, 0.3, 0.05],
          filter: [
            "blur(20px)",
            "blur(35px)",
            "blur(25px)",
            "blur(40px)",
            "blur(20px)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-0 w-[300%] h-full" viewBox="0 0 8000 500" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gradientWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <motion.stop
              offset="0%"
              stopColor="#007BFF"
              animate={{ stopColor: ["#007BFF", "#00D0FF", "#007BFF"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.stop
              offset="100%"
              stopColor="#00D0FF"
              animate={{ stopColor: ["#00D0FF", "#0094FF", "#00D0FF"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </linearGradient>
        </defs>

        {/* TRUE SEAMLESS HALF SPLIT ANIMATION */}
        {Array.from({ length: WAVES }).map((_, i) => {
          const amplitude = 15 + i * 1.2;
          const wavelength = 600 + i * 20;
          const verticalOffset = 100 + i * 25;
          const opacity = 0.1 + (i / WAVES) * 0.6;

          const { d, halfWidth } = generatePerfectWave(
            amplitude,
            wavelength,
            verticalOffset
          );

          return (
            <>
              {/* First half */}
              <motion.path
                key={`${i}-H1`}
                d={d}
                stroke="url(#gradientWave)"
                strokeWidth="2"
                fill="none"
                style={{ opacity, filter: "drop-shadow(0 0 6px #00aaff)" }}
                animate={{ x: [0, -halfWidth] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Second half */}
              <motion.path
                key={`${i}-H2`}
                d={d}
                transform={`translate(${halfWidth}, 0)`}
                stroke="url(#gradientWave)"
                strokeWidth="2"
                fill="none"
                style={{ opacity, filter: "drop-shadow(0 0 6px #00aaff)" }}
                animate={{ x: [0, -halfWidth] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </>
          );
        })}
      </svg>
    </div>
  );
}