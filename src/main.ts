import { fetchStock } from "./fetchStock";

async function main() {
  // 株価コードの例。実際のコードに置き換えてください。
  const stockCode = "1234";
  const stockPrice = await fetchStock(stockCode);
  console.log(`株価コード ${stockCode} の価格は、 ${stockPrice} です。`);
}

fetchStock();