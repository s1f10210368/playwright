import { chromium } from 'playwright';

export async function fetchStock(stockSymbol: string): Promise<number> {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const url = `https://finance.yahoo.co.jp/quote/${stockSymbol}`;

    await page.goto(url);

    const stockParentElement = await page.waitForSelector('[data-etfw-key="quotePrice"]'); // changed selector
    if (stockParentElement === null) {
        throw new Error("Stock price parent element not found");
    }

    const stockPriceElement = await stockParentElement.$(
        '._2ikyOH > span'
    ); // changed selector
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

// スクリプトの最後にこの行を追加
fetchStock("7203.T").then((stockPrice) => {
    console.log("Toyota's stock price:", stockPrice);
});