const db = require('./../firebaseDb').firestore();
const express = require('express');
const router = express();
const { wrapper, success } = require('./../utility');
module.exports = router;

// testing route
// (input) -> (output)
router.post('/test', (req, res) => {
    let response = {
        StatusCode: 0,
        msg: "",
        output: ""
    }

    const needed = ['input'];
    if (!needed.every(key => Object.keys(req.body).includes(key))) {
        response.StatusCode = 422;
        response.msg = "Missing required field(s) at " + req.originalUrl;

        res.send(response);
        return;
    }

    response.StatusCode = 200;
    response.msg = "Success";
    response.output = req.body.input;

    res.send(response);

})


// create new user (or not if the account with the given mail is exist)
// (email, password, username) -> ()
router.post('/register', wrapper(async (req, res) => {
    const { email, password, username } = req.body;

    let doc = await db.collection('mails').doc(email).get();

    if (doc.exists) {
        res.status(409);
        throw new Error("This email is already registered");
    }

    let newId = email + new Date().getTime();

    await Promise.all([
        doc.ref.set({
            id: newId,
            password: password
        }),
        db.collection('users').doc(newId).set({
            email: email,
            password: password,
            username: username
        }),
        db.collection('Timetable').doc(userId).set({
            "monday": [],
            "tuesday": [],
            "wednesday": [],
            "thursday": [],
            "friday": [],
            "saturday": [],
            "sunday": [],
            "map": {}
        })
    ]);

    res.send(success({}));
}));

// get the user id with the email and password
// (email, password) -> (userId)
router.post('/login', wrapper(async (req, res) => {
    let doc = await db.collection('mails').doc(req.body.email).get();

    if (!doc.exists || (req.body.password !== doc.data().password)) {
        res.status(401);
        throw new Error("Incorrect email or password");
    }

    res.send(success({ userId: doc.data().id }));
}));

// get the user information with the id
// (id) -> (email, password, username)
router.post('/users', wrapper(async (req, res) => {

    let doc = await db.collection('users').doc(req.body.id).get();

    if (!doc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    res.send(success({
        email: doc.data().email,
        password: doc.data().password,
        username: doc.data().username
    }));
}));

