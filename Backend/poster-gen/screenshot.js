const puppeteer = require('puppeteer');

async function getPic() {
	const browser = await puppeteer.launch({
		defaultViewport: {
			width: 1280,
			height: 720,
		},
		args: [
			'--disable-web-security'
		],
	});
	// const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('http://localhost:8080');
	let body = await page.$('#toImage > div.ant-col.ant-col-xs-24.ant-col-sm-22.ant-col-md-20.ant-col-lg-18.ant-col-xl-16.ant-col-xxl-14 > div');
	await body.screenshot({
		path: 'local.png',
	});

	await browser.close();
}

getPic();