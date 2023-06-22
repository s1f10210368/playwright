import { chromium } from "playwright";

export async function fetchStock(stockCode: string): Promise<number> {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // 適切な株価情報サイトへアクセスし、株価コードを入力して検索
  // 以下は仮のURLとセレクターです。実際のサイトに合わせて変更してください。
  await page.goto("https://example.com/stock");
  await page.type("#search-box", stockCode);
  await page.click("#search-button");

  // 取得した株価情報を取得し、数値に変換
  const stockPrice = await page.$eval("#stock-price", el => parseFloat(el.textContent));

  // ブラウザを閉じて結果を返す
  await browser.close();
  return stockPrice;
}
