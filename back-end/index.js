const express = require('express');
const bodyParser = require('body-parser');

// set up express app
const app = express();

app.use(bodyParser.json());

// initialize routes
app.use('/api',require('./api'));

// listen for requests
// currently only work with "localhost:4000/..."
app.listen(process.env.port || 4000, () => {
    console.log('Running...');
});

