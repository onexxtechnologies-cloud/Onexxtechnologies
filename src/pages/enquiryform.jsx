
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

  const dropdownRef = useRef(null);
  const products = ["Website Development", "3D Model", "Application Development", "Others"];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Premium Field Style
  const baseFieldStyle =
    "w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 outline-none text-white placeholder:text-gray-500 border border-white/10 bg-white/5 hover:bg-white/10 [&:not(:placeholder-shown)]:bg-white [&:not(:placeholder-shown)]:text-black [&:not(:placeholder-shown)]:border-white";

  const getFieldStyle = (fieldName) => {
    const isFocused = focusedField === fieldName;
    const isDropdownAndOpen = fieldName === "product" && dropdownOpen;
    return `${baseFieldStyle} ${isFocused || isDropdownAndOpen
      ? "bg-white/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] translate-y-[-1px] text-white"
      : ""
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
        setChecked(false);
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
    <div className="w-full h-full flex justify-center items-center p-2 sm:p-4">
      <div className="relative w-full max-w-2xl z-10">
        {/* Glass Container */}
        <div className="relative rounded-2xl p-6 sm:p-10 bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 mb-2">
              Start Project
            </h2>
            <p className="text-gray-400 text-sm">
              Fill out the form below and we will get back to you shortly.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
            <input name="website" type="text" className="hidden" />

            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <input
                  name="name"
                  placeholder="Name"
                  className={getFieldStyle("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
              <div className="relative group">
                <input
                  name="phone"
                  placeholder="Mobile Number"
                  className={getFieldStyle("phone")}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            {/* Row 2: Email & City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className={getFieldStyle("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
              <div className="relative group">
                <input
                  name="city"
                  placeholder="City"
                  className={getFieldStyle("city")}
                  onFocus={() => setFocusedField("city")}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            {/* Business Name */}
            <input
              name="bussinessname"
              placeholder="Business Name / Company"
              className={getFieldStyle("bussinessname")}
              onFocus={() => setFocusedField("bussinessname")}
              onBlur={() => setFocusedField(null)}
              required
            />

            {/* Product Selection */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`${getFieldStyle("product")} text-left flex justify-between items-center ${selected && !dropdownOpen ? "bg-white text-black border-white" : ""
                  }`}
              >
                <span className={selected && !dropdownOpen ? "text-black" : selected ? "text-white" : "text-gray-500"}>
                  {selected || "Select Service"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-cyan-400" : selected ? "text-black" : "text-gray-400"}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute w-full mt-2 bg-[#1a1a20] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  {products.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelected(p);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer text-sm transition-colors border-b border-white/5 last:border-0"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Message Area */}
            <textarea
              name="message"
              rows="3"
              placeholder="Tell us about your project..."
              className={getFieldStyle("message")}
              onFocus={() => setFocusedField("message")}
              onBlur={() => setFocusedField(null)}
              required
            />

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start gap-3 mt-2">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={checked}
                  onChange={handleCheckboxChange}
                  required
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-white/5 transition-all checked:border-cyan-500 checked:bg-cyan-500 hover:border-white/40"
                />
                <svg
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <label htmlFor="privacy" className="text-xs text-gray-400 cursor-pointer select-none pt-0.5">
                I agree to the <button type="button" onClick={() => setShowPrivacy(true)} className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">Privacy Policy</button>
              </label>
            </div>

            {/* Privacy Modal */}
            {showPrivacy && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                <div className="bg-[#111] border border-white/10 p-6 md:p-8 rounded-2xl w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white">Privacy Policy</h2>
                    <button
                      onClick={() => setShowPrivacy(false)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
                    <pre className="whitespace-pre-wrap text-gray-400 font-sans text-sm leading-relaxed">
                      {policyText || "Loading policy..."}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-[length:200%_100%] text-white font-bold tracking-wide hover:bg-right transition-[background-position] duration-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    SUBMIT ENQUIRY
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

        </div>
      </div>

      {status.msg && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 z-[200] backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1a1a20] p-8 rounded-2xl text-center border border-white/10 mx-4 max-w-sm shadow-2xl">
            <div className={`mb-4 inline-flex p-3 rounded-full ${status.ok ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {status.ok ? (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              )}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${status.ok ? "text-white" : "text-white"}`}>{status.ok ? "Success!" : "Error"}</h3>
            <p className="text-gray-400 mb-6">{status.msg}</p>
            <button onClick={() => setStatus({ ok: null, msg: "" })} className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}