import { chromium } from 'playwright';

export async function fetchStock(stockSymbol: string): Promise<number> {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const url = `https://finance.yahoo.co.jp/quote/${stockSymbol}`;

    await page.goto(url);

    const stockPriceElement = await page.waitForSelector('._3rXWJKZF');
    if (stockPriceElement === null) {
        throw new Error("Stock price element not found");
    }
    const stockPrice = await stockPriceElement.textContent();
    if (stockPrice === null) {
        throw new Error("Stock price text not found");
    }

    await browser.close();

    return Number(stockPrice.trim().replace(/,/g, ""));
}

async function fetchStockRepeatedly(stockSymbol: string, interval: number) {
  const stockPrice = await fetchStock(stockSymbol);
  console.log(`${stockSymbol}'s stock price:`, stockPrice);

  setTimeout(() => {
    fetchStockRepeatedly(stockSymbol, interval);
  }, interval);
}

fetchStockRepeatedly("7203.T", 10000); // 10秒ごとにトヨタの株価を取得