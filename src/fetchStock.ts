import { chromium, ChromiumBrowser, ChromiumBrowserContext, Page } from 'playwright';

async function fetchStockPrice(url: string): Promise<string> {
  let browser: ChromiumBrowser;
  let context: ChromiumBrowserContext;
  let page: Page;

  try {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    await page.goto(url);

    // 任意の株価の値が入っている要素のセレクタを指定する
    const stockPriceSelector = '<CSS_SELECTOR>';

    const stockPrice = await page.$eval(stockPriceSelector, (price) => {
      return price.textContent.trim();
    });

    return stockPrice;
  } catch (error) {
    console.error(error);
    return 'Error occurred';
  } finally {
    await page?.close();
    await context?.close();
    await browser?.close();
  }
}

(async () => {
  // 株価情報を取得したいウェブサイトのURLを指定する
  const targetUrl = '<WEBSITE_URL_WITH_STOCK_PRICE>';
  const stockPrice = await fetchStockPrice(targetUrl);
  console.log(`Stock price: ${stockPrice}`);
})();