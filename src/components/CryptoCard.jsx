import { Sparklines, SparklinesLine } from "react-sparklines";

const CryptoCard = ({
  name,
  price,
  image,
  symbol,
  priceChange,
  rank,
  sparkline,
  viewMode,
}) => {
  const isPositive = priceChange > 0;
  const isList = viewMode === "list";

  return (
    <div
      className={`group relative bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-[1.01] cursor-pointer shadow-2xl overflow-hidden
      ${
        isList
          ? "flex items-center gap-4 p-3 px-6 rounded-2xl h-16 hover:bg-white/10"
          : "flex flex-col p-6 rounded-3xl min-h-[220px]"
      }`}
    >
      {/* Interactive Glow - Now works for BOTH modes */}
      <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition duration-500"></div>

      {/* --- 1. RANK & ASSET --- */}
      <div
        className={`relative flex items-center gap-4 ${isList ? "w-[250px] shrink-0" : "mb-4"}`}
      >
        <span className={`${isList ? "text-gray-500 text-xs w-6" : "hidden"}`}>
          {rank}
        </span>

        <div
          className={`bg-white/5 rounded-xl border border-white/10 shrink-0 ${isList ? "p-1.5" : "p-2"}`}
        >
          <img
            src={image}
            alt={name}
            className={`${isList ? "w-7 h-7" : "w-10 h-10"} object-contain`}
          />
        </div>

        <div className="truncate">
          <div className="flex items-center gap-2">
            <h3
              className={`font-bold text-white truncate tracking-tight ${isList ? "text-sm" : "text-lg"}`}
            >
              {name}
            </h3>
            <span className="text-[9px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded uppercase font-black">
              {symbol}
            </span>
          </div>
          {!isList && (
            <p className="text-gray-500 text-xs font-medium mt-1">
              Rank #{rank}
            </p>
          )}
        </div>
      </div>

      {/* --- 2. THE CHART (GRID ONLY) --- */}
      {!isList && (
        <div className="relative h-10 w-full my-4 opacity-80 group-hover:opacity-100 transition-opacity">
          {sparkline ? (
            <Sparklines data={sparkline} margin={5}>
              <SparklinesLine
                color={isPositive ? "#4ade80" : "#f87171"}
                style={{ strokeWidth: 2, fill: "none" }}
              />
            </Sparklines>
          ) : (
            <div className="h-full w-full bg-white/5 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-[10px] text-gray-600">
              No Data
            </div>
          )}
        </div>
      )}

      {/* --- 3. PRICE & CHANGE --- */}
      <div
        className={`relative flex ${isList ? "flex-grow items-center justify-end gap-12" : "flex-col mt-auto"}`}
      >
        {!isList && (
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
        )}

        <div className={isList ? "w-32 text-right" : ""}>
          {!isList && (
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">
              Price
            </p>
          )}
          <p
            className={`text-white font-mono font-bold tracking-tighter ${isList ? "text-sm" : "text-base lg:text-xl"}`}
          >
            ${price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div
          className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg font-bold border transition-all ${
            isPositive
              ? "bg-green-500/10 text-green-400 border-green-500/20 group-hover:bg-green-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20"
          } ${isList ? "w-20 justify-center" : "w-fit"}`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
