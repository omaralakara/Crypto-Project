import { Sparklines, SparklinesLine } from "react-sparklines";
import { Link } from "react-router-dom";

const CryptoCard = ({
  id,
  name,
  price,
  image,
  symbol,
  priceChange,
  sparkline,
  viewMode,
}) => {
  const isPositive = priceChange > 0;
  const isList = viewMode === "list";

  return (
    <Link to={`/coin/${id}`}>
      <div
        className={`group relative bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-[1.01] cursor-pointer shadow-2xl overflow-hidden
      ${
        isList
          ? "flex items-center p-3 md:px-6 rounded-xl md:rounded-2xl min-h-[70px] hover:bg-white/10"
          : "flex flex-col p-4 md:p-6 rounded-2xl md:rounded-3xl h-full"
      }`}
      >
        {/* Interactive Glow */}
        <div className="absolute -inset-px bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition duration-500"></div>

        {/* --- LEFT: Asset Info --- */}
        <div
          className={`relative flex items-center gap-3 ${isList ? "flex-1 min-w-0" : "mb-3"}`}
        >
          <div
            className={`bg-white/5 rounded-lg border border-white/10 shrink-0 ${isList ? "p-1" : "p-2"}`}
          >
            <img
              src={image}
              alt={name}
              className={`${isList ? "w-7 h-7" : "w-10 h-10"} object-contain`}
            />
          </div>

          <div className="truncate min-w-0">
            <div className="flex items-center gap-1.5">
              <h3
                className={`font-bold text-white truncate leading-tight ${isList ? "text-sm md:text-base" : "text-lg"}`}
              >
                {name}
              </h3>
              <span className="text-[8px] md:text-[9px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded uppercase font-black shrink-0">
                {symbol}
              </span>
            </div>
          </div>
        </div>

        {/* --- GRID ONLY: Sparkline --- */}
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
              <div className="h-full w-full border border-dashed border-white/10 flex items-center justify-center text-[10px] text-gray-600">
                No Data
              </div>
            )}
          </div>
        )}

        {/* --- RIGHT: Price & Change --- */}
        <div
          className={`relative flex items-center ${
            isList
              ? "justify-end gap-3 md:gap-6 ml-auto"
              : "flex-col mt-auto items-start w-full"
          }`}
        >
          {!isList && <div className="w-full h-px bg-white/10 mb-4" />}

          {/* Price Container */}
          <div className={isList ? "text-right" : "mb-2"}>
            {!isList && (
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">
                Price
              </p>
            )}
            <p
              className={`text-white font-mono font-bold tracking-tighter ${isList ? "text-sm md:text-base" : "text-xl"}`}
            >
              ${price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Change Badge */}
          <div
            className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg font-bold border shrink-0 ${
              isPositive
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            } ${isList ? "w-[72px] md:w-20 justify-center" : "w-fit"}`}
          >
            {isPositive ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;
