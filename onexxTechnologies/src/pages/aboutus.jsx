"use client";

import React, { useRef } from "react";
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
      onMouseEnter={() => ref.current.style.setProperty("--size", "250px")}
      onMouseLeave={() => ref.current.style.setProperty("--size", "0px")}
      className="relative overflow-hidden cursor-pointer min-w-[120px] px-6 py-3 
      rounded-md border border-gray-300 bg-[#8ec6fb] 
      transition-all duration-300 hover:scale-105 flex items-center justify-center"
    >

      {/* Ripple */}
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


// --- MARQUEE (UPDATED WITH MASK) ---
const MarqueeRow = ({ items, direction }) => {
  const doubled = [...items, ...items];

  return (
    <div 
      className="flex overflow-hidden w-full relative py-3"
      // This style creates the left/right fade effect
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <motion.div
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        className="flex gap-5 md:gap-8 flex-nowrap"
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
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

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

          {/* CIRCLE */}
          <motion.div
            style={{ scale }}
            className="absolute w-[390px] h-[390px] sm:w-[550px] sm:h-[550px] 
            bg-gradient-to-r from-[#4AB3FF] via-[#1b2566] to-[#0b0b4e] rounded-full z-10 mt-[-25%] sm:mt-[-2%]"
          />

          {/* CONTENT */}
          <motion.div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-4xl">

            <motion.h1
              style={{ y: titleY }}
              className="text-3xl md:text-6xl font-bold text-white sm:mt-[40%] mt-[80%] leading-tight"
            >
              How We Work?
            </motion.h1>

            <motion.div style={{ y: descriptionY, opacity: descriptionOpacity }} className="w-full flex flex-col items-center">
              <div className="w-24 h-[1px] bg-gray-400 mx-auto my-8"></div>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light mb-12 whitespace-nowrap">
                At Onexx, we build with clarity, precision, and purpose — every decision is driven by performance and design excellence. <br />
                We follow a fast, transparent workflow that keeps you involved at every stage, from concept to launch.
                <br />
                Our team focuses on delivering modern, seamless digital experiences that elevate your brand without compromise.
                </p>

                        <div className="w-full scale-[1.6]">
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
