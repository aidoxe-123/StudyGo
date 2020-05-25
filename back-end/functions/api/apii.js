const db = require('./firebaseDb').firestore();
const express = require('express');
const bodyParser = require('body-parser');

// set up express app
const router = express();
const main = express();

main.use('/api/v1', router);
main.use(bodyParser.json());

module.exports = main;

// create new user (or not if the account with the given mail is exist)
// (email, password) -> (isSuccess)
router.post('/register', (req, res) => {
    let docRef = db.collection('mails').doc(req.body.email);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                let newId = idGen(req.body.email);

                docRef.set({
                    id: newId,
                    password: req.body.password
                });

                db.collection('users').doc(newId).set({
                    email: req.body.email,
                    password: req.body.password
                });

                res.send({
                    emailUsed: false
                })
            } else {
                res.send({
                    emailUsed: true
                })
            }
        });
})

// get the user id with the email and password
// (email, password) -> (accExist, passwordCorrect, userId)
router.post('/login', (req, res) => {
    let docRef = db.collection('mails').doc(req.body.email);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                res.send({
                    accExist: false
                });
            } else if (req.body.password !== doc.data().password) {
                res.send({
                    accExist: true,
                    passwordCorrect: false
                });
            } else {
                res.send({
                    accExist: true,
                    passwordCorrect: true,
                    userId: doc.data().id
                });
            }
        });
});

// get the user information with the id
// () -> (idValid, email, password)
router.get('/users/:id', (req, res) => {
    let docRef = db.collection('users').doc(req.params.id);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                res.send({
                    idValid: false
                })
            } else {
                res.send({
                    idValid: true,
                    email: doc.data().email,
                    password: doc.data().password
                })
            }
        });
})

function idGen(email) {
    return email + new Date().getTime();
}

