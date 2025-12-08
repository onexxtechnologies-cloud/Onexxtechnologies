import React from 'react';
import { Rocket } from 'lucide-react';
 

const LandingPage = () => {
  return (
    <div className="relative h-[150vh] w-full bg-black overflow-hidden flex flex-col items-center justify-center font-sans text-white">

      {/* --- Ambient Background Glows --- */}
      
      {/* --- Main Content --- */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 -mt-[15%]">
        
        {/* Logo Icon */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative bg-[#03030b] p-5 rounded-full border border-blue-500/30 shadow-inner shadow-blue-500/20">
            <Rocket className="w-8 h-8 text-white fill-white transform -rotate-45" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-3 leading-tight">
          Your Business Grows,

          <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Our Technology Makes It Possible.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Partner with us to build futuristic strategies,Reliable, scalable, and designed for real-world impact.
        </p>

      </div>


      {/* 🌍 --- INVERTED HORIZON / SYSTEM FLIPPED VERTICALLY --- */}
      <div className="absolute inset-0 scale-y-[-1] bg-#03030b">

        {/* Layer 1 */}
        <div className="absolute 
          bottom-[-156vh] md:bottom-[-135vw]
          left-1/2 -translate-x-1/2
          w-[2000px] md:w-[185vw]
          h-[2000px] md:h-[185vw]
          rounded-full
          bg-#03030b
          shadow-[inset_0_80px_400px_rgba(59,130,246,0.85)]
          border-t border-blue-500/30
        " />

        {/* Layer 2 */}
        <div className="absolute 
          bottom-[-156vh] md:bottom-[-135vw]
          left-1/2 -translate-x-1/2
          w-[2000px] md:w-[185vw]
          h-[2000px] md:h-[185vw]
          rounded-full
          shadow-[0_0_200px_rgba(59,130,246,0.85)]
          pointer-events-none
        " />

        {/* Layer 3 */}
        <div className="absolute 
          bottom-[-156vh] md:bottom-[-135vw]
          left-1/2 -translate-x-1/2
          w-[2000px] md:w-[185vw]
          h-[2000px] md:h-[185vw]
          rounded-full
          border-t-[8px] border-blue-100/90
          blur-[1.5px]
          shadow-[0_0_60px_rgba(96,165,250,0.95)]
          pointer-events-none
        " />

      </div>

    </div>
  );
};

export default LandingPage;
