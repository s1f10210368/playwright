import { chromium } from 'playwright';

export async function fetchStock() { // `export` を追加しました
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const stockSymbol = 'AAPL'; // Apple株の例です。他の銘柄に変更できます。
    const url = `https://finance.yahoo.com/quote/${stockSymbol}`;

    await page.goto(url);

    const stockPrice = await page.$eval(
        '[data-test="quote-header-info"] .My\(6px\)',
        (element) => {
            return element.textContent;
        },
    );

    console.log(`The price of ${stockSymbol} is: $${stockPrice}`);

    await browser.close();
}