const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = import.meta.env.VITE_COINGECKO_KEY;

export const getCoinMarkets = async (
  currency = "usd",
  perPage = 20,
  page = 1,
  order = "market_cap_desc",
) => {
  try {
    // We append the API key to every request as a query parameter for the Demo plan
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h&x_cg_demo_api_key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    if (response.status === 429) {
      throw new Error(
        "Rate limit exceeded. Please wait a minute before refreshing.",
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch coins:", error);
    return [];
  }
};
