const express = require('express');
const router = express.Router();
const db = require('./firebaseDb').firestore();

// create new user (or not if the account with the given mail is exist)
// (email, password) -> (isSuccess)
router.post('/users', (req, res) => {
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
                    isSuccess: true
                })
            } else {
                res.send({
                    isSuccess: false
                })
            }
        })
        .catch(err => { 
            console.log('Error getting document', err);
        });
})

// get the user id with the email and password
// (email, password) -> (accExist, passwordCorrect, userId)
router.get('/users', (req, res) => {
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
        })
        .catch(err => {
            console.log('Error getting document', err);
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
        })
        .catch(err => {
            console.log('Error getting document', err);
        })
})

module.exports = router;

function idGen(email) {
    return email + new Date().getTime();
}