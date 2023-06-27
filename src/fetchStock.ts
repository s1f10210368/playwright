import { chromium } from 'playwright';

// 引数 `stockSymbol` を追加しました
export async function fetchStock(stockSymbol: string) { // `export`および`stockSymbol`引数を追加
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // 関数の引数で渡された `stockSymbol` を使用
    const url = `https://finance.yahoo.com/quote/${stockSymbol}`;

    await page.goto(url);

    const stockPrice = await page.$eval(
        '[data-test="quote-header-info"] .D\(ib\)',
        (element) => {
            return element.textContent;
        },
    );

    console.log(`The price of ${stockSymbol} is: $${stockPrice}`);

    await browser.close();

    return Number(stockPrice);
}