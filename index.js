const puppeteer = require('puppeteer');

(async () => {
    
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Sesuaikan path ini dengan lokasi Chrome di sistemmu
    });
    const page = await browser.newPage();
    await page.goto('https://eoffice.ilcs.co.id/p2b/login');

    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', '11952503'); // Ganti 'your_username' dengan username yang ingin kamu gunakan

    // Tunggu elemen input password muncul dan isi input tersebut
    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', 'Ilcs1234!'); // Ganti 'your_password' dengan password yang ingin kamu gunakan

    await page.waitForSelector('button[type="submit"]');
    await page.click('button[type="submit"]');

    await page.waitForNavigation();
    console.log('Login successful');

    await page.goto('https://eoffice.ilcs.co.id/p2b/absensi/online');

    await page.waitForSelector('#btnAbsenMasuk');
    await page.click('#btnAbsenMasuk');
    console.log('hit button masuk')

    const response = await page.evaluate(async () => {
        const data = { 
            via: "WFO",
            kondisi: "Sehat",
            lokasi: "-6.1499973,106.8880734",
            alamat: "Jalan Mitra Sunter Boulevard, RW 11, Sunter Jaya, Tanjung Priok, North Jakarta, Special Region of Jakarta, Java, 14350, Indonesia",
            state: "",
            provinsi: "Special Region of Jakarta",
            keterangan: ""
        }; // Sesuaikan dengan data yang Anda butuhkan
        
        const payload = new FormData();
        payload.append('via', data.via);
        payload.append('kondisi', data.kondisi);
        payload.append('lokasi', data.lokasi);
        payload.append('alamat', data.alamat);
        payload.append('state', data.state);
        payload.append('provinsi', data.provinsi);
        payload.append('keterangan', data.keterangan);

        // const boundary = '----------WebKitFormBoundary2dBe9DfKlhwmi5qw' + Math.random().toString(36).substring(2);
        // const body = new Blob([...payload], { type: `application/x-www-form-urlencoded; boundary=${boundary}` });

        const response = await fetch('https://eoffice.ilcs.co.id/p2b/absensi/absen_masuk', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryCpk1haiFikiFtBJb',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Type': `multipart/form-data; boundary=${boundary}`,
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                // 'Content-Type': `application/x-www-form-urlencoded; boundary=${boundary}`,
                'x-requested-with': 'XMLHttpRequest'
            },
            body: payload
        });
        console.log(payload)
        return response.json()
    });
    console.log('Response:', response)
    // await page.waitForSelector('.btn btn-primary');
    // await page.click('.btn btn-primary');
    await browser.close();
})();