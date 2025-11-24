import React from "react"; 
import Wave3d from "./wave3d";

const HeroSection = () => {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');`}</style>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&display=swap');`}</style>

      {/* GLOW + RIPPLE ANIMATIONS */}
      <style>{`
        @keyframes glowPulse {
          0% { text-shadow: 0 0 10px #3b82f6, 0 0 25px #3b82f6, 0 0 40px #3b82f6; }
          50% { text-shadow: 0 0 20px #60a5fa, 0 0 45px #3b82f6, 0 0 70px #3b82f6; }
          100% { text-shadow: 0 0 10px #3b82f6, 0 0 25px #3b82f6, 0 0 40px #3b82f6; }
        }

        @keyframes rippleWave {
          0% {
            text-shadow:
              0 0 10px rgba(80,150,255,0.7),
              0 0 20px rgba(80,150,255,0.4),
              0 0 40px rgba(80,150,255,0.2);
          }
          50% {
            text-shadow:
              0 0 20px rgba(80,150,255,1),
              0 0 40px rgba(80,150,255,0.6),
              0 0 60px rgba(80,150,255,0.3);
          }
          100% {
            text-shadow:
              0 0 10px rgba(80,150,255,0.7),
              0 0 20px rgba(80,150,255,0.4),
              0 0 40px rgba(80,150,255,0.2);
          }
        }
      `}</style>

      <div className="relative w-full h-screen bg-black text-white overflow-hidden">

        {/* FULLSCREEN BACKGROUND */}
        <div
          style={{
            width: "100%",
            height: "600px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        >
          <Wave3d amplitude={0.5} distance={0}  />
        </div>

        {/* CONTENT */}
        <div className=" relative z-10 flex flex-col justify-center h-full pl-20 max-w-xl translate-y-[-135px]">

          <h1
            className="text-6xl font-bold text-left whitespace-wrap"
            style={{
              fontFamily: "Rubik Mono One, sans-serif",
              animation: "glowPulse 2s ease-in-out infinite, rippleWave 4s infinite ease-in-out"
            }}
          >
            Innovative Solution To<br/> Accelerate Your Business
          </h1>

          <p
            className="mt-4 text-lg"
            style={{
              fontFamily: "Abril Fatface, serif",
              animation: "glowPulse 2s ease-in-out infinite, rippleWave 4s infinite ease-in-out"
            }}
          >
            Customize every element with optun’s
            intuitive design tools and robust
            editing options
          </p>

        </div>
      </div>
    </>
  );
};

export default HeroSection;
