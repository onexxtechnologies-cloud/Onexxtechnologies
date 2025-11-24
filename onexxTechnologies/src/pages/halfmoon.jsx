import React from 'react';

const UltimateBlueHorizon = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* --- TEXT HIGHER --- */}
      <div className="relative z-20 text-center mb-10 mt-[-40vh]">
        <h1 className="text-white text-5xl font-bold tracking-tight">
          Building Brands That Shine Among the Stars
          <br />
          <span className="text-white bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-500">
            Crafting Digital Experiences That Leave a Lasting Impact.
          </span>
        </h1>
      </div>

      {/* ================= MAIN BACKGROUND ATMOSPHERE ================= */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-5vh] w-[150vw] h-[80vh] bg-blue-900/30 blur-[150px] rounded-[50%] pointer-events-none -z-10" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-18vh] w-[120vw] h-[60vh] bg-blue-700/20 blur-[100px] rounded-[50%] pointer-events-none z-0" />

      {/* ================= PLANET (PURE BLACK) ================= */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-160vw] w-[185vw] h-[185vw] bg-black rounded-[50%] z-0 overflow-hidden 
                      shadow-[inset_0_-20px_80px_rgba(40,100,255,0.6)] border-t border-blue-500/30">

        <div className="absolute top-0 left-0 w-full h-[40vh] 
                        bg-gradient-to-b from-blue-400/80 via-blue-600/30 to-transparent" />
      </div>

      {/* ================= GLOWING HORIZON ================= */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-160vw] w-[185vw] h-[185vw] rounded-[50%] 
                      shadow-[0_0_150px_rgba(59,130,246,0.7)] 
                      z-10 pointer-events-none" />

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-160vw] w-[185vw] h-[185vw] rounded-[50%] 
                      border-t-[10px] border-blue-400/80 
                      blur-[3px] z-10 pointer-events-none" />

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[-160vw] w-[185vw] h-[185vw] rounded-[50%] 
                      border-t-[3px] border-blue-100/90
                      shadow-[0_0_30px_rgba(255,255,255,0.5)] 
                      z-11 pointer-events-none" />
    </div>
  );
};

export default UltimateBlueHorizon;
