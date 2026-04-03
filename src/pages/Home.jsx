import { useState, useEffect } from "react";
import { getCoinMarkets } from "../api/CoinGecko"; // Import your new service
import CryptoCard from "../components/CryptoCard";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await getCoinMarkets();

        if (!data || data.length === 0) {
          throw new Error("No data received from API");
        }

        setCoins(data);
      } catch (err) {
        setError(`Failed to fetch crypto data. Please try again later. ${err}`);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    loadData();
  }, []);

  // 2. Show Error Message
  if (error)
    return (
      <div className="error-msg" style={{ color: "red" }}>
        {error}
      </div>
    );
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-fuchsia-500"></div>
      </div>
    );
  }
  return (
    /* 1. Added 'relative' and 'overflow-hidden' to keep the glows in the background */
    <div className="min-h-screen bg-[#050505] relative overflow-hidden text-white p-6 lg:p-12">
      <header className="relative z-10 mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
          Market Explorer
        </h1>
        <p className="text-gray-400 mt-2">
          Real-time data for the top 100 assets.
        </p>
      </header>

      {/* Responsive Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {coins.map((coin, index) => (
          <CryptoCard
            key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            rank={index + 1} // ✅ THIS FIXES IT
            sparkline={coin.sparkline_in_7d?.price.slice(-24)} // last 24 points = last 24h
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
