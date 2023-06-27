import { chromium } from 'playwright';

export async function fetchStock(stockSymbol: string): Promise<number> { // Promise<number> を追加
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = `https://finance.yahoo.com/quote/${stockSymbol}`;

  await page.goto(url);

  const stockHeaderInfo = await page.waitForSelector('[data-test="quote-header-info"]', {timeout: 30000}); // タイムアウトを追加
  const stockPriceElement = await stockHeaderInfo.$('span[data-reactid]');
  if (stockPriceElement === null) { // 追加
  throw new Error("Stock price element not found");
}
  const stockPrice = await stockPriceElement.textContent();
  if (stockPrice === null) { // 追加
    throw new Error("Stock price text not found");
}

  // 株価を数値として返す
  return Number(stockPrice.trim().replace(/,/g, ''));
}
