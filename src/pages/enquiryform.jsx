import React, { useState, useRef, useEffect, Suspense } from "react";
// 1. IMPORT CANVAS TOOLS
import { Canvas } from "@react-three/fiber"; 
import { OrbitControls, Environment } from "@react-three/drei";

// 2. IMPORT YOUR MODEL
import OnexxatronModel from "./3dmodel"; 

export default function CombinedEnquiry3D() {
  // ... [Keep your existing Form States and useEffects exactly as they are] ...
  const [focusedField, setFocusedField] = useState(null);
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: "" });
  const dropdownRef = useRef(null);
  const products = ["Website Development", "3D Model", "Applicaion Development", "Others"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const baseFieldStyle = "w-full rounded-lg px-3 py-2 text-sm transition-colors duration-200 focus:outline-none text-white placeholder:text-gray-500 border border-white/10";
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

  // ... [Keep 3D Box States] ...
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

  return (
    <div className="flex flex-col w-full items-center justify-center md:flex-row min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0a192f] via-[#03030b] to-[#000000] px-4 md:px-10 gap-8 py-10 overflow-hidden sm:mt-[-2%] mt-[10%]">


      {/* ================== RIGHT ENQUIRY FORM (Kept exactly as yours) ================== */}
      <div className="relative w-full max-w-lg z-10 sm:mt-17 mt-10 ">
         <div className="relative rounded-xl p-7 bg-black backdrop-blur-md shadow-2xl mt-10 items-center justify-center ">
           <div className="absolute top-0 left-0 right-0 flex flex-col items-center pointer-events-none">
             <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"></div>
             <div className="absolute top-[2px] w-[60%] h-[14px] bg-[#3B82F6] blur-[23px] rounded-full"></div>
             <div className="w-[110%] h-[480px] bg-gradient-to-b from-[#3B82F6]/60 to-transparent blur-[80px] mt-6 transition-all duration-700"></div>
           </div>
           <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Enquiry Form</h2>
           <form className="space-y-3" onSubmit={handleSubmit} autoComplete="off">
              {/* ... (Your existing form inputs here) ... */}
              <input name="website" type="text" className="hidden" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 <div>
                   <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">Name</label>
                   <input name="name" type="text" className={getFieldStyle("name")} required onFocus={() => handleFocus("name")} onBlur={handleBlur} />
                 </div>
                 <div>
                   <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">Email</label>
                   <input name="email" type="email" className={getFieldStyle("email")} required onFocus={() => handleFocus("email")} onBlur={handleBlur} />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 <div>
                   <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">Mobile</label>
                   <input name="phone" type="text" maxLength={10} className={getFieldStyle("phone")} required inputMode="numeric" pattern="[0-9]*" onFocus={() => handleFocus("phone")} onBlur={handleBlur} />
                 </div>
                 <div>
                   <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">City</label>
                   <input name="city" type="text" className={getFieldStyle("city")} required onFocus={() => handleFocus("city")} onBlur={handleBlur} />
                 </div>
              </div>
              <div className="relative" ref={dropdownRef}>
                <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">Interest</label>
                <button type="button" onClick={() => { setDropdownOpen(!dropdownOpen); handleFocus("product"); }} className={`${getFieldStyle("product")} text-left flex justify-between items-center text-sm`}>
                  {selected || "Select Product"} <span className="text-cyan-400">▾</span>
                </button>
                {dropdownOpen && (
                  <ul className="absolute w-full mt-1 bg-[#0a192f] text-white border border-cyan-500/30 rounded-lg max-h-40 overflow-y-auto shadow-xl z-[60]">
                    {products.map((p, idx) => (
                      <li key={idx} onClick={() => { setSelected(p); setDropdownOpen(false); handleBlur(); }} className="px-4 py-2 hover:bg-cyan-900/50 hover:text-cyan-200 cursor-pointer text-xs">{p}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-white mb-1 ml-1">Query</label>
                <textarea name="message" rows="2" className={getFieldStyle("message")} required onFocus={() => handleFocus("message")} onBlur={handleBlur}></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full py-2.5 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm hover:from-blue-500 hover:to-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                {loading ? "Sending..." : "Submit Enquiry"}
              </button>
           </form>
           <div className="absolute left-0 right-0 flex flex-col items-center justify-center opacity-90 mt-4">
             <div className="absolute bottom-[-2px] w-1/2 h-[4px] bg-[#4AB3FF] blur-[10px] rounded-full"></div>
             <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#4AB3FF] to-transparent"></div>
           </div>
         </div>
      </div>

      {status.msg && (
        <div className="fixed inset-0 flex justify-center items-center z-[100] bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] rounded-2xl p-6 max-w-sm text-center border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <p className={`mb-4 font-semibold ${status.ok ? "text-cyan-400" : "text-red-400"}`}>{status.msg}</p>
            <button onClick={() => setStatus({ ok: null, msg: "" })} className="bg-cyan-700/50 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 border border-cyan-500/30 text-sm">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}