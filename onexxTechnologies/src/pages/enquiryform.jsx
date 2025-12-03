import React, { useState, useRef, useEffect } from "react";

export default function CenteredEnquiryForm() {
    const [focusedField, setFocusedField] = useState(null);
    const [selected, setSelected] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ ok: null, msg: "" });

    const dropdownRef = useRef(null);

    const products = [
        "Website Development",
        "3D Model",
        "Software Development",

    ];

    // CLOSE DROPDOWN WHEN CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // FIELD STYLING
    // FIELD STYLING
    const baseFieldStyle =
        "w-full border rounded-lg px-4 py-2 transition-colors duration-200 focus:outline-none text-black placeholder:text-black-500";
    const handleFocus = (fieldName) => setFocusedField(fieldName);
    const handleBlur = () => setFocusedField(null);

    const getFieldStyle = (fieldName) => {
        const isFocused = focusedField === fieldName;
        const isDropdownAndOpen = fieldName === "product" && dropdownOpen;
        return `${baseFieldStyle} ${isFocused || isDropdownAndOpen ? "bg-white" : "bg-gray-100/70"}`;
    };

    // SUBMIT LOGIC (FULL)
    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ ok: null, msg: "" });

        const form = new FormData(e.currentTarget);

        // HONEYPOT (spam trap)
        if ((form.get("website") || "").trim() !== "") {
            setStatus({ ok: true, msg: "Thanks!" });
            return;
        }

        const phone = form.get("phone").replace(/\D/g, "");
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

    return (
        <div className="min-h-screen flex items-center justify-center p-4">

            <div className="w-full max-w-lg rounded-2xl p-6 md:p-8 bg-[rgba(30,64,175,0.15)] backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">

                <h2 className="text-3xl font-bold mb-6 text-center text-white">Enquiry Form</h2>

                <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                    <input name="website" type="text" className="hidden" />

                    {/* NAME */}
                    <div>
                        <label className="block text-sm font-medium text-white">Name</label>
                        <input
                            name="name"
                            type="text"
                            className={getFieldStyle("name")}
                            required
                            onFocus={() => handleFocus("name")}
                            onBlur={handleBlur}
                        />
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="block text-sm font-medium text-white">Email</label>
                        <input
                            name="email"
                            type="email"
                            className={getFieldStyle("email")}
                            required
                            onFocus={() => handleFocus("email")}
                            onBlur={handleBlur}
                        />
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="block text-sm font-medium text-white">Mobile Number</label>
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

                    {/* CITY */}
                    <div>
                        <label className="block text-sm font-medium text-white">City</label>
                        <input
                            name="city"
                            type="text"
                            className={getFieldStyle("city")}
                            required
                            onFocus={() => handleFocus("city")}
                            onBlur={handleBlur}
                        />
                    </div>

                    {/* PRODUCT DROPDOWN */}
                    <div className="relative" ref={dropdownRef}>
                        <label className="block text-sm font-medium text-white">Select Product</label>
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
                            <ul className="absolute w-full mt-1 bg-white text-black border border-gray-300 rounded-lg max-h-40 overflow-y-auto shadow-xl z-10">
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

                    {/* MESSAGE */}
                    <div>
                        <label className="block text-sm font-medium text-white">Your Query</label>
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
                        className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
                    >
                        {loading ? "Sending..." : "Submit"}
                    </button>
                </form>
            </div>

            {/* POPUP */}
            {status.msg && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-sm text-center border-2 border-green-600 shadow-xl">
                        <p className={`mb-4 ${status.ok ? "text-green-700" : "text-red-600"}`}>
                            {status.msg}
                        </p>

                        <button
                            onClick={() => setStatus({ ok: null, msg: "" })}
                            className="bg-green-600 text-white px-6 py-2 mt-4 rounded-lg"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
