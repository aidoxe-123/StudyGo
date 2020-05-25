const functions = require('firebase-functions');
const apii = require('./api');

exports.webApi = functions.https.onRequest(apii);
