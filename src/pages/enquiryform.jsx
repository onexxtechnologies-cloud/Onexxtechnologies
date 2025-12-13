import React, { useState, useRef, useEffect } from "react";

export default function CombinedEnquiry3D() {
  const [focusedField, setFocusedField] = useState(null);
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: "" });
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [policyText, setPolicyText] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (showPrivacy) {
      fetch("/privacy_policy.txt")
        .then((res) => res.text())
        .then((txt) => setPolicyText(txt));
    }
  }, [showPrivacy]);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };
  // ✅ NEW: State to track screen size for box sizing
  const [isMobile, setIsMobile] = useState(false);

  const dropdownRef = useRef(null);
  const products = ["Website Development", "3D Model", "Application Development", "Others"];

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener("resize", checkMobile);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      bussinessname: form.get("bussinessname"),
      city: form.get("city"),
      product: selected,
      privacyPolicy: checked ? "User has agreed" : "User has not agreed",
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

  // ✅ CONFIG: Box Sizing Logic
  // Mobile: 5 columns (approx 20% width) -> Bigger Boxes
  // Desktop: 16 columns (approx 6.25% width) -> Smaller Boxes
  const columns = isMobile ? 5 : 16;
  const boxWidth = `calc(100% / ${columns} - 2px)`;
  const boxHeight = isMobile ? "calc(20vw - 2px)" : "calc(6.25vw - 2px)";

  return (
    <div className="relative flex flex-col w-full items-center justify-center min-h-screen px-4 gap-8 py-10 overflow-hidden bg-black">

      {/* ✅ MODIFIED: Changed 'sm:absolute' to 'absolute'. 
          This forces the grid to be a background on Mobile too, fixing the centering issue. */}
      <div className="absolute inset-0 flex z-0 overflow-hidden flex-wrap gap-[2px]">

        {/* The Flowing Blue Light Animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#00aaff] to-black animate-[rippleWave_6s_linear_infinite]" />

        {Array.from({ length: 260 }).map((_, i) => (
          <span
            key={i}
            className="block transition-all duration-[1500ms]"
            style={{
              width: boxWidth, // ✅ Using dynamic width based on screen size
              height: boxHeight,
              background: "#0a0a0a",
              zIndex: 1,
            }}
            onMouseEnter={(e) => {
              if (!isMobile) {
                e.currentTarget.style.background = "#00aaff";
                e.currentTarget.style.boxShadow = "0 0 15px #00aaff, 0 0 30px #00aaff";
                e.currentTarget.style.transition = "0s";
              }
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

      {/* ✅ FORM: Removed 'mt-[-10%]' to allow perfect centering via flexbox */}
      <div className="relative w-full max-w-lg z-10">
        <div className="relative rounded-xl p-7 bg-black/80 backdrop-blur-md shadow-2xl border border-white/5">

          <div className="absolute top-0 left-0 right-0 flex flex-col items-center pointer-events-none ">
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent"></div>
            <div className="absolute top-[2px] w-[60%] h-[14px] bg-[#3B82F6] blur-[23px] rounded-full"></div>
            <div className="w-[100%] h-[380px] bg-gradient-to-b from-[#3B82F6]/60 to-transparent blur-[80px] mt-6 transition-all duration-700"></div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
            Enquiry Form
          </h2>

          <form className="space-y-3" onSubmit={handleSubmit} autoComplete="off">
            <input name="website" type="text" className="hidden" />

            <input
              name="name"
              placeholder="Name"
              className={getFieldStyle("name")}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              required
            />

            <input
              name="phone"
              placeholder="Mobile"
              className={getFieldStyle("phone")}
              onFocus={() => handleFocus("phone")}
              onBlur={handleBlur}
              required
            />

            <input
              name="email"
              placeholder="Email"
              className={getFieldStyle("email")}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              required
            />

            <input
              name="city"
              placeholder="City"
              className={getFieldStyle("city")}
              onFocus={() => handleFocus("city")}
              onBlur={handleBlur}
              required
            />

            <input
              name="bussinessname"
              placeholder="Your Bussiness Type"
              className={getFieldStyle("bussinessname")}
              onFocus={() => handleFocus("bussinessname")}
              onBlur={handleBlur}
              required
            />

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={getFieldStyle("product") + " text-left"} // Added text-left for better alignment
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

            <textarea
              name="message"
              rows="2"
              placeholder="Message"
              className={getFieldStyle("message")}
              onFocus={() => handleFocus("message")}
              onBlur={handleBlur}
              required
            />
            <div className="flex justify-center items-center">
              <input type="checkbox" name="Privacy Policy" onClick={handleCheckboxChange} required />
              <label htmlFor="Privacy Policy" className="ml-[1%] ">I agree to the <button type="button" onClick={() => setShowPrivacy(true)} className="hover:cursor-pointer hover:text-gray-400 text-underline">Privacy Policy</button></label>
            </div>

            {showPrivacy && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-xl overflow-y-auto max-h-[80vh]">

                  {/* Header Row */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Privacy Policy</h2>

                    <button
                      onClick={() => setShowPrivacy(false)}
                      className="fixed top z-10 sm:ml-[65%] ml-[60%] bg-black text-white px-3 py-1 rounded-md hover:bg-gray-800"
                    >
                      Close
                    </button>
                  </div>

                  {/* Content */}
                  <pre className="whitespace-pre-wrap text-gray-800 mb-6">
                    {policyText}
                  </pre>

                </div>
              </div>

            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
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
          <div className="bg-[#0a192f] p-6 rounded-xl text-center border border-white/10 mx-4">
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