"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CssLogo from "../assets/icon/css.svg";

// --- STACKS ---
const frontendStack = ["React", "Next.js", "Tailwind", "CSS", "TypeScript", "HTML"];
const backendStack = ["Node.js", "Python", "SQL", "MySQL", "PHP", "Express"];

// --- ALL BLACK COLORS ---
const techColors = Object.fromEntries(
  [...frontendStack, ...backendStack].map((v) => [v, "#000"])
);

// --- RIPPLE COMPONENT ---
const RippleItem = ({ tech }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const box = ref.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    box.style.setProperty("--x", `${x}px`);
    box.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => ref.current.style.setProperty("--size", "250px")}
      onMouseLeave={() => ref.current.style.setProperty("--size", "0px")}
      style={{ backgroundColor: "#000", color: "white" }}
      className="relative overflow-hidden cursor-pointer text-sm md:text-lg 
      font-semibold min-w-[120px] px-6 py-3 rounded-md border border-gray-700
      transition-all duration-300 hover:scale-105 hover:shadow-lg "
    >
      {/* ripple */}
      <div
        className="pointer-events-none absolute rounded-full bg-white mix-blend-difference"
        style={{
          left: "var(--x)",
          top: "var(--y)",
          width: "var(--size)",
          height: "var(--size)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.5s ease, height .5s ease",
        }}
      />

      {tech}
    </div>
  );
};

// --- MARQUEE ROW ---
const MarqueeRow = ({ items, direction }) => {
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
        {doubled.map((tech, i) => (
          <RippleItem key={i} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
};
const isMobile = window.innerWidth <= 768;
// --- MAIN COMPONENT ---
const OpenCloseScroll = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.5, 0.6, 0.7, 1], [1, 3, 5, 10, 5, 5, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.2, 0.9, 1], ["0%", "-170%", "-170%", "0%"]);
  const descriptionOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.5, 0.8, 0.9], [0, 1, 1, 1, 0]);
  const descriptionY = useTransform(scrollYProgress, [0.1, 0.2], ["0%", isMobile ? "-20%" : "-40%"]);

  return (
    <div className="relative w-full">
      <section ref={containerRef} className="relative h-[180vh] bg-transparent">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

          {/* ANIMATED CIRCLE */}
          <motion.div
            style={{ scale }}
            className="absolute w-[390px] h-[390px] sm:w-[550px] sm:h-[550px] md:w-[550px] md:h-[550px]
            bg-gradient-to-r from-[#4AB3FF] via-[#1b2566] to-[#0b0b4e]

            rounded-full z-10 mt-[-25%] sm:mt-[-2%]"
          />

          {/* CONTENT */}
          <motion.div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-4xl">
            <motion.h1
              style={{ y: titleY }}
              className="text-3xl md:text-6xl font-bold text-white mt-[40%] leading-tight"
            >
              New Horizon
            </motion.h1>

            <motion.div style={{ y: descriptionY, opacity: descriptionOpacity }} className="w-full flex flex-col items-center">
              <div className="w-24 h-[1px] bg-gray-400 mx-auto my-8"></div>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-12">
                We invite you to experience something better <br />
                a journey beyond the horizon <br />
                with OneXX.
              </p>

              <div className="w-full scale-[1.6] ">
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
