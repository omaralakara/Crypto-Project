import { Sparklines, SparklinesLine } from "react-sparklines";

const CryptoCard = ({
  name,
  price,
  image,
  symbol,
  priceChange,
  rank,
  sparkline,
}) => {
  const isPositive = priceChange > 0;

  return (
    // Increased padding to p-6 and added a min-height to make the card feel more substantial
    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:border-fuchsia-500/40 transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-2xl flex flex-col min-h-[220px]">
      {/* Interactive Glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition duration-500"></div>

      <div className="relative flex flex-col h-full justify-between">
        {/* HEADER SECTION */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white/5 rounded-2xl border border-white/5">
              <img
                src={image}
                alt={name}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-lg tracking-tight truncate max-w-[100px]">
                  {name}
                </h3>
                <span className="text-[10px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded uppercase font-bold">
                  {symbol}
                </span>
              </div>
              <p className="text-gray-500 text-xs font-medium">Rank #{rank}</p>
            </div>
          </div>
        </div>

        {/* CHART SECTION: Smaller height and better spacing */}
        <div className="h-10 w-full my-4 opacity-80 group-hover:opacity-100 transition-opacity">
          {sparkline ? (
            <Sparklines data={sparkline} margin={5}>
              <SparklinesLine
                color={isPositive ? "#4ade80" : "#f87171"}
                style={{ strokeWidth: 2, fill: "none" }}
              />
            </Sparklines>
          ) : (
            <div className="h-full w-full bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-[10px] text-gray-600 uppercase tracking-widest">
              No Data
            </div>
          )}
        </div>

        {/* SEPARATOR LINE */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4"></div>

        {/* FOOTER SECTION: Price and Change */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">
              Current Price
            </p>
            <p className="text-white font-mono font-bold text-xl tracking-tighter">
              ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-bold ${
              isPositive
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
