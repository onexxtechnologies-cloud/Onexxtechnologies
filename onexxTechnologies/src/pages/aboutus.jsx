import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- 1. DATA CONFIGURATION ---
const frontendStack = ["React", "Next.js", "Tailwind", "CSS", "TypeScript", "HTML"];
const backendStack = ["Node.js", "Python", "SQL", "MySQL", "PHP", "Express"];

// --- 0. BRAND COLORS MAP ---
const techColors = {
  React: "#61DAFB",
  "Next.js": "#000000",
  Tailwind: "#38BDF8",
  CSS: "#264DE4",
  TypeScript: "#3178C6",
  HTML: "#E44D26",

  "Node.js": "#3C873A",
  Python: "#3572A5",
  SQL: "#00758F",
  MySQL: "#F29111",
  PHP: "#777BB4",
  Express: "#232F3E",
};

// --- 2. MARQUEE COMPONENT ---
const MarqueeRow = ({ items, direction = "left" }) => {
  const doubled = [...items, ...items];

  return (
    <div className="flex overflow-hidden w-full relative py-2">
      <motion.div
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="flex gap-4 md:gap-8 flex-nowrap"
        initial={{ translateX: direction === "left" ? "0%" : "-50%" }}
        animate={{ translateX: direction === "left" ? "-50%" : "0%" }}
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
      >
        {doubled.map((tech, index) => {
          const bg = techColors[tech] || "#ffffff";
          const textColor = bg === "#000000" ? "white" : "black";

          return (
            <div
              key={index}
              style={{ backgroundColor: bg, color: textColor }}
              className="flex items-center justify-center 
                border border-gray-300 rounded-md shadow-sm
                px-6 py-3 min-w-[120px]
                text-sm md:text-lg font-semibold whitespace-nowrap
                transition-all duration-200 hover:scale-105 hover:shadow-lg">
              {tech}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

const OpenCloseScroll = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.5, 0.6, 0.7, 1],
    [1, 3, 5, 10, 5, 5, 1]
  );
  const titleY = useTransform(
    scrollYProgress,
     [0.1,0.2,0.9,1],
    ["0%", "-170%","-170%","0"]
  );
    const RtitleY = useTransform(
    scrollYProgress,
     [1],
    ["0%"]
  );
  const descriptionOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.5, 0.8, 0.9],
    [0, 1, 1, 1, 0]
  );
    const descriptionY = useTransform(
    scrollYProgress,
     [0.1,0.2],
    ["0%", "-30%"]
  );

  return (
    <div className="relative w-full">
      {/* ⬇️ CHANGED THIS FROM 300vh TO 180vh */}
      <section ref={containerRef} className="relative h-[180vh] bg-transparent">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

          {/* CIRCLE */}
          <motion.div
            style={{ scale, willChange: "transform", transform: "translateZ(0)" }}
            className="absolute w-[390px] h-[390px] 
              sm:w-[550px] sm:h-[550px] 
              md:w-[550px] md:h-[550px] 
              bg-[#0b0b4e] rounded-full z-10 mt-[-25%] sm:mt-[-2%]"
          />

          {/* CONTENT */}
          <motion.div
            style={{ willChange: "opacity, transform" }}
            className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-4xl"
          >
            <motion.h1 style={{y:titleY}} className="text-3xl md:text-6xl font-bold text-white mt-[40%] leading-tight">
              New Horizon
            </motion.h1>

            <motion.div style={{  y:descriptionY, opacity: descriptionOpacity }} className="w-full flex flex-col items-center">
              <div className="w-24 h-[1px] bg-gray-400 mx-auto my-8"></div>

              <motion.p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-12">
                We invite you to experience something better <br />
                a journey beyond the horizon <br />
                with OneXX.
              </motion.p>

              <div className="w-full space-y-4" style={{ transform: "translateZ(0)" }}>
                <MarqueeRow items={frontendStack} direction="left" />
                <MarqueeRow items={backendStack} direction="right" />
              </div>

            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OpenCloseScroll;
