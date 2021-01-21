"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
var cronJob = require("cron");
var express = require('express');
var fetch = require('node-fetch');
var app = express();
var pages = ['https://cnnespanol.cnn.com/', 'https://www.foxnews.com/', 'https://www.theguardian.com/international'];
app.listen(8080, function () {
    console.log("Server runing on port 8080");
});
var CronJob = cronJob.CronJob;
var job = new CronJob('0 */5 * * * *', function () {
    var date = new Date();
    console.log("Tarea corrinedo cada 5 minutos, la hora actual " + date);
    runPuppeteer().then(function (res) { return console.log(res); });
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
function runPuppeteer() {
    return __awaiter(this, void 0, void 0, function () {
        function scrap() {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, page.goto('https://www.foxnews.com/', { waitUntil: 'domcontentloaded' })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, page.evaluate(function () {
                                    var data1 = [];
                                    var info = document.querySelectorAll('div.collection.collection-spotlight > div.content > article.article > div.m > a');
                                    info.forEach(function (element) {
                                        var href = element.getAttribute('href');
                                        var long = element.children[0].children.length;
                                        var image = element.children[0].children[long - 1].getAttribute('src');
                                        var text = element.children[0].children[long - 1].getAttribute('alt');
                                        var topic = 'headlines';
                                        data1.push({
                                            title: text,
                                            url: href,
                                            image: image,
                                            topic: topic
                                        });
                                    });
                                    var info2 = document.querySelectorAll('div.main.main-secondary > div.collection.collection-article-list > div.content.article-list > article.article > div');
                                    for (var c = 0; c < info2.length; c = c + 2) {
                                        var href = info2.item(c).children[0].getAttribute('href');
                                        var long = info2.item(c).children[0].children[0].children.length;
                                        var image = info2.item(c).children[0].children[0].children[long - 1].getAttribute('src');
                                        var text = info2.item(c).children[0].children[0].children[long - 1].getAttribute('alt');
                                        var topic_ = void 0;
                                        if (info2.item(c + 1).children[0].children[0].children.length > 1) {
                                            topic_ = info2.item(c + 1).children[0].children[0].children[0].children[0].textContent;
                                        }
                                        else {
                                            topic_ = null;
                                        }
                                        data1.push({
                                            title: text,
                                            url: href,
                                            image: image,
                                            topic: topic_
                                        });
                                    }
                                    return data1;
                                })];
                        case 2:
                            data = _a.sent();
                            return [4 /*yield*/, browser.close()];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, data];
                    }
                });
            });
        }
        var browser, page, dataA;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setDefaultNavigationTimeout(0)];
                case 3:
                    _a.sent();
                    dataA = [];
                    return [2 /*return*/, scrap()];
            }
        });
    });
}
function runPuppeteer2() {
    return __awaiter(this, void 0, void 0, function () {
        function navigatePage(url) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, page.setDefaultNavigationTimeout(0)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, page.goto("" + url, { waitUntil: 'domcontentloaded' })];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, page.screenshot({
                                    path: "screenshot-" + countPages + ".png"
                                })];
                        case 3:
                            _a.sent();
                            countPages++;
                            if (!(countPages < pages.length)) return [3 /*break*/, 4];
                            navigatePage(pages[countPages]);
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, browser.close()];
                        case 5:
                            _a.sent();
                            _a.label = 6;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        var browser, page, countPages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    countPages = 0;
                    navigatePage(pages[countPages]);
                    return [2 /*return*/];
            }
        });
    });
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
