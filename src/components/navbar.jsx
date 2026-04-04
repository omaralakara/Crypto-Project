import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = ({ onSearch }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#050505]/80 via-[#0a0118]/80 to-[#050505]/80 backdrop-blur-xl px-6 py-4 relative">
      {/* 🔥 Colored glow overlay (removes gray feel) */}
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-transparent to-cyan-500/10 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Branding */}
        <Link
          to="/"
          className="group"
          onClick={() => {
            onSearch(""); // ✅ clear search
            window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ go to top
          }}
        >
          {" "}
          <h1 className="text-2xl font-black tracking-tighter text-white flex items-center gap-1">
            BLOCKS
            <span className="text-fuchsia-500 text-3xl group-hover:text-cyan-400 transition-colors">
              .
            </span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 group-hover:text-fuchsia-400 transition-colors">
            Digital Asset Intelligence
          </p>
          <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-all duration-300"></div>
        </Link>

        {/* Search */}
        <div className="relative w-full md:w-96 group">
          {/* Glow */}
          <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition duration-300"></div>

          <div className="relative flex items-center">
            {/* ✅ FIXED ICON */}
            <Search className="absolute left-3 w-[18px] h-[18px] text-gray-400 pointer-events-none" />

            <input
              type="text"
              placeholder="Search crypto..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl py-2.5 pl-11 pr-4 outline-none 
              focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 
              transition-all backdrop-blur-md placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
