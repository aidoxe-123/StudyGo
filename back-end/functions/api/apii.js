const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler, pretestChecker } = require('./utility');


// set up express app
const main = express();

main.use(bodyParser.json());
main.use(pretestChecker);
main.use('/api/v1', require('./routers/users'));
main.use('/api/v1', require('./routers/to-do-list'));
main.use('/api/v1', require('./routers/calendar'));
main.use('/api/v1', require('./routers/timetable'));
main.use('/api/v1', require('./routers/progresstracker'));
main.use('/api/v1', require('./routers/debug'));
main.use(errorHandler);


module.exports = main;

main.listen(3000, () => console.log("Othinus is listening..."));
