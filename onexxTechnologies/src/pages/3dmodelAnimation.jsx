import React, { useState, useEffect } from "react";
import OnexxatronModel from "./3dmodel";

const AnimatedProductCard = () => {
    const [active, setActive] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Detect screen resize live
    useEffect(() => {
        const resizeObserver = () => {
            setIsMobile(window.innerWidth < 768);
            setActive(false); // reset animation on resize to avoid glitches
        };
        window.addEventListener("resize", resizeObserver);
        return () => window.removeEventListener("resize", resizeObserver);
    }, []);

    // Interaction logic
    const handleClick = () => {
        if (isMobile) setActive((prev) => !prev);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black px-4 md:px-20">
            <div
                onClick={handleClick}
                onMouseEnter={() => !isMobile && setActive(true)}
                onMouseLeave={() => !isMobile && setActive(false)}
                className={`
          relative bg-black rounded-[20px] overflow-hidden cursor-pointer 
          transition-all duration-700 ease-in-out flex justify-center items-center

          ${isMobile
                        ? // ---- MOBILE DIMENSIONS ----
                        active
                            ? "w-full max-w-[350px] h-[600px]"
                            : "w-full max-w-[350px] h-[350px]"
                        : // ---- DESKTOP DIMENSIONS ----
                        active
                            ? "w-[600px] h-[350px]"
                            : "w-[350px] h-[350px]"
                    }
        `}
            >

                {/* BACKGROUND CIRCLE → SQUARE */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <div
                        className={`
              bg-black border-[8px] border-blue-600 drop-shadow-[0_0_10px_#2563eb]
              transition-all duration-700 ease-in-out

              ${active
                                ? "w-full h-full bg-blue-600 rounded-[20px]"
                                : "w-[300px] h-[300px] rounded-full"
                            }
            `}
                    ></div>
                </div>

                {/* INITIAL TEXT */}
                <div
                    className={`
            absolute z-30 text-white font-bold text-3xl uppercase tracking-widest transition-all duration-500
            ${active ? "opacity-0 scale-0" : "opacity-100 scale-100"}
          `}
                >
                    3D View
                </div>

                {/* 3D MODEL POSITIONING */}
                <div
                    className={`
            absolute transition-all duration-700 ease-in-out z-40

            ${!active && "scale-0 rotate-[315deg]"}

            ${active &&
                        (isMobile
                            ? // MOBILE POSITION  
                            "top-[10%] left-1/2 -translate-x-1/2 -translate-y-[20%] scale-100 "
                            : // DESKTOP POSITION
                            "top-[70%] left-[60%] -translate-x-1/2 -translate-y-1/2 scale-100 "
                        )
                        }
          `}
                >
                    <div
                        className={`
              transition-all duration-900
              ${active
                                ? isMobile
                                    ? "w-[300px] h-[300px]"
                                    : "w-[600px] h-[600px]"
                                : "w-0 h-0"
                            }
            `}
                    >
                        <OnexxatronModel />
                    </div>
                </div>

                {/* TEXT CONTENT */}
                <div
                    className={`
    absolute z-50 text-white transition-all duration-500 ease-in-out

    ${active
                            ? "opacity-100 visible delay-[700ms]" // <-- delay matches rectangle expansion
                            : "opacity-0 invisible"
                        }

    ${isMobile
                            ? "bottom-8 left-0 w-full text-center px-6 translate-y-0"
                            : "left-6 w-1/2 top-1/2 -translate-y-1/2"
                        }
  `}
                >
                    <h2 className="text-4xl font-bold uppercase">3d model</h2>
                    <p className="text-sm mt-2 mb-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <button className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200">
                        Export More
                    </button>
                </div>


            </div>
        </div>
    );
};

export default AnimatedProductCard;
