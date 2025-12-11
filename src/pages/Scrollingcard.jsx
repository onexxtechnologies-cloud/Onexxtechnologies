import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { DollarSign, CheckCircle2, Headphones, Cpu } from "lucide-react";

// ---------------------------------------------------------
// 📦 DATA
// ---------------------------------------------------------
const originalCards = [
  {
    title: "Affordable Price",
    desc: "Onexx delivers premium design and development without the premium cost. You get industry-level features, modern performance, and polished UI at a budget-friendly price. Quality becomes affordable — without cutting corners.",
    icon: <DollarSign size={42} className="text-blue-300" />,
  },
  {
    title: "Quality Code",
    desc: "Every line of code is crafted for speed, stability, and long-term scalability. At Onexx, we build clean, optimized architectures that power smooth user experiences. Your website performs flawlessly — today and as your brand grows.",
    icon: <CheckCircle2 size={42} className="text-blue-300" />,
  },
  {
    title: "Expert Support",
    desc: "Our support team is always available to help you, anytime you need. From quick fixes to strategic guidance, Onexx ensures you’re never stuck or waiting. We believe support isn’t a service — it’s a partnership.",
    icon: <Headphones size={42} className="text-blue-300" />,
  },
  {
    title: "Modern Tech",
    desc: "Onexx uses a fresh, future-ready tech stack designed for speed, security, and flexibility. With multilingual capabilities and advanced features, your website stays modern and global. We build with innovation so your brand stays ahead of the curve.",
    icon: <Cpu size={42} className="text-blue-300" />,
  },
];

// We double the cards to ensure the loop is smooth even on wide screens
const cards = [...originalCards, ...originalCards];

// ---------------------------------------------------------
// 🔧 CONFIGURATION
// ---------------------------------------------------------
const CARD_WIDTH = 350;   // Card width (px)
const CARD_GAP = 50;      // Gap between cards (px)
const ITEM_SIZE = CARD_WIDTH + CARD_GAP;
const RADIUS = 3000;      // Curve radius (higher = flatter)
const SPEED = 0.5;        // Speed of rotation (pixels per frame)

const ScrollingBlueNeon = () => {
  // This value drives the whole animation
  const baseX = useMotionValue(0);

  // ⏸️ PAUSE LOGIC
  const isPaused = useRef(false);
  const timerRef = useRef(null);

  // 🚀 THE INFINITE LOOP ENGINE
  useAnimationFrame((time, delta) => {
    // Only move if NOT paused
    if (!isPaused.current) {
      let moveBy = SPEED * (delta / 8); // normalize speed
      baseX.set(baseX.get() - moveBy);
    }
  });

  // 🖱️ INTERACTION HANDLERS
  const stopAnimation = () => {
    isPaused.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const startAnimationAfterDelay = () => {
    // Clear any existing timer to prevent overlapping
    if (timerRef.current) clearTimeout(timerRef.current);

    // Wait 1 second (1000ms) before restarting
    timerRef.current = setTimeout(() => {
      isPaused.current = false;
    }, 500);
  };

  // Handle Swipe/Drag logic (Manual movement)
  const handlePan = (_, info) => {
    baseX.set(baseX.get() + info.delta.x);
  };

  return (
    <div className="w-full h-[500px] sm:h-[800px] overflow-hidden relative bg-gradient-to-b from-[#000000] to-[#2c54a9] flex flex-col justify-center items-center">

      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/20 blur-[2px]" />

      {/* Container - Handles Taps, Drags, and Holds */}
      <motion.div
        className="relative w-full h-[600px] flex justify-center items-center cursor-grab active:cursor-grabbing touch-pan-y"

        // 1. Stop immediately on touch/click/drag start
        onPointerDown={stopAnimation}
        onPanStart={stopAnimation}

        // 2. Restart after 1s delay on release
        onPointerUp={startAnimationAfterDelay}
        onPointerLeave={startAnimationAfterDelay}
        onPanEnd={startAnimationAfterDelay}

        // 3. Allow manual dragging
        onPan={handlePan}
      >
        {cards.map((card, index) => (
          <LoopingCard
            key={index}
            index={index}
            baseX={baseX}
            card={card}
            totalItems={cards.length}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingBlueNeon;


// ---------------------------------------------------------
// 🎡 The Physics Card Component
// ---------------------------------------------------------
const LoopingCard = ({ index, baseX, card, totalItems }) => {
  const x = useTransform(baseX, (v) => {
    // 1. Calculate offset based on index
    const offset = index * ITEM_SIZE;
    const totalSize = totalItems * ITEM_SIZE;

    // 2. Add current scroll value
    let position = (v + offset) % totalSize;

    // 3. Wrap logic: ensure items flow smoothly around the center
    // If position is too far left, move it to the right side
    if (position < -totalSize / 2) {
      position += totalSize;
    }
    // If position is too far right, move it to the left side
    else if (position > totalSize / 2) {
      position -= totalSize;
    }

    return position;
  });

  // 📐 ARC PHYSICS
  // Calculate Y and Rotation based on the wrapped X value

  const y = useTransform(x, (latestX) => {
    // Parabola: y = x^2 / k
    return (Math.pow(latestX, 2)) / RADIUS;
  });

  const rotate = useTransform(x, (latestX) => {
    // Tilt based on X position
    return latestX / 25;
  });

  const opacity = useTransform(x, (latestX) => {
    // Fade out at the edges
    const distance = Math.abs(latestX);
    if (distance > 2000) return 0; // Hide if really far
    return 1 - (distance / 3500);
  });

  return (
    <motion.div
      style={{
        x,
        y,
        rotate,
        opacity,
        position: "absolute",
        left: "50%",
        marginLeft: -CARD_WIDTH / 2, // Center the card origin
      }}
      className="will-change-transform"
    >
      <NeonCard card={card} />
    </motion.div>
  );
};


// ----------------------------
// ✨ Card Design
// ----------------------------
const NeonCard = ({ card }) => {
  return (
    <div
      className="
        w-[280px] h-[360px] md:w-[350px] md:h-[420px]
        rounded-[45px]
        bg-gradient-to-br from-[#046ff3] to-[#000000]
        border border-blue-500/20
        p-8
        text-white flex flex-col justify-between 
        backdrop-blur-xl
        group relative overflow-hidden
        transition-all duration-300
        hover:shadow-[0_0_40px_rgba(0,140,255,0.3)]
        hover:scale-[1.02]
        select-none pointer-events-none md:pointer-events-auto
      "
    >
      {/* Internal Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent opacity-50" />

      {/* Icon */}
      <div className="z-10 relative bg-blue-900/20 p-4 rounded-full w-fit border border-blue-500/10">
        {card.icon}
      </div>

      <div className="z-10 relative">
        <h2 className="text-2xl font-bold text-blue-100 mb-3 tracking-wide">
          {card.title}
        </h2>
        <p className="text-blue-300/60 text-sm leading-relaxed font-medium">
          {card.desc}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="w-12 h-1 bg-blue-500 rounded-full mt-4 z-10" />
    </div>
  );
};