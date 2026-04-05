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
          ? "flex items-center justify-between p-2 md:p-4 px-3 md:px-6 rounded-xl md:rounded-2xl min-h-[60px] md:min-h-[80px] hover:bg-white/10"
          : "flex flex-col p-4 md:p-6 rounded-2xl md:rounded-3xl h-full"
      }`}
    >
      {/* Interactive Glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition duration-500"></div>

      {/* --- LEFT SECTION (Rank & Asset) --- */}
      <div
        className={`relative flex items-center gap-2 md:gap-4 ${isList ? "flex-1 min-w-0" : "mb-3"}`}
      >
        {isList && (
          <span className="text-gray-500 text-[10px] w-4 shrink-0 tabular-nums">
            {rank}
          </span>
        )}

        <div
          className={`bg-white/5 rounded-lg border border-white/10 shrink-0 ${isList ? "p-1" : "p-2"}`}
        >
          <img
            src={image}
            alt={name}
            className={`${isList ? "w-6 h-6 md:w-8 md:h-8" : "w-10 h-10"} object-contain`}
          />
        </div>

        <div className="truncate min-w-0">
          <div className="flex items-center gap-1 md:gap-2">
            <h3
              className={`font-bold text-white truncate leading-tight ${isList ? "text-xs md:text-base" : "text-lg"}`}
            >
              {name}
            </h3>
            <span className="hidden xs:inline-block text-[8px] md:text-[9px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded uppercase font-black shrink-0">
              {symbol}
            </span>
          </div>
          {!isList && (
            <p className="text-gray-500 text-[10px] md:text-xs font-medium mt-1">
              Rank #{rank}
            </p>
          )}
        </div>
      </div>

      {/* --- MIDDLE SECTION (Sparkline - Only on Tablet/Desktop List or All Grid) --- */}
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

      {/* --- RIGHT SECTION (Price & Change) --- */}
      <div
        className={`relative flex ${isList ? "items-center gap-3 md:gap-6 shrink-0" : "flex-col mt-auto"}`}
      >
        {!isList && <div className="w-full h-px bg-white/10 mb-4" />}

        <div className="text-right">
          <p
            className={`text-white font-mono font-bold tracking-tighter ${isList ? "text-xs md:text-base" : "text-xl"}`}
          >
            ${price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          {isList && (
            <div
              className={`text-[9px] font-bold ${isPositive ? "text-green-400" : "text-red-400"} md:hidden`}
            >
              {isPositive ? "▲" : "▼"}
              {Math.abs(priceChange).toFixed(2)}%
            </div>
          )}
        </div>

        {/* Change Badge (Hidden on very small list views, shown on MD+) */}
        <div
          className={`hidden md:flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg font-bold border transition-all ${
            isPositive
              ? "bg-green-500/10 text-green-400 border-green-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          } ${isList ? "w-20 justify-center" : "w-fit"}`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
