import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      id: "01",
      title: "UI/UX Design",
      description: "Designing responsive, aesthetically pleasing websites and mobile apps that align with user goals and deliver intuitive experiences.",
    },
    {
      id: "02",
      title: "Web Development",
      description: "Full-stack web services using modern frameworks (React, Vue, Node) to build robust, scalable, and fast-loading web applications.",
    },
    {
      id: "03",
      title: "Brand Identity",
      description: "Creating branding experiences that are both strategic and engaging, ensuring your visual identity stands out in the market.",
    },
    {
      id: "04",
      title: "3D Modeling",
      description: "High-quality 3D modeling and rendering for product visualization, gaming assets, and architectural walkthroughs.",
    },
    {
      id: "05",
      title: "Software Dev",
      description: "Custom software solutions tailored to your specific business needs, optimizing workflows and technical infrastructure.",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Separator */}
        <div className="mb-10 border-t border-zinc-800"></div>

        {/* Services List */}
        <div className="flex flex-col">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-zinc-800 hover:bg-zinc-900/30 transition-colors duration-300"
            >
              
              {/* Left Side: Number & Title */}
              <div className="flex items-center mb-6 md:mb-0">
                {/* Large Number */}
                <span className="text-6xl md:text-8xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors duration-300 mr-8 select-none">
                  {service.id}
                </span>
                
                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-200">
                  {service.title}
                </h2>
              </div>

              {/* Right Side: Description Only */}
              <div className="md:w-1/3 flex flex-col items-start md:items-end md:text-right">
                <p className="text-gray-400 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM BUTTONS SECTION - Centered */}
        <div className="mt-24 flex flex-col md:flex-row justify-center items-center gap-6">
            
            <button className="px-8 py-3 text-base font-bold uppercase tracking-widest border border-white bg-white text-black rounded-sm hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 transform hover:-translate-y-1">
              Show My Work
            </button>
        </div>

      </div>
    </div>
  );
};

export default ServicesSection;