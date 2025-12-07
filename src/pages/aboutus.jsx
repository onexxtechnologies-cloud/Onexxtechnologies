"use client";

import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- IMPORT LOGOS ---
import CssLogo from "../assets/Wordmark/cssword.svg";
import ReactLogo from "../assets/Wordmark/reactword.svg";
import NextLogo from "../assets/Wordmark/nextword.svg";
import TailwindLogo from "../assets/Wordmark/Tailwindword.svg";
import TypeScriptLogo from "../assets/Wordmark/typescriptword.svg";
import JavascriptLogo from "../assets/Wordmark/javascriptword.svg";
import HTMLLogo from "../assets/Wordmark/htmlword.svg";

import PythonLogo from "../assets/Wordmark/pythonword.svg";
import NodeLogo from "../assets/Wordmark/nodeword.svg";
import SQLLogo from "../assets/Wordmark/SQLword.svg";
import MySQLLogo from "../assets/Wordmark/MySQLword.svg";
import PHPLogo from "../assets/Wordmark/phpword.svg";
import ExpressLogo from "../assets/Wordmark/expressword.svg";


// --- STACKS ---
const frontendStack = [
  { logo: ReactLogo, scale: "scale-[1.20]" },
  { logo: NextLogo, scale: "scale-[2.5]" },
  { logo: TailwindLogo, scale: "scale-[2.5]" },
  { logo: CssLogo, scale: "scale-[1.5]" },
  { logo: TypeScriptLogo, scale: "scale-[1.2]" },
  { logo: JavascriptLogo, scale: "scale-[1.2]" },
  { logo: HTMLLogo, scale: "scale-[1.5]" },
];

const backendStack = [
  { logo: NodeLogo, scale: "scale-[1.9]" },
  { logo: PythonLogo, scale: "scale-[1.5]" },
  { logo: SQLLogo, scale: "scale-[1.5]" },
  { logo: MySQLLogo, scale: "scale-[1.5]" },
  { logo: PHPLogo, scale: "scale-[1.7]" },
  { logo: ExpressLogo, scale: "scale-[1.8]" },
];


// --- RIPPLE ITEM ---
const RippleItem = ({ tech }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    const box = ref.current;
    if (!box) return;

    const rect = box.getBoundingClientRect();
    box.style.setProperty("--x", `${e.clientX - rect.left}px`);
    box.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => ref.current.style.setProperty("--size", "15vw")}
      onMouseLeave={() => ref.current.style.setProperty("--size", "0")}
      className="relative overflow-hidden cursor-pointer w-[clamp(100px,15vw,150px)] px-[clamp(0.5rem,2vw,1.5rem)] py-[clamp(0.5rem,1.5vh,1rem)] 
      rounded-md border border-gray-300 bg-[#8ec6fb] 
      transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >
      <div
        className="pointer-events-none absolute rounded-full bg-black/600 mix-blend-difference"
        style={{
          left: "var(--x)",
          top: "var(--y)",
          width: "var(--size)",
          height: "var(--size)",
          transform: "translate(-50%, -50%)",
          transition: "width .5s ease, height .5s ease",
        }}
      />

      <img
        src={tech.logo}
        alt="tech"
        className={`h-6 md:h-10 w-auto object-contain ${tech.scale}`}
      />
    </div>
  );
};


// --- MARQUEE ---
const MarqueeRow = ({ items, direction }) => {
  const doubled = [...items, ...items];

  return (
    <div
      className="flex overflow-hidden w-full relative py-[clamp(0.5rem,1.5vh,1rem)]"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="flex gap-[clamp(1rem,2vw,2rem)] flex-nowrap"
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


// --- MAIN COMPONENT ---
const OpenCloseScroll = () => {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const [maxScale, setMaxScale] = useState(6);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ ROBUST MOBILE DETECTION
  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ TRUE FULLSCREEN DIAGONAL SCALE
  useLayoutEffect(() => {
    const updateScale = () => {
      if (!circleRef.current) return;

      const rect = circleRef.current.getBoundingClientRect();
      const circleDiameter = rect.width;
    if (circleDiameter === 0) return; // Prevent divide by zero
      const screenDiagonal = Math.sqrt(
        window.innerWidth ** 2 + window.innerHeight ** 2
      );

      const calculatedScale = screenDiagonal / circleDiameter;
      // Ensure we never scale down below a safe cover threshold
      // Mobile needs about 2.5x-3x to cover corners. We use 3.5 to be absolutely safe.
      setMaxScale(Math.max(calculatedScale, 3.5));
    };

    updateScale();
     // Safety check after a delay to ensure correct dimensions after layout shifts
    const timer = setTimeout(updateScale, 500);
    window.addEventListener("resize", updateScale);
    return () => {
      window.removeEventListener("resize", updateScale);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // ✅ PERFECT FULLSCREEN SCALE ANIMATION
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.6, 0.85, 0.9, 1],
    [1, maxScale, maxScale, maxScale, maxScale * 0.5, 1]
  );

  const titleY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.9, 1],
    ["0vh", "0vh", isMobile ? "-25vh" : "-35vh", isMobile ? "-25vh" : "-35vh", "0vh"]
  );

  const descriptionOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.45, 0.5, 0.6, 0.7, 0.8],
    [0, 0, 1, 1, 1, 1, 0]
  );

  const descriptionY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.45],
    ["10vh", "10vh", isMobile ? "5vh" : "0vh"]
  );

  return (
    <div className="relative w-full pt-[5vh] md:pt-[10vh]">
      <section ref={containerRef} className="relative h-[250vh] bg-transparent">
        <div className="sticky top-0 h-[100dvh] overflow-hidden flex items-center justify-center">


          {/* ✅ PERFECTLY CENTERED FULLSCREEN CIRCLE */}
          <motion.div
            ref={circleRef}
            style={{
              scale,
              left: "50%",
              top: "50%",
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[390px] max-h-[390px] sm:w-[550px] sm:h-[550px] sm:max-w-none sm:max-h-none
            bg-gradient-to-r from-[#4AB3FF] via-[#1b2566] to-[#0b0b4e]
            rounded-full z-10"
          />

          {/* ABSOLUTELY CENTERED TITLE */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <motion.h1
              style={{ y: titleY }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight text-center"
            >
              How We Work?
            </motion.h1>
          </div>

          {/* CONTENT (Description & Marquee) */}
          <motion.div className="relative z-20 flex flex-col items-center text-center px-[clamp(1rem,5vw,1.5rem)] w-full max-w-4xl">
            <motion.div
              style={{ y: descriptionY, opacity: descriptionOpacity }}
              className="w-full flex flex-col items-center mt-[10vh]"
            >
              <div className="w-[clamp(4rem,10vw,6rem)] h-[1px] bg-gray-400 mx-auto my-[clamp(1rem,3vh,2rem)]"></div>

              <p className="text-[clamp(1rem,4vw,1.5rem)] md:text-2xl text-gray-300 leading-relaxed font-light mb-[clamp(2rem,5vh,3rem)] sm:whitespace-nowrap">
                At Onexx, we build with clarity, precision, and purpose — every
                decision is driven by performance and design excellence. <br />
                We follow a fast, transparent workflow that keeps you involved
                at every stage.
              </p>

              <div className="w-full scale-[clamp(1.2,1.6,1.8)]">
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
