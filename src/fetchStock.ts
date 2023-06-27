import { chromium } from 'playwright';

export async function fetchStock(stockSymbol: string): Promise<number> { // Promise<number> を追加
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = `https://finance.yahoo.com/quote/${stockSymbol}`;

  await page.goto(url);

  const stockHeaderInfo = await page.waitForSelector('[data-test="quote-header-info"]');
  const stockPriceElement = await stockHeaderInfo.$('h1+div>span:first-child'); // セレクタを修正
  if (stockPriceElement === null) { 
    throw new Error("Stock price element not found");
  }
  const stockPrice = await stockPriceElement.textContent();
  if (stockPrice === null) {
    throw new Error("Stock price text not found");
  }

  await browser.close();

  return Number(stockPrice.trim().replace(/,/g, ''));
}