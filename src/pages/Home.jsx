import { useState, useEffect } from "react";
import { getCoinMarkets } from "../api/CoinGecko"; // Import your new service
import CryptoCard from "../components/CryptoCard";
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const Home = ({ searchQuery, onSearch, currentPage, setCurrentPage }) => {
  const [coins, setCoins] = useState([]); //20 to be displayed
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState(null); // Track errors
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

  const filteredCoins =
    searchQuery.trim() === ""
      ? coins
      : allCoins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
        );
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
      {/* WRAPPER CONTAINER: Stacks on mobile, Rows on Desktop */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full px-4 mb-10">
        {" "}
        {/* 1. SORTING DROPDOWN */}
        <div className="flex items-center justify-between md:justify-start gap-4 w-full md:w-auto">
          <span className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black whitespace-nowrap">
            Sort By
          </span>
          <div className="relative group flex-1 md:flex-none">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none w-full md:w-auto bg-white/5 border border-white/10 text-white text-sm rounded-2xl px-5 py-2.5 pr-10 outline-none focus:border-fuchsia-500/50 transition-all cursor-pointer hover:bg-white/10 backdrop-blur-md"
            >
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
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500 text-xs">
              ▼
            </div>
          </div>
        </div>
        {/* 2. VIEW MODE TOGGLER */}
        <div className="flex w-full md:w-auto bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              viewMode === "grid"
                ? "bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.4)]"
                : "text-gray-500 hover:text-white"
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
              viewMode === "list"
                ? "bg-fuchsia-600 text-white shadow-[0_0_20px_rgba(192,38,211,0.4)]"
                : "text-gray-500 hover:text-white"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {filteredCoins.length === 0 && searchQuery.trim() !== "" && (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <div className="text-6xl">🔍</div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-white font-black text-xl tracking-tight">
              No results for{" "}
              <span className="text-fuchsia-500">"{searchQuery}"</span>
            </h2>
            <p className="text-gray-500 text-sm">
              Try searching by full name or ticker symbol
            </p>
          </div>
          <button
            onClick={() => {
              onSearch("");
              setCurrentPage(1);
            }}
            className="px-6 py-2.5 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(192,38,211,0.4)] cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      )}

      {/* Dynamic Layout Container */}
      <div
        className={`relative z-10 transition-all duration-500 ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-3"
        }`}
      >
        <AnimatePresence mode="wait" custom={currentPage}>
          {filteredCoins.map((coin, index) => (
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
                sparkline={coin.sparkline_in_7d?.price}
                viewMode={viewMode}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* PAGINATION BUTTONS */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mt-10 px-4">
        {/* PREVIOUS BUTTON */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 sm:px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer text-sm sm:text-base"
        >
          {/* Show arrow on mobile, text on desktop */}
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">&larr;</span>
        </button>

        {/* PAGE NUMBERS */}
        <div className="flex gap-1 sm:gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm rounded-lg sm:rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                currentPage === num
                  ? "bg-fuchsia-600 border-fuchsia-500 text-white shadow-[0_0_15px_rgba(192,38,211,0.4)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* NEXT BUTTON */}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === 5}
          className="px-4 sm:px-6 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-30 transition-all cursor-pointer text-sm sm:text-base"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
