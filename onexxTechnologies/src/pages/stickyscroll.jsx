"use client";

import React, { useRef, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  useTransform,
} from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility class merge
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Content data
const content = [
  {
    title: "Discovery & Strategic Planning",
    description:
      "We collaborate with you to understand your vision, business goals, technical requirements, and target audience. This step lays a strong strategic foundation for long-term success.",
    color: "from-[#046ff3] to-[#000000]",
  },
  {
    title: "UI/UX Design & Product Architecture",
    description:
      "Our team designs clean, intuitive, and conversion-focused interfaces while defining a solid product architecture. Every design decision is made to enhance usability, performance, and brand credibility.",
    color: "from-[#046ff3] to-[#000000]",
  },
  {
    title: "Development, QA & Optimization",
    description:
      "We develop secure, scalable websites and software using modern technologies. Each module undergoes rigorous testing to ensure speed, stability, and seamless user experience.",
    color: "from-[#046ff3] to-[#000000]",
  },
  {
    title: "Launch, Scaling & Support",
    description:
      "After a smooth deployment, we assist with scaling, updates, and ongoing maintenance. Our support ensures your product continues to perform, evolve, and grow with your business.",
    color: "from-[#046ff3] to-[#000000]",
  },
];

// Card component
const Card = ({ item, index, progress, range, targetScale }) => {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 20}px)`,
        }}
        className="relative flex flex-col items-center justify-center"
      >
        <div
          className={cn(
            "group relative w-full max-w-2xl h-[300px] overflow-hidden rounded-3xl border border-white/10 backdrop-blur-xl transition-all duration-500",
            `bg-gradient-to-br ${item.color} opacity-100 grayscale-[50%]`
          )}
        >
          {/* Watermark */}
          <span className="absolute top-4 left-6 text-7xl font-serif italic opacity-10 select-none text-white">
            0{index + 1}
          </span>

          <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-center">
            <span className="text-lg font-serif italic text-blue-300 mb-2">
              Step 0{index + 1}
            </span>

            <h3 className="text-2xl font-bold mb-3 text-white">
              {item.title}
            </h3>

            <p className="text-slate-300 leading-relaxed text-base">
              {item.description}
            </p>
          </div>

          <div className="absolute top-4 right-4 text-white/20">+</div>
          <div className="absolute bottom-4 left-4 text-white/20">+</div>
        </div>
      </motion.div>
    </div>
  );
};

export default function ProcessScroll() {
  const container = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsLength = content.length;
    const step = 1 / cardsLength;
    const nextIndex = Math.min(Math.floor(latest / step), cardsLength - 1);
    setActiveCard(nextIndex);
  });

  return (
    <div className="relative w-full bg-gradient-to-b from-[#2c54a9] to-black">

      {/* ⭐ STATIC FULL BACKGROUND */}
      <div className="absolute inset-0 -z-10 " />

      {/* MAIN SECTION */}
      <section
        ref={container}
        className="relative w-full font-sans text-white min-h-[400vh]" // extend height to show gradient
      >
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row p-4 md:p-10">

          {/* LEFT SIDE STATIC TEXT */}
          <div className="lg:w-1/2 flex flex-col justify-center lg:h-screen lg:sticky lg:top-0 py-10 lg:py-0 translate-y-10">
            <div className="bg-white/10 w-fit px-3 py-1 rounded text-xs font-medium tracking-wide uppercase mb-6 backdrop-blur-md border border-white/10">
              Our Process
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Our Proven <br />
              <span className="font-serif italic text-blue-400">
                4-Step Process
              </span>
            </h2>

            <p className="text-slate-400 text-lg md:text-xl max-w-md mb-8 leading-relaxed">
              Delivering scalable websites & software for every stage of growth.
            </p>

            <div className="border-l-2 border-blue-500/30 pl-6 mb-10">
              <p className="text-slate-300 italic">
                "From early-stage startups to large enterprises and individual founders,
                we follow a structured, results-driven process."
              </p>
            </div>

            <button className="w-fit px-8 py-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]">
              Schedule a Consultation
            </button>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="lg:w-1/2 w-full">
            {content.map((item, index) => {
              const targetScale = 1 - (content.length - index) * 0.05;
              return (
                <Card
                  key={index}
                  item={item}
                  index={index}
                  activeCard={activeCard}
                  progress={scrollYProgress}
                  range={[index * 0.25, 1]}
                  targetScale={targetScale}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
