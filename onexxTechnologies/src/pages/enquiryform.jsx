import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

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
        // MAIN CONTAINER: 
        // 'justify-center' for mobile (default)
        // 'md:justify-end' for laptop (pushes form to right)
        // 'md:pr-24' adds spacing from the right edge on laptop
        <div className="min-h-screen flex w-[100%] sm:w-[50%] items-center justify-center md:justify-end p-4 md:pr-24 bg-#03030b mt-[-5%]">

            <div className="relative w-full max-w-lg rounded-2xl p-6 md:p-8 
                bg-#03030b
                backdrop-blur-xl transition-all duration-100 border border-white/10 
                shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] overflow-hidden">

                {/* --- START AURORA BACKGROUND --- */}
                {/* Reverted to filling the card ('as it was'), but kept volatile colors */}
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    {/* Blob 1: Shifting Purple/Pink */}
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1],
                            backgroundColor: ["rgba(168, 85, 247, 0.4)", "rgba(236, 72, 153, 0.4)", "rgba(168, 85, 247, 0.4)"]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full blur-[80px]"
                    />

                    {/* Blob 2: Shifting Cyan/Blue */}
                    <motion.div
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 60, 0],
                            scale: [1, 1.3, 1],
                            backgroundColor: ["rgba(6, 182, 212, 0.4)", "rgba(59, 130, 246, 0.5)", "rgba(6, 182, 212, 0.4)"]
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="absolute -bottom-[20%] -right-[20%] w-[70%] h-[70%] rounded-full blur-[80px]"
                    />

                    {/* Blob 3: Intense Emerald/Teal */}
                    <motion.div
                        animate={{
                            x: [0, 40, 0],
                            y: [0, 40, 0],
                            opacity: [0.3, 0.6, 0.3],
                            backgroundColor: ["rgba(16, 185, 129, 0.3)", "rgba(20, 184, 166, 0.5)", "rgba(16, 185, 129, 0.3)"]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        className="absolute top-[30%] left-[30%] w-[40%] h-[40%] rounded-full blur-[60px]"
                    />
                </div>
                {/* --- END AURORA BACKGROUND --- */}


                {/* CONTENT WRAPPER */}
                <div className="relative z-10 ">
                    <h2 className="text-3xl font-bold mb-4 text-center text-white">Enquiry Form</h2>

                    <form className="space-y-2" onSubmit={handleSubmit} autoComplete="off">
                        <input name="website" type="text" className="hidden" />

                        {/* NAME */}
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

                        {/* EMAIL */}
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

                        {/* PHONE */}
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

                        {/* CITY */}
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

                        {/* PRODUCT DROPDOWN */}
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

                        {/* MESSAGE */}
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

            {/* POPUP */}
            {
                status.msg && (
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
                )
            }
        </div >
    );
}