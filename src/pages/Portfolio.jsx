import React, { useEffect } from "react";
import AuroraBackground from "./Aurorabackground";
import "./AuroraBackground.css";

const Portfolio = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Projects
    const projects = [
        {
            title: "New Ganesh Seeds",
            url: "https://newganeshseeds.com",
            description:
                "A comprehensive agriculture business website built with modern UI and intuitive navigation.",
            tags: ["Web Design", "React", "Live Project"],
        },
        {
            title: "Shiv Enterprises",
            url: "https://shiventerprises.org.in",
            description:
                "A professional business platform designed for Shiv Enterprises, featuring high-performance design and seamless navigation.",
            tags: ["Web Design", "React", "Live Project"],
        },
    ];

    // 3D Model Data
    const modelData = {
        title: "3D Concept (You can use mouse to rotate it)",
        url: "https://sketchfab.com/models/5d1ac87578b14481a750e917be135471",
        description: "An immersive, interactive 3D visualization showcasing detailed texturing and lighting. This asset is optimized for web performance while maintaining high visual fidelity, demonstrating proficiency in real-time rendering and spatial design.",
        tags: ["3D Art", "Sketchfab", "Interactive", "WebGL"],
    };

    return (
        <div className="bg-[#020617] min-h-screen text-white relative">

            {/* Visual Background Effects - Fixed at the top for hero feel */}
            <div className="absolute top-0 left-0 w-full h-[100vh] pointer-events-none z-0">
                <AuroraBackground
                    colorStops={["#0000FF", "#728FCE", "#0059ff"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                    height="100%"
                />
            </div>

            <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-blue-300 mb-4 neon-pulse">
                        Showcase
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Explore our latest projects, from high-performance web applications to immersive 3D experiences.
                    </p>
                </div>

                <div className="space-y-20">
                    {/* ===== WEB PROJECTS ===== */}
                    <div className="grid grid-cols-1 gap-12">
                        {projects.map((p, index) => (
                            <div
                                key={index}
                                className="bg-black/40 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,174,255,0.2)] border border-blue-500/20 group hover:border-blue-500/50 transition-all duration-500"
                            >
                                {/* FAKE BROWSER BAR */}
                                <div className="h-10 bg-[#0a192f] flex items-center px-4 gap-2 border-b border-blue-500/20">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>

                                    <p className="text-xs ml-4 text-blue-300 truncate flex-1 font-mono opacity-60">
                                        {p.url}
                                    </p>
                                </div>

                                {/* WEBSITE VIEW */}
                                <div className="w-full relative bg-zinc-900 aspect-video md:aspect-auto md:h-[600px]">
                                    <iframe
                                        src={p.url}
                                        title={p.title}
                                        className="w-full h-full border-none"
                                        loading="lazy"
                                    />
                                </div>

                                {/* DETAILS */}
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-bold text-blue-200 mb-3">
                                                {p.title}
                                            </h3>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {p.tags.map((t, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 text-xs rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-400"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
                                                {p.description}
                                            </p>
                                        </div>

                                        <a
                                            href={p.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-[0_0_20px_rgba(0,119,255,0.4)] transition-all duration-300 hover:-translate-y-1 text-center relative group overflow-hidden"
                                        >
                                            <span className="relative z-10">Visit Project ↗</span>
                                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-[lightSweep_1s_ease-in-out_infinite]" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ===== 3D MODEL SECTION ===== */}
                    <div className="bg-black/40 rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,174,255,0.2)] border border-blue-500/20 group hover:border-blue-500/50 transition-all duration-500">
                        <div className="p-4 bg-[#0a192f] border-b border-blue-500/20">
                            <span className="text-xs font-mono text-blue-300 uppercase tracking-widest opacity-60 italic">Interactive 3D Experience</span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* 3D VIEWER */}
                            <div className="bg-zinc-900 h-[400px] md:h-[500px] border-r border-blue-500/10">
                                <iframe
                                    title="3D Model Viewer"
                                    src="https://sketchfab.com/models/5d1ac87578b14481a750e917be135471/embed?autostart=1&transparent=1&ui_controls=1&ui_infos=0&ui_inspector=0&ui_annotations=0&ui_hint=1&ui_watermark=0"
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="autoplay; fullscreen; xr-spatial-tracking"
                                    allowFullScreen
                                />
                            </div>

                            {/* DETAILS */}
                            <div className="p-8 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-blue-200 mb-4">
                                    {modelData.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {modelData.tags.map((t, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-xs rounded-full bg-blue-900/30 border border-blue-500/20 text-blue-400"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                    {modelData.description}
                                </p>

                                <a
                                    href={modelData.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold border border-zinc-700 transition-all duration-300 hover:-translate-y-1 text-center self-start relative group overflow-hidden"
                                >
                                    <span className="relative z-10">View on Sketchfab ↗</span>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:animate-[lightSweep_1s_ease-in-out_infinite]" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Portfolio;
