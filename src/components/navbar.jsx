import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Navbar = ({ onSearch, searchQuery, setCurrentPage }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#050505]/80 via-[#0a0118]/80 to-[#050505]/80 backdrop-blur-xl px-6 py-4 relative">
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* ✅ Branding (FIXED) */}
        <Link
          to="/"
          className="group cursor-pointer"
          onClick={() => {
            onSearch(""); // reset search
            setCurrentPage(1); // reset page
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
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

        {/* ✅ Controlled Search */}
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 w-[18px] h-[18px] text-gray-400 pointer-events-none" />

          <input
            type="text"
            value={searchQuery} // ✅ IMPORTANT
            placeholder="Search crypto..."
            onChange={(e) => {
              onSearch(e.target.value);
              setCurrentPage(1); // reset page on typing
            }}
            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl py-2.5 pl-11 pr-4 outline-none 
            focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/50 
            transition-all backdrop-blur-md placeholder:text-gray-500"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
