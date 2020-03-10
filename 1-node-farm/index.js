const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');
///////////////////////////////////////
//FILES
//Block-synchronous way
// const TextIn =fs.readFileSync('./txt/input.txt','utf-8');
// console.log(TextIn);

// const TextOut=`This is what we know about avodaco: ${TextIn}.\nCreat on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt',TextOut);

// console.log('File written!');

//non-Block-asynchronous way
/*fs.readFile('./txt/start.txt', 'utf-8',(err,data1)=>{
    if(err) return console.log('ERROR');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8',(err,data2)=>{
    console.log(data2);
    fs.readFile(`./txt/append.txt`, 'utf-8',(err,data3)=>{
        console.log(data3);
        fs.writeFile(`./txt/final.txt`,`${data2}\n.${data3}`,'utf-8',err=>{
            console.log('Your file has been Written');
        })
        });
    });

});

console.log('wil read file');*/

///////////////////////////////////////
//SERVER

const temOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const temCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const temProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  // OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    const cardHtml = dataObj.map(el => replaceTemplate(temCard, el));
    const output = temOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.end(output);

    // PRODUCT PAGE
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    const output = replaceTemplate(temProduct, product);
    res.end(output);
    //API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
    //NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-owner-header': 'hello-world'
    });
    res.end('<h1>page not found</h1>');
  }
  res.end('Hello from the server!!');
});

server.listen(3000, '192.168.1.248', () => {
  console.log('Listen to request on port 3000');
});