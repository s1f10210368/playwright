import { fetchStock } from "./fetchStock";

async function fetchStockRepeatedly(stockSymbol: string, interval: number) {
  const stockPrice = await fetchStock(stockSymbol);
  console.log(`${stockSymbol}'s stock price:`, stockPrice);

  setTimeout(() => {
    fetchStockRepeatedly(stockSymbol, interval);
  }, interval);
}



