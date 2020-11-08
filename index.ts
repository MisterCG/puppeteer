import * as puppeteer from 'puppeteer';
const  express = require('express');
const fetch = require('node-fetch');
const app = express();

/*
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://cnnespanol.cnn.com/');
    const data = await page.evaluate(()=> {
        let dataA: any[] = []; 
        // Función exclusiva para CNN en español
        const a = document.querySelectorAll('article > div.news__data > h2.news__title > a');
        a.forEach( e => {
            dataA.push({
            content: e?.textContent?.trim()
            });
        });
        return dataA;    
    });
    console.log(data)
    
    await browser.close();
})();
*/

app.listen(8080, () => {
    console.log(`Server runing on port 8080`);
});

app.use(function(req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });;

app.get('/news', (req: any, res: any) => {
    let data = req;
    getNews().then( resp =>{
        console.log(resp);
        res.send(resp)
    })
});

async function getNews() {
    const data = await fetch('https://webit-news-search.p.rapidapi.com/search?language=en&q=elections', {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'webit-news-search.p.rapidapi.com',
            'x-rapidapi-key': '8a4044da69msh74741dfb6181966p17a30djsn0287918243a6',
            'useQueryString': 'true'
        },
    });
    return data.json();
}
