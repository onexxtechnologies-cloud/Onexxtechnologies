import React, { useState, useRef, useEffect } from "react";
import OnexxatronModel from "./3dmodel";

export default function CombinedEnquiry3D() {
  // ============ FORM STATES ============
  const [focusedField, setFocusedField] = useState(null);
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: "" });

  const dropdownRef = useRef(null);
  const products = ["Website Development", "3D Model", "Software Development"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseFieldStyle =
    "w-full border rounded-lg px-4 py-2 transition-colors duration-200 focus:outline-none text-black placeholder:text-black-500";
  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);
  const getFieldStyle = (fieldName) => {
    const isFocused = focusedField === fieldName;
    const isDropdownAndOpen = fieldName === "product" && dropdownOpen;
    return `${baseFieldStyle} ${
      isFocused || isDropdownAndOpen ? "bg-white" : "bg-gray-100/70"
    }`;
  };

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

      const res = await fetch("../../api/sendemail.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({ ok: true, msg: "Your enquiry has been sent successfully!" });
        e.target.reset();
        setSelected("");
      } else {
        setStatus({ ok: false, msg: "Failed to send enquiry. Try again later." });
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
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : true);

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
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-black px-4 md:px-20 gap-8 py-10">

      {/* ================== LEFT 3D CARD ================== */}
      <div
        onClick={handleClick}
        onMouseEnter={() => !isMobile && setActive(true)}
        onMouseLeave={() => !isMobile && setActive(false)}
        className={`
          relative bg-black rounded-[20px] overflow-hidden cursor-pointer 
          transition-all duration-700 ease-in-out flex justify-center items-center
          ${isMobile
            ? active
              ? "w-full max-w-[350px] h-[600px]"
              : "w-full max-w-[350px] h-[350px]"
            : active
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

        {/* 3D MODEL */}
        <div
          className={`
            absolute transition-all duration-700 ease-in-out z-40
            ${!active && "scale-0 rotate-[315deg]"}
            ${active &&
              (isMobile
                ? "top-[10%] left-1/2 -translate-x-1/2 -translate-y-[20%] scale-100 "
                : "top-[70%] left-[60%] -translate-x-1/2 -translate-y-1/2 scale-100 "
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
            ${active ? "opacity-100 visible delay-[700ms]" : "opacity-0 invisible"}
            ${isMobile
              ? "bottom-8 left-0 w-full text-center px-6 translate-y-0"
              : "left-6 w-1/2 top-1/2 -translate-y-1/2"
            }
          `}
        >
          <h2 className="text-4xl font-bold uppercase">3D Model</h2>
          <p className="text-sm mt-2 mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <button className="px-5 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-200">
            Export More
          </button>
        </div>
      </div>

      {/* ================== RIGHT ENQUIRY FORM ================== */}
      <div className="relative w-full max-w-lg">
        {/* Outer border wrapper */}
        <div className="rounded-2xl p-1 border-2 border-white/10">
          {/* Inner form content box */}
          <div className="relative rounded-xl p-6 md:p-8 bg-[#03030b] backdrop-blur-xl transition-all duration-100 overflow-hidden">

            {/* Aurora / blobs */}
            <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <div style={{ filter: "blur(80px)" }} className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full">
                <div className="w-full h-full rounded-full" style={{ background: "rgba(168,85,247,0.25)", animation: "blob1 10s ease-in-out infinite" }} />
              </div>
              <div style={{ filter: "blur(80px)" }} className="absolute -bottom-[20%] -right-[20%] w-[70%] h-[70%] rounded-full">
                <div className="w-full h-full rounded-full" style={{ background: "rgba(59,130,246,0.25)", animation: "blob2 12s ease-in-out infinite" }} />
              </div>
              <div style={{ filter: "blur(60px)" }} className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full">
                <div className="w-full h-full rounded-full" style={{ background: "rgba(16,185,129,0.18)", animation: "blob3 8s ease-in-out infinite" }} />
              </div>
            </div>

            <style>{`
              @keyframes blob1 {0% { transform: translate(0px,0px) scale(1); opacity:0.6; }50% { transform: translate(100px,-50px) scale(1.2); opacity:0.9; }100% { transform: translate(0px,0px) scale(1); opacity:0.6; }}
              @keyframes blob2 {0% { transform: translate(0px,0px) scale(1); opacity:0.5; }50% { transform: translate(-80px,60px) scale(1.3); opacity:0.85; }100% { transform: translate(0px,0px) scale(1); opacity:0.5; }}
              @keyframes blob3 {0% { transform: translate(0px,0px) scale(1); opacity:0.3; }50% { transform: translate(40px,40px) scale(1.15); opacity:0.6; }100% { transform: translate(0px,0px) scale(1); opacity:0.3; }}
            `}</style>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-center text-white">Enquiry Form</h2>

              <form className="space-y-2" onSubmit={handleSubmit} autoComplete="off">
                <input name="website" type="text" className="hidden" />

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Name</label>
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
                  <label className="block text-sm font-medium text-white mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    className={getFieldStyle("email")}
                    required
                    onFocus={() => handleFocus("email")}
                    onBlur={handleBlur}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Mobile Number</label>
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
                  <label className="block text-sm font-medium text-white mb-1">City</label>
                  <input
                    name="city"
                    type="text"
                    className={getFieldStyle("city")}
                    required
                    onFocus={() => handleFocus("city")}
                    onBlur={handleBlur}
                  />
                </div>

                <div className="relative" ref={dropdownRef}>
                  <label className="block text-sm font-medium text-white mb-1">Select Product</label>
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      handleFocus("product");
                    }}
                    className={`${getFieldStyle("product")} text-left flex justify-between items-center`}
                  >
                    {selected || "Select Product"} <span>▾</span>
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute w-full mt-1 bg-white text-black border border-gray-300 rounded-lg max-h-40 overflow-y-auto shadow-xl z-50">
                      {products.map((p, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setSelected(p);
                            setDropdownOpen(false);
                            handleBlur();
                          }}
                          className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Your Query</label>
                  <textarea
                    name="message"
                    rows="3"
                    className={getFieldStyle("message")}
                    required
                    onFocus={() => handleFocus("message")}
                    onBlur={handleBlur}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ================== STATUS POPUP ================== */}
      {status.msg && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm text-center border-2 border-green-600 shadow-2xl">
            <p className={`mb-4 font-semibold ${status.ok ? "text-green-700" : "text-red-600"}`}>
              {status.msg}
            </p>
            <button
              onClick={() => setStatus({ ok: null, msg: "" })}
              className="bg-green-600 text-white px-6 py-2 mt-4 rounded-lg hover:bg-green-700"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
