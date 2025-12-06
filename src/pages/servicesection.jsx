// src/components/ServicesSection.jsx (or wherever your file is located)
import React, { useState } from 'react';
import bgImage from "../assets/servicebackground.jpg"; // <-- your background image
import PortfolioModal from './PortfolioModal'; // <-- IMPORT THE MODAL COMPONENT

const ServicesSection = () => {
  // 1. STATE TO MANAGE MODAL VISIBILITY
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const services = [
    {
      id: "01",
      title: "UI/UX Design",
      description:
        "Designing responsive, aesthetically pleasing websites and mobile apps that align with user goals and deliver intuitive experiences.",
    },
    {
      id: "02",
      title: "Web Development",
      description:
        "Full-stack web services using modern frameworks (React, Vue, Node) to build robust, scalable, and fast-loading web applications.",
    },
    {
      id: "03",
      title: "Brand Identity",
      description:
        "Creating branding experiences that are both strategic and engaging, ensuring your visual identity stands out in the market.",
    },
    {
      id: "04",
      title: "3D Modeling",
      description:
        "High-quality 3D modeling and rendering for product visualization, gaming assets, and architectural walkthroughs.",
    },
    {
      id: "05",
      title: "Application Dev",
      description:
        "Custom software solutions tailored to your specific business needs, optimizing workflows and technical infrastructure.",
    },
  ];

  return (
    <div
      className="min-h-screen text-white py-20 px-6 font-sans bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Top Separator */}
        <div className="mb-10 border-t border-zinc-800"></div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-zinc-800 hover:bg-white/5 transition-colors duration-300"
            >
              {/* Left Side: Number & Title */}
              <div className="flex items-center mb-6 md:mb-0">
                <span className="text-6xl md:text-8xl font-bold text-zinc-600 group-hover:text-blue-400 transition duration-300 mr-8 select-none">
                  {service.id}
                </span>

                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-200">
                  {service.title}
                </h2>
              </div>

              {/* Right Side */}
              <div className="md:w-1/3 flex flex-col items-start md:items-end md:text-right">
                <p className="text-zinc-400 group-hover:text-blue-300 transition-colors duration-300 mr-8 select-none text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-24 flex justify-center">
          {/* 3. ATTACH ONCLICK HANDLER TO BUTTON */}
          <button 
            onClick={handleOpenModal}
            className="px-8 py-3 text-base font-bold uppercase tracking-widest border border-white bg-white text-black rounded-sm hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 transform hover:-translate-y-1"
          >
            Show My Work
          </button>
        </div>
      </div>

      {/* 2. RENDER THE MODAL COMPONENT */}
      <PortfolioModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default ServicesSection;