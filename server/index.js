require('dotenv').config();

// require all necessary files
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
// set server to app variables
const app = express();
// set port to PORT or 3000
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// route root call to index.html
app.use('/', express.static(path.join(__dirname, '../public')));
// server listen on PORT
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});