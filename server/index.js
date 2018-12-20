require('dotenv').config();

// require all necessary files
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

// webhoiseio price api
const webhoseio = require('webhoseio');
// semantics price api
const sem3 = require('semantics3-node')(process.env.SEMANTICS_API_KEY, process.env.SEMANTICS_API_SECRET);

const webhoseClient = webhoseio.config({ token: process.env.WEBHOSE_API_KEY });
// set server to app variable
const app = express();
// set port to PORT or 3000
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// route root call to index.html
app.use('/', express.static(path.join(__dirname, '../public')));

// Handles all requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// get data
app.get('/priceresults', (req, res) => {
  sem3.products.products_field('search', `${req.query.name}`);
  sem3.products.products_field('activeproductsonly', 1);
  sem3.products.products_field('fields', ['price', 'listprice', 'sitedetails', 'images']);

  sem3.products.get_products((err, products) => {
    if (err) {
      console.log('Couldn\'t execute Request: get_products');
    }
    res.status(200).send(products);
  });
});

// server listen on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});

// Alternate API for data
// app.get('/priceresults', (req, res) => {
//   const queryParams = {
//     'q': `name:${req.name}`,
//   };
//   webhoseClient.query('productFilter', queryParams)
//     .then((output) => {
//       res.status(200).send(output);
//     })
//     .catch((error) => {
//       if (error) {
//         console.log('Couldn\'t execute Request:', error);
//       }
//     });
// });
