const http = require('http'); // built in http module gives networking capabilities
let url = require('url'); // built in url module gives us url parsing and routing capabilities
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate'); // import our replaceTemplate module

const PORT = 8888; // Defining our listening port
const HOST = '127.0.0.1'; // Defining our host
//create server

// read and parse json data
// read json data from ./dev-data folder where we run the command fs.readfile
// using the __dirname variable to start our path

const data = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  'utf-8'
);
// our data is parsed into an object will be needed for later
const productDataObject = JSON.parse(data);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const server = http.createServer((req, res) => {
  // Parse the request URL to extract the query parameters and the pathname.
  // The query parameters are stored in the 'query' variable, while the pathname represents the URL's path.
  // query variable is included in node
  const { query, pathname } = url.parse(req.url, true);
  //overview page
  if (pathname === '/' || pathname === '/overview') {
    // render our overview page
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    // loop over data object with argument card to separate each of our objects and map them to a card
    const cardsHtml = productDataObject
      .map(
        (card) => replaceTemplate(tempCard, card)
        // in each iteration we replace our tempCard with our card that is mapped to our productDataObject and using join to make it into a string to render on our page
      )
      .join('');
    // console.log(cardsHtml);
    // generate our output html by replacing the content of {%PRODUCT_CARDS%} in the route tempOverview with the output of our cardsHtml function
    const outputHtml = tempOverview.replace(
      '{%PRODUCT_CARDS%}',
      cardsHtml
    );
    res.end(outputHtml);

    // product page
  } else if (pathname === '/product') {
    // build our page
    // figure out product to display by creating a product variable with the id specified in the query string
    const product = productDataObject[query.id];
    // use our replaceTemplate function to fill in our product page template
    const productOutput = replaceTemplate(tempProduct, product);
    res.end(productOutput);

    //api
  } else if (pathname === '/api') {
    //send data
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(data);

    //404 not found
  } else {
    // error handling
    res.writeHead(404, {
      // headers
      'Content-type': 'text/html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1 style="color: red;"> Page Not found </h1>');
  }
  //console.log(req.url); // logs the url of the request
}); // created a server object named "server" which will return a simple message

// instruct our server to listen for queries on 127.0.0.1:8888
server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
