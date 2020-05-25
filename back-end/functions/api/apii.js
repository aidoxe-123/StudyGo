const express = require('express');
const bodyParser = require('body-parser');

// set up express app
const main = express();

main.use('/api/v1', require('./routers/users'));
main.use('/api/v1', require('./routers/to-do-list'));
main.use(bodyParser.json());

module.exports = main;
