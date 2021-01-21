import * as puppeteer from 'puppeteer';
import * as cronJob from 'cron';
const express = require('express');
const fetch = require('node-fetch');
const app = express();
let pages = ['https://cnnespanol.cnn.com/', 'https://www.foxnews.com/', 'https://www.theguardian.com/international'];

app.listen(8080, () => {
    console.log(`Server runing on port 8080`);
});

let CronJob = cronJob.CronJob;
let job = new CronJob('0 */5 * * * *', () => {
    let date = new Date();
    console.log(`Tarea corrinedo cada 5 minutos, la hora actual ${date}`);
    runPuppeteer().then( res=> console.log(res) );
});
job.start();

// Función exclusiva para CNN en español
/*
let aNewsMedia = document.querySelectorAll('article > div.news__media > a.news__media-item');
for (let i = 0; i < aNewsMedia.length; i++) {
    data1.push({
        title: aNewsMedia.item(i).getAttribute('title'),
        url: aNewsMedia.item(i).getAttribute('href'),
        image: aNewsMedia.item(i).children[0].getAttribute('src') || aNewsMedia.item(i).children[0].getAttribute('srcset')
    });
}

*/

//  Primeras 5 noticas principales de fox news
//  document.querySelectorAll('div.collection.collection-spotlight > div.content > article.article > div.m > a');
//  Buscar la longitud del picture elemento dentro de a y tomar solo el ultimo elemento siendo la imagen 
/**
 * let info = document.querySelectorAll('div.collection.collection-spotlight > div.content > article.article > div.m > a');
 info.forEach( element => {

    let href = element.getAttribute('href');
    let long = element.children[0].children.length;
    let image = element.children[0].children[ long - 1 ].getAttribute('src');
    let text = element.children[0].children[ long - 1 ].getAttribute('alt');
    let topic =  'headlines';
    console.log(text, href, image);
    

});
 */
//  document.querySelectorAll('div.main.main-secondary > div.collection.collection-article-list > div.content.article-list > article.article > div.m');
//  Buscar la primera a y tomar el href despues ir a su hijo picture y luego al ultimo hijo de este siendo img y tomar
//  Los atributos src y alt
/**let info2 = document.querySelectorAll('div.main.main-secondary > div.collection.collection-article-list > div.content.article-list > article.article > div');
for ( let c = 0; c < info2.length; c = c + 2  ){
    
  let href = info2.item(c).children[0].getAttribute('href');
  let long = info2.item(c).children[0].children[0].children.length;
  let img  = info2.item(c).children[0].children[0].children[ long - 1 ].getAttribute('src');
  let text = info2.item(c).children[0].children[0].children[ long - 1 ].getAttribute('alt');
  let topic
    if(info2.item(c + 1).children[0].children[0].children.length > 1){
        topic = info2.item(c + 1).children[0].children[0].children[0].children[0].textContent;
    } else {
        topic = null;
    }
  
  console.log( text, href, img, topic );

}
 * 
 */

