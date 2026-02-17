
import { Helmet } from "react-helmet";
import CenteredEnquiryForm from "./enquiryform.jsx";
import OnexxLogo from "../assets/ONEXX.png";

const ContactPage = () => {
    return (
        <>
            <Helmet>
                <title>Contact Us - Onexx Technologies</title>
                <meta
                    name="description"
                    content="Get in touch with Onexx Technologies for custom website, app, and 3D model development."
                />
            </Helmet>

            {/* Main Container */}
            <div className="min-h-screen bg-black text-white pt-24 pb-10 flex flex-col lg:flex-row items-center justify-center overflow-x-hidden">

                {/* Style for Animations */}
                <style>
                    {`
            @keyframes float {
              0% { transform: translateY(0px) rotate(0deg); filter: drop-shadow(0 0 15px rgba(0,180,255,0.4)); }
              50% { transform: translateY(-20px) rotate(3deg); filter: drop-shadow(0 0 30px rgba(0,180,255,0.7)); }
              100% { transform: translateY(0px) rotate(0deg); filter: drop-shadow(0 0 15px rgba(0,180,255,0.4)); }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.5; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.1); }
            }
          `}
                </style>

                {/* LEFT SIDE: Animated Image/Content */}
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 relative z-10">

                    {/* Background decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] -z-10" />

                    <div className="relative group">
                        <img
                            src={OnexxLogo}
                            alt="Onexx Technologies"
                            className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-contain animate-[float_6s_ease-in-out_infinite]"
                            style={{ willChange: "transform, filter" }}
                        />
                        {/* Interactive Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full pointer-events-none" />
                    </div>

                    <div className="mt-10 text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-gray-400">
                            Let's Build Future
                        </h1>
                        <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
                            Have an idea? We have the tech. <br />
                            Reach out and let's craft something extraordinary.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: Form */}
                <div className="w-full lg:w-1/2 flex justify-center items-center p-4 lg:p-10 z-10">
                    <CenteredEnquiryForm />
                </div>

            </div>
        </>
    );
};

export default ContactPage;
