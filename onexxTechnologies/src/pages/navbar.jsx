import { useRef, useEffect, useState } from "react";

// --- GOOEY NAV COMPONENT ---
const GooeyNav = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  vertical = false, // For vertical layout
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const filterRef = useRef(null);
  const textRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance, pointIndex, totalPoints) => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return vertical
      ? [0, distance * Math.sin(angle)] // vertical: move along y mostly
      : [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i, t, d, r) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);
    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");
      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);
        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch { }
        }, t);
      }, 30);
    }
  };

  const updateEffectPosition = (element) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  };

  const handleClick = (e, index) => {
    const liEl = e.currentTarget;
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(liEl);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current.removeChild(p));
    }

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement;
      if (liEl) {
        handleClick({ currentTarget: liEl }, index);
      }
    }
  };

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi);
      textRef.current?.classList.add("active");
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi =
        navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      <style>
        {`
          :root { --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1); }
          .effect { position: absolute; opacity: 1; pointer-events: none; display: grid; place-items: center; z-index: 1; }
          .effect.text { color: white; transition: color 0.3s ease; }
          .effect.text.active { color: black; }
          .effect.active::after { animation: pill 0.3s ease both; }
          @keyframes pill { to { transform: scale(1); opacity: 1; } }
          .particle, .point { display: block; opacity: 0; width: 20px; height: 20px; border-radius: 9999px; transform-origin: center; }
          .particle { --time: 5s; position: absolute; top: calc(50% - 8px); left: calc(50% - 8px); animation: particle calc(var(--time)) ease 1 -350ms; }
          .point { background: var(--color); opacity: 1; animation: point calc(var(--time)) ease 1 -350ms; }
          @keyframes particle {
            0% { transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y))); opacity: 1; animation-timing-function: cubic-bezier(0.55,0,1,0.45); }
            70% { transform: rotate(calc(var(--rotate)*0.5)) translate(calc(var(--end-x)*1.2), calc(var(--end-y)*1.2)); opacity: 1; animation-timing-function: ease; }
            85% { transform: rotate(calc(var(--rotate)*0.66)) translate(calc(var(--end-x)), calc(var(--end-y))); opacity: 1; }
            100% { transform: rotate(calc(var(--rotate)*1.2)) translate(calc(var(--end-x)*0.5), calc(var(--end-y)*0.5)); opacity: 1; }
          }
          @keyframes point { 0%{transform:scale(0);opacity:0} 25%{transform:scale(calc(var(--scale)*0.25))} 38%{opacity:1} 65%{transform:scale(var(--scale));opacity:1} 85%{transform:scale(var(--scale));opacity:1} 100%{transform:scale(0);opacity:0} }
          li.active { color: black; text-shadow: none; }
          li.active::after { opacity: 1; transform: scale(1); }
          li::after { content: ""; position: absolute; inset: 0; border-radius: 8px; background: white; opacity: 0; transform: scale(0); transition: all 0.3s ease; z-index: -1; }
        `}
      </style>

      <div className="relative" ref={containerRef}>
        <nav className={`flex ${vertical ? "flex-col" : ""}`} style={{ transform: "translate3d(0,0,0.01px)" }}>
          <ul
            ref={navRef}
            className={`flex ${vertical ? "flex-col items-center" : "gap-6 md:gap-8"} list-none p-0 px-2 md:px-4 m-0 relative z-[3]`}
            style={{ color: "white", textAlign: vertical ? "center" : "left", textShadow: "0 1px 1px hsl(205deg 30% 10% / 0.2)" }}
          >
            {items.map((item, index) => (
              <li key={index} className={`rounded-full relative cursor-pointer transition-[background-color_color_box-shadow] duration-300 ease shadow-[0_0_0.5px_1.5px_transparent] text-white ${activeIndex === index ? "active" : ""}`}>
                <a
                  onClick={(e) => handleClick(e, index)}
                  href={item.href}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="outline-none py-[0.5em] px-[0.9em] md:py-[0.6em] md:px-[1em] inline-block text-sm md:text-base no-underline"
                  style={{ textDecoration: "none" }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="effect filter" ref={filterRef} />
        <span className="effect text" ref={textRef} />
      </div>
    </>
  );
};

// --- MAIN NAVBAR COMPONENT ---
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
  ];

  const handleMobileToggle = () => {
    if (isMobileMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosing(false);
      }, 350); // duration of fade-out animation
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <>
      <style>
        {`
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
          @media (min-width: 900px) {
            .desktop-only { display: flex !important; }
            .mobile-only { display: none !important; }
          }
          @keyframes fadeDown { 0%{opacity:0;transform:translateY(-20px)} 100%{opacity:1;transform:translateY(0);} }
          @keyframes fadeUp { 0%{opacity:1;transform:translateY(0);} 100%{opacity:0;transform:translateY(-20px);} }
        `}
      </style>

      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full flex justify-center py-3 md:py-4 bg-transparent pointer-events-auto">
        <div
          className={`
            pointer-events-auto
            px-4 md:px-8 py-3 md:py-4 h-[64px] md:h-[70px]
            mr-[3%]
            rounded-full flex items-center justify-between gap-4
            transition-all duration-500
            shadow-[0_0_25px_rgba(0,0,0,0.1)]
            hover:shadow-[0_0_35px_rgba(0,0,0,0.15)]
            ${isScrolled
              ? "w-[95%] sm:w-[80%] lg:w-[70%] lg:mr-[2%]"
              : "w-[90%] sm:w-[60%] lg:w-[45%] lg:mr-[2%]"
            }
          `}
          style={{
            background: "linear-gradient(135deg, rgba(30,30,40,0.75) 0%, rgba(60,60,70,0.65) 50%, rgba(100,100,110,0.55) 100%)",
            backdropFilter: "blur(120px) saturate(180%)",
            WebkitBackdropFilter: "blur(120px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="text-white text-lg md:text-2xl font-bold tracking-[0.25em] uppercase z-50">ONEXX</div>

          {/* DESKTOP MENU */}
          <div className="desktop-only flex-1 justify-center w-full">
            <GooeyNav items={items} particleCount={15} particleDistances={[90, 10]} particleR={100} initialActiveIndex={0} animationTime={600} timeVariance={300} colors={[1, 2, 3, 1, 2, 3, 1, 4]} />
          </div>

          {/* DESKTOP BUTTON */}
          <button className="desktop-only px-5 md:px-6 py-6 rounded-full font-semibold text-white text-sm md:text-base bg-gradient-to-r from-[#4AB3FF] to-[#1E6BFF] shadow-[0_0_20px_rgba(0,102,255,0.35)] hover:shadow-[0_0_30px_rgba(80,150,255,0.9)] transition whitespace-nowrap">
            LET&apos;S CONNECT
          </button>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="mobile-only flex items-center mr-[3%] z-50 ml-auto">
            <button
              className="text-white p-2 focus:outline-none bg-transparent hover:bg-transparent active:bg-transparent"
              onClick={handleMobileToggle}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen && !isClosing ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>

          {/* MOBILE MENU */}
          {(isMobileMenuOpen || isClosing) && (
            <div
              className={`absolute top-full left-0 w-full z-[999] flex justify-center`}
              style={{ animation: `${isClosing ? "fadeUp" : "fadeDown"} 0.35s ease-out forwards` }}
            >
              <div
                className="relative flex flex-col items-center justify-center text-center py-10 space-y-8 text-white w-[calc(100%-40px)] max-w-[400px]
      backdrop-blur-[180px] saturate-[200%] border-t border-white/25 overflow-hidden rounded-lg"
                style={{
                  background: `linear-gradient(135deg, rgba(25,25,35,0.92) 0%, rgba(55,65,95,0.88) 40%, rgba(85,105,145,0.85) 100%)`,
                  boxShadow: `inset 0 0 60px rgba(255,255,255,0.06),
        inset 0 0 90px rgba(150,170,255,0.10),
        0 0 55px rgba(120,160,255,0.40)`,
                }}
              >
                <div className="flex flex-col gap-6 items-center w-full">
                  <div className="w-full flex justify-center items-center mr-[12%]">
                    <GooeyNav
                      items={[
                        { label: "Home", href: "#home" },
                        { label: "About Us", href: "#about" },
                        { label: "Services", href: "#services" },
                        { label: "Work", href: "#work" },
                      ]}
                      vertical={true}
                      particleCount={15}
                      particleDistances={[90, 10]}
                      particleR={100}
                      animationTime={600}
                      timeVariance={300}
                      colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                      initialActiveIndex={0}
                      style={{ margin: "0 auto", display: "flex", justifyContent: "center" }}
                    />
                  </div>

                  <button
                    onClick={handleMobileToggle}
                    className="px-10 py-3 text-lg font-semibold rounded-full relative overflow-hidden
    bg-gradient-to-r from-[#4AB3FF] to-[#1E6BFF]
    shadow-[0_0_35px_rgba(0,102,255,0.75)]
    hover:shadow-[0_0_50px_rgba(0,140,255,1)]
    transition-all duration-500 scale-105 mt-2"
                  >
                    <span
                      className="absolute inset-0 opacity-[0.5] animate-[lightSweep_3s_linear_infinite]"
                      style={{
                        background:
                          "linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent)",
                      }}
                    />
                    Let’s Connect
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
