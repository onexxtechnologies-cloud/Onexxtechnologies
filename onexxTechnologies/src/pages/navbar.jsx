export default function Navbar() { 
  return (
    <header className="w-full flex justify-center py-4 bg-transparent">
      <div
        className="
          w-[50%] px-10 py-4 h-[60px]
          rounded-full flex items-center justify-between
          bg-white/5 backdrop-blur-xl
          transition-all
          shadow-[0_0_25px_rgba(0,0,255,0.0)]
          hover:shadow-[0_0_35px_rgba(80,120,255,0.7)]
        "
      >
        {/* Logo */}
        <div className="text-white text-2xl font-bold tracking-wider">
          OP+UNE
        </div>

        <nav className="flex items-center text-white text-[20px] font-medium gap-4">

          <a href="#" className="hover:text-blue-300 transition px-3 py-2">
            Home
          </a>

          <div className="w-px h-5 bg-white/20"></div>

          <a href="#" className="hover:text-blue-300 transition px-3">
            About
          </a>

          <div className="w-px h-5 bg-white/20"></div>

          <a href="#" className="hover:text-blue-300 transition px-3">
            Work
          </a>

          <div className="w-px h-5 bg-white/20"></div>

          <div className="relative group cursor-pointer px-3">
            <span className="flex items-center gap-1 hover:text-blue-300 transition">
              Pages ▼
            </span>

            <div
              className="
                absolute left-0 mt-3 hidden group-hover:block
                bg-white/10 backdrop-blur-xl
                rounded-xl shadow-xl
                min-w-[160px] py-2
              "
            >
              <a href="#" className="block px-4 py-2 hover:bg-white/10 text-white">
                Page 1
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-white/10 text-white">
                Page 2
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-white/10 text-white">
                Page 3
              </a>
            </div>
          </div>

        </nav>

        {/* Button */}
        <button
          className="
            px-6 py-2 rounded-full font-semibold text-white
            bg-gradient-to-r from-[#4AB3FF] to-[#1E6BFF]
            shadow-[0_0_20px_rgba(0,102,255,0.35)]
            hover:shadow-[0_0_30px_rgba(80,150,255,0.9)]
            transition
          "
        >
          LET'S CONNECT
        </button>

      </div>
    </header>
  );
}
