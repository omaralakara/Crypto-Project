import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCoinDetail } from "../api/CoinGecko";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ FIX: Move this OUTSIDE the main component
const QuickStat = ({ label, value, color = "text-white" }) => (
  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1 hover:bg-white/[0.04] transition-colors">
    <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.15em]">
      {label}
    </span>
    <span className={`text-sm md:text-base font-bold font-mono ${color}`}>
      {value}
    </span>
  </div>
);

const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getCoinDetail(id);
      setCoin(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading || !coin)
    return (
      <div className="h-screen w-full bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/10 border-t-fuchsia-500 rounded-full animate-spin" />
      </div>
    );

  const mData = coin.market_data;
  const sparkline = mData.sparkline_7d?.price || [];
  const chartData = sparkline.map((price, i) => ({
    time: i,
    price: Number(price),
  }));
  const isPositive = mData.price_change_percentage_7d > 0;
  const brandColor = isPositive ? "#22c55e" : "#ef4444";

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-fuchsia-500/30">
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* REFINED BACK BUTTON */}
        <motion.button
          whileHover={{ x: -8, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all group"
        >
          <span className="text-fuchsia-500 group-hover:scale-110 transition-transform">
            ←
          </span>
          <span>Terminal Home</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Identity & Price */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col items-center">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={coin.image.large}
                className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] mb-6"
                alt={coin.name}
              />
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter mb-1">
                {coin.name}
              </h1>
              <span className="text-gray-600 font-mono text-xs uppercase tracking-widest mb-8">
                {coin.symbol} / USD
              </span>

              <div className="w-full h-px bg-white/5 mb-8" />

              <div className="text-center space-y-1">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em]">
                  Market Value
                </p>
                <p className="text-4xl md:text-5xl font-black font-mono tracking-tighter">
                  $
                  {mData.current_price.usd.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <div
                  className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border ${isPositive ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}
                >
                  {isPositive ? "▲" : "▼"}{" "}
                  {Math.abs(mData.price_change_percentage_24h).toFixed(2)}%
                </div>
              </div>
            </div>

            {/* QUICK STATS BENTO */}
            <div className="grid grid-cols-2 gap-3">
              <QuickStat
                label="Rank"
                value={`#${coin.market_cap_rank}`}
                color="text-fuchsia-400"
              />
              <QuickStat
                label="7D High"
                value={`$${Math.max(...sparkline).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              />
              <QuickStat
                label="Circ. Supply"
                value={`${(mData.circulating_supply / 1e6).toFixed(1)}M`}
              />
              <QuickStat
                label="Vol / MC"
                value={(mData.total_volume.usd / mData.market_cap.usd).toFixed(
                  4,
                )}
              />
            </div>
          </div>

          {/* RIGHT: Visual Analytics & Key Metrics */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* CHART PANEL */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col h-[400px] md:h-[500px]">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Performance Index
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                    Live Node
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  key={chartData.length}
                >
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="chartFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={brandColor}
                          stopOpacity={0.15}
                        />
                        <stop
                          offset="95%"
                          stopColor={brandColor}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis domain={["auto", "auto"]} hide />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#000",
                        border: "1px solid #222",
                        borderRadius: "12px",
                      }}
                      itemStyle={{
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                      labelStyle={{ display: "none" }}
                      cursor={{
                        stroke: "rgba(255,255,255,0.05)",
                        strokeWidth: 2,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={brandColor}
                      strokeWidth={2.5}
                      fill="url(#chartFill)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* KEY METRICS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickStat
                label="Market Cap"
                value={`$${(mData.market_cap.usd / 1e9).toFixed(1)}B`}
              />
              <QuickStat
                label="High 24h"
                value={`$${mData.high_24h.usd.toLocaleString()}`}
                color="text-green-400"
              />
              <QuickStat
                label="Low 24h"
                value={`$${mData.low_24h.usd.toLocaleString()}`}
                color="text-red-400"
              />
              <QuickStat
                label="ATH"
                value={`$${mData.ath.usd.toLocaleString()}`}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoinDetail;
