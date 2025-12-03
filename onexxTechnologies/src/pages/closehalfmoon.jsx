import React from 'react';
import { Rocket } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#03030b] overflow-hidden flex flex-col items-center justify-center font-sans text-white">
      
      {/* --- Ambient Background Glows --- */}
      {/* Deep blue haze in the center background */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />


      {/* --- Main Content --- */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl px-4 -mt-20">
        
        {/* Logo Icon */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative bg-[#151525] p-5 rounded-full border border-blue-500/30 shadow-inner shadow-blue-500/20">
            <Rocket className="w-8 h-8 text-white fill-white transform -rotate-45" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-tight">
          Let’s Launch Your Business
          <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Into a New Orbit
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Partner with us to build futuristic strategies, unlock growth, and take your business
          light-years ahead of the competition.
        </p>

        {/* CTA Button */}
        <button className="px-8 py-3 rounded-full bg-blue-700 hover:bg-blue-600 text-white font-medium transition-all duration-300 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.7)] hover:-translate-y-1">
          Get Started
        </button>
      </div>


      {/* --- THE FLIP MOON / SMILE CURVE EFFECT --- */}
      <div className="absolute bottom-5 left-0 w-full h-[300px] md:h-[500px] overflow-hidden pointer-events-none z-10">
        
        {/* Logic:
           1. We create a MASSIVE circle positioned WAY above the screen.
           2. We only see the very bottom edge of it (border-bottom).
           3. This creates a concave "Smile" curve.
           4. We use box-shadow with a positive Y value to push the light DOWN into the void.
        */}
        
        <div className="absolute 
            left-[-50%] 
            w-[200%]
            sm:w-[200%]
            h-[2000px] 
            sm:h-[4000px]
            rounded-[50%] 
            bg-[#03030b]
            bottom-[20px] md:bottom-[20px] 
            border-b-[1px] border-blue-600/90 
            shadow-[0_20px_60px_10px_rgba(37,99,235,0.5)]">
            
            {/* Inner Glow (Optional: Adds a second layer of depth on the line itself) */}
            <div className="absolute inset-0 rounded-[50%] border-b border-blue-300/20 shadow-[0_10px_30px_rgba(59,130,246,0.2)]"></div>
        </div>
        
        {/* Additional bottom glow to fill the corners if needed */}
        <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      </div>

    </div>
  );
};

export default LandingPage;