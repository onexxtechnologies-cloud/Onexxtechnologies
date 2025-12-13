// src/components/PortfolioModal.jsx
import React, { useEffect } from "react";

const PortfolioModal = ({ isOpen, onClose }) => {

  // Hide body scroll + navbar
  useEffect(() => {
    const navbar = document.getElementById("navbar");

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (navbar) navbar.style.display = "none";
    } else {
      document.body.style.overflow = "unset";
      if (navbar) navbar.style.display = "flex";
    }

    return () => {
      document.body.style.overflow = "unset";
      if (navbar) navbar.style.display = "flex";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Projects
  const projects = [
    {
      title: "New Ganesh Seeds",
      url: "https://newganeshseeds.com",
      description:
        "A comprehensive agriculture business website built with modern UI and intuitive navigation.",
      tags: ["Web Design", "React", "Live Project"],
    },
  ];

  // 3D Model Data
  const modelData = {
    title: "3D Concept(You can use mouse to rotate it)",
    url: "https://sketchfab.com/models/5d1ac87578b14481a750e917be135471",
    description: "An immersive, interactive 3D visualization showcasing detailed texturing and lighting. This asset is optimized for web performance while maintaining high visual fidelity, demonstrating proficiency in real-time rendering and spatial design.",
    tags: ["3D Art", "Sketchfab", "Interactive", "WebGL"],
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">

      {/* FADE BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-backdrop"
        onClick={onClose}
      ></div>

      {/* MODAL BOX */}
      <div
        className="relative bg-[#020617] rounded-xl w-full max-w-6xl h-[700px] overflow-hidden 
        shadow-[0_0_35px_#00aeff] border border-blue-500/40 flex flex-col
        animate-modal neon-pulse"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-500/20 sticky top-0 z-10 bg-[#020617]">
          <h2 className="text-xl font-bold text-blue-300">Featured Project</h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-blue-500/10 text-blue-300 hover:text-blue-200 transition"
          >
            ✕
          </button>
        </div>

        {/* SCROLL CONTENT */}
        <div className="overflow-y-auto p-6 space-y-10 custom-scroll">

          {/* ===== WEB PROJECTS ===== */}
          {projects.map((p, index) => (
            <div
              key={index}
              className="bg-black/40 rounded-md overflow-hidden shadow-[0_0_15px_#0077ff] border border-blue-500/20"
            >
              {/* FAKE BROWSER BAR */}
              <div className="h-8 bg-[#0a192f] flex items-center px-3 gap-2 border-b border-blue-500/20">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>

                <p className="text-[11px] ml-3 text-blue-300 truncate flex-1 font-mono">
                  {p.url}
                </p>
              </div>

              {/* WEBSITE VIEW */}
              <div className="w-full">
                <iframe
                  src={p.url}
                  title={p.title}
                  className="w-full h-[600px] border-none"
                />
              </div>

              {/* DETAILS */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-blue-200 mb-2">
                  {p.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-[11px] rounded-full bg-blue-900/40 border border-blue-500/20 text-blue-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-blue-200/80 text-sm mb-4">
                  {p.description}
                </p>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 bg-blue-600/80 hover:bg-blue-500 text-white rounded-md text-sm shadow-[0_0_10px_#0077ff] inline-block"
                >
                  Visit ↗
                </a>
              </div>
            </div>
          ))}

          {/* ===== SKETCHFAB EMBED (WITH DETAILS) ===== */}
          <div className="bg-black/40 rounded-md overflow-hidden shadow-[0_0_15px_#0077ff] border border-blue-500/20">

            {/* 3D VIEWER */}
            <iframe
              title="thisIsFinale"
              src="https://sketchfab.com/models/5d1ac87578b14481a750e917be135471/embed?autostart=1&transparent=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_annotations=0&ui_hint=0&ui_watermark=0"
              className="w-full h-[300px] sm:h-[420px]"
              frameBorder="0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />

            {/* DETAILS */}
            <div className="p-5 border-t border-blue-500/20">
              <h3 className="text-xl font-semibold text-blue-200 mb-2">
                {modelData.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-3">
                {modelData.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-[11px] rounded-full bg-blue-900/40 border border-blue-500/20 text-blue-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-blue-200/80 text-sm mb-4">
                {modelData.description}
              </p>

              <a
                href={modelData.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-blue-600/80 hover:bg-blue-500 text-white rounded-md text-sm shadow-[0_0_10px_#0077ff] inline-block"
              >
                View on Sketchfab ↗
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;