"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// ✅ CATEGORY COLOR MAP (THEME SYSTEM)
const categoryColors = {
  Development: "#4AB3FF",
  Design: "#FF4AED",
  Maintenance: "#22C55E",
  Marketing: "#FACC15",
  Support: "#A855F7",
  Sales: "#F97316",
};

const faqData = [
  {
    id: 1,
    question: "How long does it take to build a website?",
    answer:
      "The timeline depends on complexity. A standard informational site typically takes 2-4 weeks, while complex e-commerce apps can take 8-12 weeks.",
    category: "Development",
    author: "Tech Lead",
  },
  {
    id: 2,
    question: "Will my website be mobile-friendly?",
    answer:
      "Absolutely. We adopt a 'mobile-first' approach. Every website is fully responsive, ensuring it functions perfectly on smartphones, tablets, and desktops.",
    category: "Design",
    author: "UI Expert",
  },
  {
    id: 3,
    question: "Can I update the content myself?",
    answer:
      "Yes! We build on user-friendly CMS platforms like Next.js with Sanity or Shopify.",
    category: "Maintenance",
    author: "Project Mgr",
  },
  {
    id: 4,
    question: "Do you provide SEO services?",
    answer:
      "Standard on-page SEO is included. We optimize heading tags, meta descriptions, and site speed.",
    category: "Marketing",
    author: "SEO Spec",
  },
  {
    id: 5,
    question: "What happens after the site is launched?",
    answer:
      "We offer post-launch support packages that include security updates, bug fixes, and backups.",
    category: "Support",
    author: "DevOps",
  },
  {
    id: 6,
    question: "How much does a custom website cost?",
    answer:
      "Costs vary based on features. We provide transparent pricing after an initial discovery call.",
    category: "Sales",
    author: "Director",
  },
];

export default function FAQSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth >= 768 ? 3 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= faqData.length - itemsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? faqData.length - itemsToShow : prev - 1
    );
  };

  return (
    <div className="w-full bg-black text-white py-8 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Frequently <br /> Asked Questions
          </h2>

          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {faqData.map((faq) => {
              const themeColor = categoryColors[faq.category];

              return (
                <div
                  key={faq.id}
                  className="flex-shrink-0 px-2 box-border"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  {/* ✅ FIXED THEMED HOVER CARD */}
                  <div
                    className="group relative bg-[#111] p-6 rounded-xl h-full min-h-[320px]
                    flex flex-col justify-between border border-zinc-800 transition-all duration-300"
                    style={{ "--theme": themeColor }}
                  >
                    {/* ✅ BACKGROUND TINT (LOCKED TO THIS CARD ONLY) */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top, ${themeColor}22, transparent 60%)`,
                      }}
                    />

                    {/* ✅ CARD CONTENT */}
                    <div className="relative z-10">
                      <Quote
                        className="text-zinc-600 mb-4 
                        group-hover:text-[var(--theme)] transition-colors"
                        size={24}
                      />

                      <h3 className="text-lg font-bold mb-3 text-white leading-tight 
                      group-hover:text-[var(--theme)] transition-colors">
                        {faq.question}
                      </h3>

                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>

                    {/* ✅ FOOTER */}
                    <div
                      className="relative z-10 mt-6 pt-6 border-t border-zinc-800 
                      flex items-center gap-3 group-hover:border-[var(--theme)] transition-colors"
                    >
                      <div
                        className="w-7 h-7 rounded-full text-black flex items-center justify-center font-bold text-[10px]"
                        style={{ backgroundColor: themeColor }}
                      >
                        {faq.category.charAt(0)}
                      </div>
                      <div>
                        <p
                          className="text-sm font-semibold transition-colors"
                          style={{ color: themeColor }}
                        >
                          {faq.category}
                        </p>
                        <p className="text-xs text-zinc-500">{faq.author}</p>
                      </div>
                    </div>

                    {/* ✅ BORDER GLOW (PER CARD ONLY) */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow: `0 0 25px ${themeColor}55`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
