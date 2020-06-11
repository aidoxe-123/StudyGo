const db = require('./../firebaseDb').firestore();
const express = require('express');
const router = express();
const { wrapper, success } = require('./../utility');
module.exports = router;

// given the id, month and year, return the array of date of events
// (userId, month, year) => (array of object)
router.post('/calendar/events', wrapper(async (req, res, next) => {
    const { userId, year, month } = req.body;

    const numberOfDate = (month, year) => {
        if (month < 1 || month > 12) return -1;
        const dates = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (((year % 4 === 0) && (year % 100 != 0)) || (year % 400 === 0)) dates[2]++;
        return dates[month];
    }

    function pad(data, month, year) {
        if (data === undefined) data = {};
        for (let i = 1; i <= numberOfDate(month, year); i++) {
            let str = year + '-' + (month < 10 ? "0" : "") + month + '-' + (i < 10 ? "0" : "") + i;
            if (data[str] === undefined) data[str] = [];
            else {
                data[str] = Object.values(data[str]);
            }
        }
        return data;
    }

    let idDoc = await db.collection('users').doc(userId).get();

    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    let events = await idDoc.ref.collection('Calendar').doc(year + '-' + month).get().then(doc => doc.data());

    let dataa = pad(events, month, year);

    res.send(success({ events: dataa }));
}));

// add an event into the calendar
// (userId, date, event) => (eventId)
router.post('/calendar', wrapper(async (req, res, next) => {
    const { userId, date, event } = req.body;
    event.id = new Date().getTime() + Math.random().toString();

    let idDoc = await db.collection('users').doc(userId).get();

    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    const [year, month, day] = date.split('-').map(str => parseInt(str));

    let monthRef = idDoc.ref.collection('Calendar').doc(year + '-' + month);
    let monthDoc = await monthRef.get();

    if (monthDoc.exists) {
        let data = monthDoc.get(date);
        if (data === undefined) data = {};
        else if (data[event.id] !== undefined) throw new Error("Something when wrong");

        data[event.id] = event;
        await monthRef.update({ [date]: data });
    } else {
        await monthRef.set({ [date]: { [event.id]: event } });
    }

    res.send(success({ eventId: event.id }));
}));

// update an event into the calendar
// (userId, date, newEvent, eventId) => ()
router.put('/calendar', wrapper(async (req, res, next) => {
    const { userId, date, newEvent, eventId } = req.body;
    newEvent.id = eventId;
    let idDoc = await db.collection('users').doc(userId).get();

    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid user ID");
    }

    const [year, month, day] = date.split('-').map(str => parseInt(str));

    let monthDoc = await idDoc.ref.collection('Calendar').doc(year + '-' + month).get();

    let data;

    if (monthDoc.exists && (data = monthDoc.get(date)) !== undefined && (data[eventId] !== undefined)) {
        data[eventId] = newEvent;
        await monthDoc.ref.update({ [date]: data });
        res.send(success({}));
    } else {
        res.status(404);
        throw new Error("Invalid date or event ID");
    }
}));

// update an event into the calendar
// (userId, date, eventId) => ()
router.delete('/calendar', wrapper(async (req, res, next) => {
    const { userId, date, eventId } = req.body;
    let idDoc = await db.collection('users').doc(userId).get();

    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    const [year, month, day] = date.split('-').map(str => parseInt(str));

    let monthDoc = await idDoc.ref.collection('Calendar').doc(year + '-' + month).get();

    let data;
    if (monthDoc.exists && (data = monthDoc.get(date)) !== undefined && (data[eventId] !== undefined)) {
        delete data[eventId];
        await monthDoc.ref.update({ [date]: data });
        res.send(success({}));
    } else {
        res.status(404);
        throw new Error("Invalid date or event ID");
    }
}));