import React, { useState, useRef, useEffect } from "react";
// Assuming you have the model component in the same folder structure
import OnexxatronModel from "./3dmodel";

export default function CombinedEnquiry3D() {
  // ============ FORM STATES ============
  const [focusedField, setFocusedField] = useState(null);
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: "" });

  const dropdownRef = useRef(null);
  const products = ["Website Development", "3D Model", "Applicaion Development", "Others"];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ============ FORM STYLES (SCI-FI LOOK) ============
  const baseFieldStyle =
    "w-full rounded-lg px-3 py-2 text-sm transition-colors duration-200 focus:outline-none text-white placeholder:text-gray-500 border border-white/10";

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const getFieldStyle = (fieldName) => {
    const isFocused = focusedField === fieldName;
    const isDropdownAndOpen = fieldName === "product" && dropdownOpen;
    return `${baseFieldStyle} ${isFocused || isDropdownAndOpen
      ? "bg-white/20 border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
      : "bg-white/5"
      }`;
  };

  // ============ SUBMIT LOGIC ============
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ ok: null, msg: "" });

    const form = new FormData(e.currentTarget);

    if ((form.get("website") || "").trim() !== "") {
      setStatus({ ok: true, msg: "Thanks!" });
      return;
    }

    const phone = (form.get("phone") || "").toString().replace(/\D/g, "");
    if (phone.length !== 10) {
      setStatus({ ok: false, msg: "Enter a valid 10-digit mobile number." });
      return;
    }

    const data = {
      name: form.get("name"),
      email: form.get("email"),
      phone,
      city: form.get("city"),
      product: selected,
      message: form.get("message"),
    };

    try {
      setLoading(true);
      // Adjust path to your API
      const res = await fetch("../../api/sendemail.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({ ok: true, msg: "Enquiry sent successfully!" });
        e.target.reset();
        setSelected("");
      } else {
        setStatus({ ok: false, msg: "Failed. Try again later." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ ok: false, msg: "Server error! Please try again." });
    } finally {
      setLoading(false);
    }
  }

  // ============ 3D BOX STATES ============
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : true
  );

  useEffect(() => {
    const resizeObserver = () => {
      setIsMobile(window.innerWidth < 768);
      setActive(false);
    };
    window.addEventListener("resize", resizeObserver);
    return () => window.removeEventListener("resize", resizeObserver);
  }, []);

  const handleClick = () => {
    if (isMobile) setActive((prev) => !prev);
  };

  // ============ LAYOUT ============
  return (
    <div className="flex flex-col w-full md:flex-row  min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a192f] via-[#03030b] to-[#000000] px-4 md:px-10 gap-8 py-10 overflow-x-hidden sm:mt-[-2%] mt-[10%]">

      {/* ================== LEFT COLUMN (ANCHOR) ================== */}
      <div className="relative w-full md:w-[350px] h-[350px] md:h-[600px] flex items-center sm:items-left justify-center sm:justify-left z-20">

        {/* ================== THE 3D CARD ================== */}
        <div
          onClick={handleClick}
          onMouseEnter={() => !isMobile && setActive(true)}
          onMouseLeave={() => !isMobile && setActive(false)}
          className={`
            absolute top-1/2 -translate-y-1/2 left-0
            rounded-[30px] cursor-pointer 
            transition-all duration-700 ease-in-out flex justify-center items-center 
            ${
            // Logic: When active, it has a background. When inactive, it's transparent (the button provides the visuals)
            active
              ? "bg-black z-50 shadow-[0_0_50px_rgba(37,99,235,0.5)] border border-white/5"
              : "bg-transparent z-20 border-none"
            }
            ${isMobile
              ? active
                ? "w-full h-[500px]"
                : "w-full h-[350px]"
              : active
                ? "w-[600px] h-[350px]"
                : "w-[350px] h-[350px]"
            }
          `}
        >
          {/* ============ BACKGROUND MORPH (Circle to Square) ============ */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden rounded-[20px]">
            {/* This is the blue block that expands. Only visible when active */}
            <div
              className={`
                bg-blue-900/20 transition-all duration-700 ease-in-out
                ${active
                  ? "w-full h-full opacity-100"
                  : "w-0 h-0 opacity-0 rounded-full"
                }
              `}
            ></div>
          </div>

          {/* ============ THE "REACTOR" BUTTON (Visible when INACTIVE) ============ */}
          {/* This replaces the simple border circle */}
          <div
            className={`absolute flex justify-center items-center transition-all duration-500
             ${active ? "opacity-0 scale-0 rotate-180" : "opacity-100 scale-100 rotate-0"}
             `}
          >
            {/* 1. Outer Glow Blur */}
            <div className="absolute w-[280px] h-[280px] bg-blue-600/20 blur-[40px] rounded-full animate-pulse"></div>

            {/* 2. Spinning Tech Ring (Dashed) */}
            <div className="absolute w-[260px] h-[260px] border border-dashed border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>

            {/* 3. Counter-Spinning Inner Ring */}
            <div className="absolute w-[240px] h-[240px] border-t border-b border-blue-400/50 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>

            {/* 4. The Main Circle Button */}
            <div className="relative w-[220px] h-[220px] rounded-full bg-black/80 backdrop-blur-sm border-2 border-cyan-400/80 shadow-[0_0_30px_rgba(6,182,212,0.4)] flex flex-col justify-center items-center group hover:scale-105 transition-transform duration-300">

              {/* 3D Icon SVG */}
              <svg className="w-12 h-12 text-cyan-300 mb-2 drop-shadow-[0_0_8px_rgba(103,232,249,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>

              {/* Main Text */}
              <span className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 uppercase group-hover:from-white group-hover:to-cyan-300 transition-all">
                3D View
              </span>

              {/* Instruction Text (Changes based on device) */}
              <span className="text-[10px] uppercase tracking-[0.2em] text-blue-200/70 mt-1 animate-pulse">
                {isMobile ? "Tap to Enter" : "Hover to Enter"}
              </span>

            </div>
          </div>

          {/* ============ 3D MODEL CONTAINER (Visible when ACTIVE) ============ */}
          <div
            className={`
              absolute transition-all duration-700 ease-in-out z-40
              ${!active && "scale-0 rotate-[315deg]"}
              ${active &&
              (isMobile
                ? "top-[0%] left-1/2 -translate-x-1/2 scale-100"
                : "top-[50%] left-[70%] -translate-x-1/2 -translate-y-1/2 scale-100")
              }
            `}
          >
            <div
              className={`
                transition-all duration-900 pointer-events-none
                ${active
                  ? isMobile
                    ? "w-[250px] h-[250px]"
                    : "w-[500px] h-[500px]"
                  : "w-0 h-0"
                }
              `}
            >
              <OnexxatronModel />
            </div>
          </div>

          {/* ============ EXPANDED TEXT CONTENT ============ */}
          <div
            className={`
              absolute z-50 text-white transition-all duration-500 ease-in-out
              ${active
                ? "opacity-100 visible delay-[500ms]"
                : "opacity-0 invisible"
              }
              ${isMobile
                ? "bottom-4 left-0 w-full text-center px-6"
                : "left-8 w-[40%] top-1/2 -translate-y-1/2"
              }
            `}
          >
            <h2 className="text-3xl font-bold uppercase text-blue-400">
              Interactive
            </h2>
            <p className="text-xs text-gray-300 mt-2 mb-4 leading-relaxed">
              Explore our products in fully immersive 3D. Rotate, zoom, and
              interact to see every detail before you decide.
            </p>
          </div>
        </div>
      </div>

      {/* ================== RIGHT ENQUIRY FORM ================== */}
      <div className="relative w-full max-w-lg z-10 sm:mt-17 mt-10 ">



        <div className="relative rounded-xl p-7 bg-black backdrop-blur-md shadow-2xl mt-10 items-center justify-center sm:ml-[20vw] sm:mr-[-30vw]">

          <div className="absolute top-0 left-0 right-0 flex flex-col items-center pointer-events-none">

            {/* Glow Line */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"></div>

            {/* Glow Core (now BELOW the line, no upward blur) */}
            <div className="absolute top-[2px] w-[60%] h-[14px] bg-[#3B82F6] blur-[23px] rounded-full"></div>

            {/* Extended Downward Glow Spread */}
            <div className="w-[110%] h-[480px] bg-gradient-to-b
      from-[#3B82F6]/60  to-transparent
      blur-[80px] mt-6 transition-all duration-700"></div>

          
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          Enquiry Form
        </h2>

        <form className="space-y-3" onSubmit={handleSubmit} autoComplete="off">
          <input name="website" type="text" className="hidden" />

          {/* ROW 1: Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                className={getFieldStyle("name")}
                required
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                className={getFieldStyle("email")}
                required
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* ROW 2: Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">
                Mobile
              </label>
              <input
                name="phone"
                type="text"
                maxLength={10}
                className={getFieldStyle("phone")}
                required
                inputMode="numeric"
                pattern="[0-9]*"
                onFocus={() => handleFocus("phone")}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">
                City
              </label>
              <input
                name="city"
                type="text"
                className={getFieldStyle("city")}
                required
                onFocus={() => handleFocus("city")}
                onBlur={handleBlur}
              />
            </div>
          </div>

          {/* DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">
              Interest
            </label>
            <button
              type="button"
              onClick={() => {
                setDropdownOpen(!dropdownOpen);
                handleFocus("product");
              }}
              className={`${getFieldStyle(
                "product"
              )} text-left flex justify-between items-center text-sm`}
            >
              {selected || "Select Product"} <span className="text-cyan-400">▾</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute w-full mt-1 bg-[#0a192f] text-white border border-cyan-500/30 rounded-lg max-h-40 overflow-y-auto shadow-xl z-[60]">
                {products.map((p, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelected(p);
                      setDropdownOpen(false);
                      handleBlur();
                    }}
                    className="px-4 py-2 hover:bg-cyan-900/50 hover:text-cyan-200 cursor-pointer text-xs"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">
              Query
            </label>
            <textarea
              name="message"
              rows="2"
              className={getFieldStyle("message")}
              required
              onFocus={() => handleFocus("message")}
              onBlur={handleBlur}
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            {loading ? "Sending..." : "Submit Enquiry"}
          </button>
        </form>
        {/* LIGHT ASSEMBLY BOTTOM */}
        <div className="absolute left-0 right-0 flex flex-col items-center justify-center opacity-90 mt-4">

          <div className="absolute bottom-[-2px] w-1/2 h-[4px] bg-[#4AB3FF] blur-[10px] rounded-full"></div>
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#4AB3FF] to-transparent"></div>
        </div>
      </div>
    </div>

 

      {/* ================== STATUS POPUP ================== */ }
  {
    status.msg && (
      <div className="fixed inset-0 flex justify-center items-center z-[100] bg-black/80 backdrop-blur-sm">
        <div className="bg-[#0a192f] rounded-2xl p-6 max-w-sm text-center border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <p
            className={`mb-4 font-semibold ${status.ok ? "text-cyan-400" : "text-red-400"
              }`}
          >
            {status.msg}
          </p>
          <button
            onClick={() => setStatus({ ok: null, msg: "" })}
            className="bg-cyan-700/50 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 border border-cyan-500/30 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    )
  }
    </div >
  );
}