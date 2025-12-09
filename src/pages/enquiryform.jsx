import React, { useState, useRef, useEffect } from "react";

export default function CombinedEnquiry3D() {
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
      setStatus({ ok: false, msg: "Server error! Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    // ✅ ONLY CHANGE IS HERE: px-0
    <div className="relative flex flex-col w-full items-center justify-center md:flex-row min-h-screen px-0 gap-8 py-10 overflow-hidden bg-black ">

      {/* ✅ RIPPLE BACKGROUND (LAPTOP ONLY) */}
      <div className="absolute inset-0 hidden md:flex z-0 overflow-hidden flex-wrap gap-[2px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#00aaff] to-black animate-[rippleWave_6s_linear_infinite]" />

        {Array.from({ length: 260 }).map((_, i) => (
          <span
            key={i}
            className="block transition-all duration-[1500ms]"
            style={{
              width: "calc(100% / 16 - 2px)",

              height: "calc(6.25vw - 2px)",
              background: "#0a0a0a",
              zIndex: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00aaff";
              e.currentTarget.style.boxShadow = "0 0 15px #00aaff, 0 0 30px #00aaff";
              e.currentTarget.style.transition = "0s";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#0a0a0a";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transition = "1.5s";
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes rippleWave {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>

      {/* ✅ FORM (UNCHANGED WITH LIGHT) */}
      <div className="relative w-full max-w-lg z-10 sm:mt-0 mt-[-10%]">
        <div className="relative rounded-xl p-7 bg-black backdrop-blur-md shadow-2xl">

          <div className="absolute top-0 left-0 right-0 flex flex-col items-center pointer-events-none">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"></div>
            <div className="absolute top-[2px] w-[60%] h-[14px] bg-[#3B82F6] blur-[23px] rounded-full"></div>
            <div className="w-[100%] h-[380px] bg-gradient-to-b from-[#3B82F6]/60 to-transparent blur-[80px] mt-6 transition-all duration-700"></div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            Enquiry Form
          </h2>

         <form className="space-y-3" onSubmit={handleSubmit} autoComplete="off">
  <input name="website" type="text" className="hidden" />

  {/* NAME FULL ROW */}
  <input
    name="name"
    placeholder="Name"
    className={getFieldStyle("name")}
    onFocus={() => handleFocus("name")}
    onBlur={handleBlur}
    required
  />

  {/* MOBILE FULL ROW */}
  <input
    name="phone"
    placeholder="Mobile"
    className={getFieldStyle("phone")}
    onFocus={() => handleFocus("phone")}
    onBlur={handleBlur}
    required
  />

  {/* EMAIL FULL ROW */}
  <input
    name="email"
    placeholder="Email"
    className={getFieldStyle("email")}
    onFocus={() => handleFocus("email")}
    onBlur={handleBlur}
    required
  />

  {/* CITY FULL ROW */}
  <input
    name="city"
    placeholder="City"
    className={getFieldStyle("city")}
    onFocus={() => handleFocus("city")}
    onBlur={handleBlur}
    required
  />

  {/* PRODUCT DROPDOWN */}
  <div className="relative" ref={dropdownRef}>
    <button
      type="button"
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className={getFieldStyle("product")}
    >
      {selected || "Select Product"}
    </button>

    {dropdownOpen && (
      <ul className="absolute w-full mt-1 bg-[#0a192f] text-white border border-cyan-500/30 rounded-lg shadow-xl z-50">
        {products.map((p, idx) => (
          <li
            key={idx}
            onClick={() => {
              setSelected(p);
              setDropdownOpen(false);
            }}
            className="px-4 py-2 hover:bg-cyan-900/50 cursor-pointer text-xs"
          >
            {p}
          </li>
        ))}
      </ul>
    )}
  </div>

  {/* MESSAGE */}
  <textarea
    name="message"
    rows="2"
    placeholder="Message"
    className={getFieldStyle("message")}
    onFocus={() => handleFocus("message")}
    onBlur={handleBlur}
    required
  />

  {/* SUBMIT BUTTON */}
  <button
    type="submit"
    disabled={loading}
    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm"
  >
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
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-[100]">
          <div className="bg-[#0a192f] p-6 rounded-xl text-center">
            <p className={status.ok ? "text-cyan-400" : "text-red-400"}>{status.msg}</p>
            <button onClick={() => setStatus({ ok: null, msg: "" })} className="mt-4 px-6 py-2 bg-cyan-700 text-white rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
