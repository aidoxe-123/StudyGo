const db = require('./../firebaseDb').firestore();
const express = require('express');
const printErr = require('./../handling-error');
const router = express();

module.exports = router;



// create new user (or not if the account with the given mail is exist)
// (email, password, username) -> ()
router.post('/register', (req, res) => {
    let response = {
        StatusCode: 0,
        msg: ""
    }

    let docRef = db.collection('mails').doc(req.body.email);

    function idGen(email) {
        return email + new Date().getTime();
    }

    try {
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
                        password: req.body.password,
                        username: req.body.username
                    });

                    response.StatusCode = 200;

                    res.send(response)
                } else {
                    response.StatusCode = 409;
                    response.msg = "This email is already registered";

                    res.send(response);
                }
            });
    } catch (err) {
        response.StatusCode = 500;
        response.msg = printErr("POST /register", req.body, err);

        res.send(response);
    };
})

// get the user id with the email and password
// (email, password) -> (userId)
router.post('/login', (req, res) => {
    let response = {
        StatusCode: 0,
        msg: "",
        userId: 0
    }

    try {
        let docRef = db.collection('mails').doc(req.body.email);

        docRef.get()
            .then(doc => {
                if (!doc.exists || (req.body.password !== doc.data().password)) {
                    response.StatusCode = 401;
                    response.msg = "Incorrect email or password";

                    res.send(response);
                } else {
                    response.StatusCode = 200;
                    response.userId = doc.data().id;

                    res.send(response);
                }
            });
    } catch (err) {
        response.StatusCode = 500;
        response.msg = printErr("POST /login", req.body, err);

        res.send(response);
    };
});

// get the user information with the id
// (id) -> (email, password, username)
router.post('/users', (req, res) => {
    let response = {
        StatusCode: 0,
        msg: "",
        email: "",
        password: "",
        username: ""
    }
    try {
        let docRef = db.collection('users').doc(req.body.id);

        docRef.get()
            .then(doc => {
                if (!doc.exists) {
                    response.StatusCode = 404;
                    response.msg = "Invalid ID";

                    res.send(response);
                } else {
                    response.StatusCode = 200;
                    response.email = doc.data().email;
                    response.password = doc.data().password;
                    response.username = doc.data().username;

                    res.send(response);
                }
            });
    } catch (err) {
        response.StatusCode = 500;
        response.msg = printErr("POST /users", req.body, err);

        res.send(response);
    };
})

