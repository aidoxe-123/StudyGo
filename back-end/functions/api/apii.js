const express = require('express');
const bodyParser = require('body-parser');

// set up express app
const main = express();

main.use('/api/v1', require('./routers/users'));
main.use('/api/v1', require('./routers/to-do-list'));
main.use((err, req, res, next) => {

    const output = "route: " + req.method + " " + req.originalUrl + "\n" +
        "input: " + JSON.stringify(req.body) + "\n" +
        "error: " + err.message;

    const response = {
        statusCode: 500,
        msg: output
    }

    console.log(output);
    res.status(500).send(response);
});

main.use(bodyParser.json());

module.exports = main;
