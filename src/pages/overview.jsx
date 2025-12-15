import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple mobile detection hook
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

const WaterRipple = ({ isMobile }) => {
    const pointsRef = useRef();

    const ringCount = isMobile ? 180 : 300;
    const dotsPerRing = isMobile ? 120 : 200;
    const ringSpacing = 1;
    const particleCount = ringCount * dotsPerRing;

    const { positions, colors, basePositions } = useMemo(() => {
        const positions = new Float32Array(particleCount * 3);
        const basePositions = new Float32Array(particleCount * 2);
        const colors = new Float32Array(particleCount * 3);
        const baseColor = new THREE.Color('#4a7fff');

        let idx = 0;
        for (let ring = 0; ring < ringCount; ring++) {
            const radius = (ring + 1) * ringSpacing;
            const brightness = Math.max(0.15, 1 - (ring / ringCount) * 0.8);

            for (let dot = 0; dot < dotsPerRing; dot++) {
                const angle = (dot / dotsPerRing) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                positions[idx * 3] = x;
                positions[idx * 3 + 1] = 0;
                positions[idx * 3 + 2] = z;

                basePositions[idx * 2] = x;
                basePositions[idx * 2 + 1] = z;

                colors[idx * 3] = baseColor.r * brightness;
                colors[idx * 3 + 1] = baseColor.g * brightness;
                colors[idx * 3 + 2] = baseColor.b * brightness;

                idx++;
            }
        }

        return { positions, colors, basePositions };
    }, [particleCount, ringCount, dotsPerRing]);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const time = state.clock.getElapsedTime();
        const pos = pointsRef.current.geometry.attributes.position.array;

        // ✅ ONLY CHANGE: MUCH smaller wave on mobile
        const amplitude = isMobile ? 6 : 20;

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const x = basePositions[i * 2];
            const z = basePositions[i * 2 + 1];

            const dist = Math.sqrt(x * x + z * z);
            const phase = dist * 0.05 - time * 2;
            const damping = Math.max(0, 1 - dist / 400);

            pos[i3 + 1] = Math.sin(phase) * amplitude * damping;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={isMobile ? 1.6 : 1.5}
                vertexColors
                transparent
                opacity={1}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};

const AiVoiceAssistant = () => {
    const isMobile = useIsMobile();

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-black font-sans text-white">

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    camera={{
                        position: isMobile ? [0, 60, 220] : [0, 60, 160],
                        fov: 55,
                        near: 1,
                        far: 1000
                    }}
                    gl={{
                        antialias: false,
                        alpha: true,
                        powerPreference: 'high-performance',
                        failIfMajorPerformanceCaveat: false
                    }}
                    style={{ width: '100%', height: '100%' }}
                >
                    <color attach="background" args={['#000003']} />
                    <fog attach="fog" args={['#000003', 100, 400]} />
                    <WaterRipple isMobile={isMobile} />
                </Canvas>
            </div>

            {/* Gradients */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            <div className="absolute top-0 left-0 right-0 h-32 z-[1] pointer-events-none bg-gradient-to-b from-black via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 md:px-8 py-12">
                <div className="max-w-6xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-14 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">

                        <div className="md:col-span-4">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                                Company<br />Overview
                            </h2>
                        </div>

                        <div className="md:col-span-8 flex flex-col gap-5 md:gap-6">
                            <p className="text-base md:text-xl text-white/80 leading-relaxed">
                                Onexx Technologies is an innovative tech startup delivering modern digital solutions.
                                We specialize in building high-performance websites, custom software, mobile applications,
                                and immersive 3D models tailored to business needs.
                            </p>

                            <p className="text-base md:text-xl text-white/80 leading-relaxed">
                                Our focus is on combining clean design with scalable technology to help brands grow digitally.
                                We enhance efficiency, creativity, and user experience across all our projects, ensuring
                                future-ready and reliable solutions from concept to deployment.
                            </p>

                            <p className="text-base md:text-xl text-white/80 leading-relaxed">
                                Our portfolio includes real-world projects like New Ganesh Seeds, showcased in our
                                <span className="font-medium text-white"> Show My Work </span> section.
                                At Onexx Technologies, innovation meets execution — we build exactly what clients need and want.
                            </p>

                            <div className="mt-4">
                                <a href="#services">
                                    <button className="
                                        px-6 py-3 md:px-8 md:py-4
                                        bg-gradient-to-r from-[#4AB3FF] to-[#1E6BFF]
                                        hover:from-[#1E6BFF] hover:to-[#4AB3FF]
                                        rounded-xl font-semibold text-base md:text-lg
                                        transition-all duration-300 ease-out
                                        shadow-lg shadow-blue-600/30
                                    ">
                                        Learn More
                                    </button>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiVoiceAssistant;

