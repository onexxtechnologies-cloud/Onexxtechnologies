import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const OpenCloseScroll = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- ANIMATION TIMELINE ---
  
  // 0% - 25%:  Circle Grows (Zoom In)
  // 25% - 75%: Full Screen Hold (Reading Time)
  // 75% - 100%: Circle Shrinks (Zoom Out / Close)

  // 1. BACKGROUND CIRCLE SCALE
  const scale = useTransform(scrollYProgress, 
    [0, 0.25, 0.75, 0.8], 
    [1, 20,  20,   1] 
    // Scale 1 (Start) -> Scale 35 (Full) -> Scale 35 (Hold) -> Scale 0 (Close)
  );
  
  // 2. BORDER RADIUS (Optional Polish)
  // Makes it look like a circle initially, then square when full, then circle again when closing
  const borderRadius = useTransform(scrollYProgress,
    [0.2  , 0.25, 0.75, 0.8],
    ["50%", "0%", "0%", "50%"]
  );

  // 3. TITLE MOVEMENT
  // Move title up slightly when description appears
  const titleY = useTransform(scrollYProgress, 
    [0.25, 0.40], 
    ["0%", "-20%"]
  );

  // 4. DESCRIPTION TEXT OPACITY (The "Fade In" logic)
  // It waits until 0.30 (after circle is full) to start appearing.
  // It fades out at 0.70 (before circle starts closing).
  const descriptionOpacity = useTransform(scrollYProgress, 
    [0.10, 0.15, 0.40, 0.80], 
    [0,    1,    1,    0]
  );
  
  // 5. MAIN CONTENT OPACITY (Clean Exit)
  // Fades out everything right before the circle closes so text doesn't clip
  const contentOpacity = useTransform(scrollYProgress,
    [0.70, 0.80],
    [1, 1]
  );

  return (
    <div className="relative w-full">
      
      {/* --- SECTION 1: The Animation Track (700vh for smooth phases) --- */}
      <section ref={containerRef} className="relative h-[200vh] bg-[#e0e0e000]">
        
        {/* Sticky Container */}
        <div className="sticky top-2 h-screen overflow-hidden flex items-center justify-center">

          {/* THE DYNAMIC BACKGROUND (Circle) */}
          <motion.div 
            style={{ 
              scale,
              borderRadius
            }}
            className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-[#0b0b4e] z-10"
          />

          {/* CONTENT INSIDE THE CIRCLE */}
          <motion.div 
            style={{ opacity: contentOpacity }} // Fades out entire content at the end
            className="relative z-20 flex flex-col items-center text-center px-6 max-w-xl"
          >
            
            {/* TITLE */}
            <motion.h1 
              style={{ y: titleY }}
              className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight"
            >
              Alter Reality
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.div style={{ opacity: descriptionOpacity }}>
               {/* Divider Line */}
               <div className="w-24 h-[1px] bg-gray-400 mx-auto my-8"></div>
               
               <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                 We are a team of visionaries. <br/>
                 Once the circle expands, you enter our world. <br/>
                 When it closes, you are left with only the memory.
               </p>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OpenCloseScroll;