// The guardian, iterar en todos los sections y verificar si su id esta incluido en las noticas que se quieres tomar
/*
section.forEach( sectionId => {
    if ( ['headlines', 'coronavirus-', 'spotligth' , 'around-the-world', 'climate-crisis'].includes(sectionId.getAttribute('id'))){
        let sectionChildren = sectionId.children[ sectionId.children.length - 1 ];
        let extraxtTopic = sectionChildren.children[0].children[0].children[0]
        let containerNews = sectionChildren.children[ sectionChildren.children.length - 1 ]
        let image, url, text, topic;

        if( extraxtTopic.tagName === 'H2') {
            topic = extraxtTopic.textContent;
        } else {
            topic = extraxtTopic.children[0].textContent;
        }

        
        for (let i = 0; i < containerNews.children.length; i++) {
            if( containerNews.children[i].className === 'fc-slice-wrapper' ){
                let ul = containerNews.children[i].children[0];

                for (let c = 0; c < ul.children.length; c++ ) {
                    if(ul.children[c].children[0].children.length === 1){
                        let data = ul.children[c].children[0].children[0].children;
                        for (let d = 0; d < data.length; d++ ) {
                            if( data[d].className === 'fc-item__media-wrapper' ){
                                let length = data[d].children[0].children[0].children.length
                                image = data[d].children[0].children[0].children[length - 1].getAttribute('src');
                           
                            } else if(data[d].className === 'u-faux-block-link__overlay js-headline-text') {
                                url = data[d].getAttribute('href');
                                text = data[d].textContent;
                          
                            }
                            
                        }
                        
                        news.push({
                            title: text,
                            url: url,
                            image: image,
                            topic: topic
                        });
                        
                    } else {
                        for(let d = 0; d < ul.children.length; d++){
                            if(ul.children[d].children[0].children.length === 1){
                                  
                                let data = ul.children[d].children[0].children[0].children;
                                for (let d = 0; d < data.length; d++ ) {
                                    
                                    
                                    if( data[d].className === 'fc-item__media-wrapper' ){
                                        let length = data[d].children[0].children[0].children.length
                                        image = data[d].children[0].children[0].children[length - 1].getAttribute('src');
                                        console.log(image)

                                    } else if(data[d].className === 'u-faux-block-link__overlay js-headline-text') {
                                        url = data[d].getAttribute('href');
                                        text = data[d].textContent;
                                        console.log(url, text)
                                    }
                                    
                                }
                                 news.push({
                                    title: text,
                                    url: url,
                                    image: image,
                                    topic: topic
                                });
                       
                            } else if(ul.children[d].children[0].children.length > 1){
                                    
                                    
                                   let data =  ul.children[d].children[0].children;
                                   for (let i = 0; i < data.length; i++  ) {
                                        
                                        let takeData = data[i].children[0].children[0].children;
                                        console.log(takeData);
                                       for(let c = 0; c < takeData.length; c++  ) {
                                             if( takeData[c].className === 'fc-item__media-wrapper' ){
                                                let length = takeData[c].children[0].children[0].children.length
                                                image = takeData[c].children[0].children[0].children[length - 1].getAttribute('src');
                                               
                           
                                                } else if(takeData[c].className === 'u-faux-block-link__overlay js-headline-text') {
                                                    url = takeData[c].getAttribute('href');
                                                    text = takeData[c].textContent;
                                                  
                                                }                
                                        }

                                        if( image.length === 0){
                                            image = null;
                                        }
                                       news.push({
                                            title: text,
                                            url: url,
                                            image: image,
                                            topic: topic
                                        });
                                  }
                            }
                            
                        }
                        
                        
                    }
                    
                }
            }
        }
        
    }
})
*/


async function runPuppeteer() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    let dataA: any[] = []; 
    async function scrap() {
        await page.goto('https://www.foxnews.com/', { waitUntil: 'domcontentloaded' });
        const data = await page.evaluate( () => {
            let data1: any[] = [];
            let info = document.querySelectorAll('div.collection.collection-spotlight > div.content > article.article > div.m > a');
            info.forEach( element => {

                let href = element.getAttribute('href');
                let long = element.children[0].children.length;
                let image = element.children[0].children[ long - 1 ].getAttribute('src');
                let text = element.children[0].children[ long - 1 ].getAttribute('alt');
                let topic =  'headlines';
                data1.push({
                    title: text,
                    url: href,
                    image: image,
                    topic
                });
                

            });
            let info2 = document.querySelectorAll('div.main.main-secondary > div.collection.collection-article-list > div.content.article-list > article.article > div');
            for ( let c = 0; c < info2.length; c = c + 2  ) {
                
                let href = info2.item(c).children[0].getAttribute('href');
                let long = info2.item(c).children[0].children[0].children.length;
                let image  = info2.item(c).children[0].children[0].children[ long - 1 ].getAttribute('src');
                let text = info2.item(c).children[0].children[0].children[ long - 1 ].getAttribute('alt');
                let topic_
                    if(info2.item(c + 1).children[0].children[0].children.length > 1){
                        topic_ = info2.item(c + 1).children[0].children[0].children[0].children[0].textContent;
                    } else {
                        topic_ = null;
                    }
            
                data1.push({
                    title: text,
                    url: href,
                    image: image,
                    topic: topic_
                });
            }
            return data1    
        });
        await browser.close()
        return data
    }
    return scrap();
    
}

async function runPuppeteer2() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let countPages = 0;
    async function navigatePage(url: string) {
        await page.setDefaultNavigationTimeout(0);
        await page.goto(`${url}`, { waitUntil: 'domcontentloaded' });
        await page.screenshot({
            path: `screenshot-${countPages}.png`,
        })
        countPages++;
        if ( countPages < pages.length ) {
            navigatePage(pages[countPages])
        } else {
            await browser.close()
        }
    }
    navigatePage(pages[countPages]);
}
  

/*

app.use(function(req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });;

app.get('/news', (req: any, res: any) => {
    let data = req;
  
    // getNews().then( resp =>{
    //    console.log(resp);
    //    res.send(resp)
    // });
    
});

app.get('/search', ( req: any, res: any ) => {
    runPuppeteer().then( resp => {
        res.send(resp);
    } )
})

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
*/