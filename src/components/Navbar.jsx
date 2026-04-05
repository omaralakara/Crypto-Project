import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = ({ onSearch, searchQuery, setCurrentPage }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl px-4 py-3 md:px-8">
      {/* Container: Stacks on mobile, row on desktop */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* ✅ Branding - centered on mobile, left-aligned on desktop */}
        <Link
          to="/"
          className="group cursor-pointer flex flex-col items-center md:items-start"
          onClick={() => {
            onSearch("");
            setCurrentPage(1);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <h1 className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-1 leading-none">
            BLOCKS
            <span className="text-fuchsia-500 text-2xl group-hover:text-cyan-400 transition-colors">
              .
            </span>
          </h1>

          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-fuchsia-400 transition-colors">
            Digital Asset Intelligence
          </p>

          {/* Animated line - hidden on mobile to save space, or kept for flair */}
          <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-all duration-300"></div>
        </Link>

        {/* ✅ Search Input - Full width on mobile */}
        <div className="relative w-full md:w-80 lg:w-96 group flex items-center">
          {/* Centered Icon using flex/absolute combo */}
          <div className="absolute left-4 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-500 group-focus-within:text-fuchsia-500 transition-colors" />
          </div>

          <input
            type="text"
            value={searchQuery}
            placeholder="Search crypto..."
            onChange={(e) => {
              onSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-2xl py-2.5 pl-12 pr-4 outline-none 
            focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 
            transition-all backdrop-blur-md placeholder:text-gray-600"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
