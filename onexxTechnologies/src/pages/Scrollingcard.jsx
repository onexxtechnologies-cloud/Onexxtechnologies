import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, CheckCircle2, Headphones, Cpu } from "lucide-react";

const cards = [
  {
    title: "Affordable Price",
    desc: "Get premium features for a budget-friendly cost. Perfect for startups & businesses.",
    icon: <DollarSign size={42} className="text-blue-300" />,
  },
  {
    title: "Quality",
    desc: "Top-notch performance with well-engineered, stable, and optimized solutions.",
    icon: <CheckCircle2 size={42} className="text-blue-300" />,
  },
  {
    title: "Support",
    desc: "Dedicated expert support available 24/7 to assist you at every step.",
    icon: <Headphones size={42} className="text-blue-300" />,
  },
  {
    title: "Tech Solution & Languages",
    desc: "Modern tech stack & multilingual support for global audiences.",
    icon: <Cpu size={42} className="text-blue-300" />,
  },
];

const ScrollingBlueNeon = () => {
  return (
    <div className="w-full py-16 md:py-24 overflow-hidden relative bg-gradient-to-b from-[#02081700] to-[#071a3c00]">

      {/* Line */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-blue-500/20 blur-[4px]" />

      {/* Main Scroller */}
      <motion.div
        className="flex gap-6 md:gap-14"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 12  ,
        }}
      >
        {[...cards, ...cards].map((card, idx) => (
          <NeonCard key={idx} card={card} index={idx} />
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingBlueNeon;

//
// ----------------------------
// ✨ Neon Card Component (Mobile Optimized)
// ----------------------------
//
const NeonCard = ({ card, index }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }}

      className="
         min-w-[260px] h-[320px]         /* Mobile */
    sm:min-w-[300px] sm:h-[360px]  /* Small tablets */
    md:min-w-[330px] md:h-[380px]  /* Tablets */
    lg:min-w-[350px] lg:h-[400px]  /* Desktop */
        rounded-[50px] md:rounded-[45px]
        bg-gradient-to-br from-[#447efb] to-[#000000]
        border border-blue-500/20
        p-6 md:p-8
        text-white flex flex-col justify-between 
        backdrop-blur-xl
        transition-all duration-300

        hover:scale-[1.15]
        hover:shadow-[0_0_35px_rgba(0,140,255,0.55)]

        active:scale-[1.03]     /* mobile tap scale */
      "
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 5,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
    >
      {/* Disable glow on mobile (performance) */}
      <div
        className="
          hidden md:block 
          pointer-events-none 
          absolute w-44 h-44 rounded-full 
          bg-blue-500/30 blur-3xl 
          opacity-0 group-hover:opacity-100 
          transition-all duration-300
        "
        style={{
          left: pos.x - 90,
          top: pos.y - 90,
        }}
      />

      {/* Icon */}
      <div>{card.icon}</div>

      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-blue-200 mb-3">
          {card.title}
        </h2>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {card.desc}
        </p>
      </div>

      <div className="w-full h-[3px] bg-blue-400/30 rounded-full mt-3" />

      {/* Border glow only on desktop */}
      <div className="
        hidden md:block 
        absolute inset-0 rounded-[45px] 
        border border-blue-400/40 
        opacity-0 group-hover:opacity-100 
        transition duration-300
        shadow-[0_0_45px_rgba(0,160,255,0.5)]
      "></div>
    </motion.div>
  );
};
