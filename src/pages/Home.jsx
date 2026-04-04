import { useState, useEffect } from "react";
import { getCoinMarkets } from "../api/CoinGecko"; // Import your new service
import CryptoCard from "../components/CryptoCard";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [coins, setCoins] = useState([]); //20 to be displayed
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState(null); // Track errors
  const [currentPage, setCurrentPage] = useState(1); // Track the page
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [sortBy, setSortBy] = useState("market_cap_desc"); // CoinGecko default
  const [isSorting, setIsSorting] = useState(false);
  const [allCoins, setAllCoins] = useState([]); //Stores the full 100 coin

  // 1. Fetch data ONCE
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const data = await getCoinMarkets("usd");
      setAllCoins(data);
      setLoading(false);
    };
    loadInitialData();
  }, []);

  // 2. Sort and Paginate LOCALLY whenever sortBy or currentPage changes
  useEffect(() => {
    if (allCoins.length === 0) return;

    // Create a copy to sort
    let sorted = [...allCoins];

    // Apply Sorting Logic
    if (sortBy === "price_desc") {
      sorted.sort((a, b) => b.current_price - a.current_price);
    } else if (sortBy === "volume_desc") {
      sorted.sort((a, b) => b.total_volume - a.total_volume);
    } else if (sortBy === "id_asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: market_cap_desc
      sorted.sort((a, b) => b.market_cap - a.market_cap);
    }

    // Slice for Pagination (show 20 per page)
    const startIndex = (currentPage - 1) * 20;
    const paginatedCoins = sorted.slice(startIndex, startIndex + 20);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);

    setCoins(paginatedCoins);
  }, [allCoins, sortBy, currentPage]);
  // 2. Show Error Message
  if (error)
    return (
      <div className="error-msg" style={{ color: "red" }}>
        {error}
      </div>
    );
  if (loading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#050505] gap-6">
        {/* The Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-fuchsia-500"></div>
          {/* Optional: A static inner ring for more "tech" detail */}
          <div className="absolute rounded-full h-10 w-10 border border-white/5"></div>
        </div>

        {/* The Animated Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-white font-black tracking-[0.3em] text-sm uppercase">
            Syncing Blocks<span className="text-fuchsia-500">...</span>
          </span>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-2">
            Fetching Real-Time Market Data
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    /* 1. Added 'relative' and 'overflow-hidden' to keep the glows in the background */
    <div className="min-h-screen bg-[#050505] relative overflow-hidden text-white p-6 lg:p-12">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        {/* 1. SORTING DROPDOWN (Now on the Left) */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black">
            Sort By
          </span>
          <div className="relative group">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1); // Reset to page 1 when changing sort order
              }}
              className="appearance-none bg-white/5 border border-white/10 text-white text-sm rounded-2xl px-5 py-2.5 pr-10 outline-none focus:border-fuchsia-500/50 transition-all cursor-pointer hover:bg-white/10 backdrop-blur-md"
            >
              {/* FIX: We force the background color of options to be dark */}
              <option
                value="market_cap_desc"
                className="bg-[#0f0f0f] text-white"
              >
                Most Popular
              </option>
              <option value="price_desc" className="bg-[#0f0f0f] text-white">
                Highest Price
              </option>
              <option value="volume_desc" className="bg-[#0f0f0f] text-white">
                Highest Volume
              </option>
              <option value="id_asc" className="bg-[#0f0f0f] text-white">
                Name (A-Z)
              </option>
            </select>
            {/* Custom Arrow Icon so it looks premium */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs">
              ▼
            </div>
          </div>
        </div>

        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md relative">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              viewMode === "grid"
                ? "bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.4)] scale-105"
                : "text-gray-500 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95"
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              viewMode === "list"
                ? "bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.4)] scale-105"
                : "text-gray-500 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Dynamic Layout Container */}
      <div
        className={`relative z-10 transition-all duration-500 ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-3"
        }`}
      >
        <AnimatePresence mode="wait" custom={currentPage}>
          {coins.map((coin, index) => (
            <motion.div
              key={coin.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.03, // This creates a "staggered" waterfall effect!
              }}
            >
              <CryptoCard
                name={coin.name}
                symbol={coin.symbol}
                price={coin.current_price}
                image={coin.image}
                priceChange={coin.price_change_percentage_24h}
                rank={(currentPage - 1) * 20 + (index + 1)}
                sparkline={coin.sparkline_in_7d?.price}
                viewMode={viewMode}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* PAGINATION BUTTONS */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          Previous
        </button>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-10 h-10 rounded-xl border transition-all cursor-pointer ${
                currentPage === num
                  ? "bg-fuchsia-600 border-fuchsia-500 text-white shadow-[0_0_15px_rgba(192,38,211,0.4)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === 5}
          className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
