const db = require('./../firebaseDb').firestore();
const express = require('express');
const { v4 } = require('uuid');
const router = express();
const { wrapper, success } = require('./../utility');

module.exports = router;

function checkValidDay(day) {
    if (!["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].includes(day)) {
        throw new Error("Invalid day");
    }
}

// return the timetable
// (userId) => (object of array)
router.post('/timetable/all', wrapper(async (req, res, next) => {
    const { userId } = req.body;

    let idDoc = await db.collection('users').doc(userId).get();

    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    let timetable = (await db.collection('Timetable').doc(userId).get()).data();
    delete timetable.map;

    res.send(success({ timetable: timetable }));
}));

// add task to timetable
// (userId, day in week, task) => (taskId)
router.post('/timetable', wrapper(async (req, res, next) => {
    const { userId, day, task } = req.body;
    task.id = v4();
    checkValidDay(day);

    let idDoc = await db.collection('users').doc(userId).get();

    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    // the doc that contain all days
    let timetableDoc = await db.collection('Timetable').doc(userId).get();

    if (!timetableDoc.exists) {
        // this should be delete because timetable initialization should happen
        // when user account is created
        await timetableDoc.ref.set({
            "monday": [],
            "tuesday": [],
            "wednesday": [],
            "thursday": [],
            "friday": [],
            "saturday": [],
            "sunday": [],
            "map": {}
        })
        timetableDoc = await db.collection('Timetable').doc(userId).get();
    }

    let dayData = timetableDoc.get(day);
    dayData.push(task);

    let mapping = timetableDoc.get("map");
    mapping[task.id] = day;

    console.log("here0");
    await Promise.all([
        timetableDoc.ref.update({ [day]: dayData }),
        timetableDoc.ref.update({ map: mapping })
    ]);

    console.log("here1");
    res.send(success({ taskId: task.id }));
}));

// update a task
// (userId, taskId, newTask, newDay) => ()
router.put('/timetable', wrapper(async (req, res, next) => {
    const { userId, taskId, newTask, newDay } = req.body;
    newTask.id = taskId;
    checkValidDay(newDay);

    let timetableDoc = await db.collection('Timetable').doc(userId).get();

    if (!timetableDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    let mapping = timetableDoc.get("map");

    if (mapping[taskId] === undefined) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    if (mapping[taskId] == newDay) {
        let dayData = timetableDoc.get(newDay);
        for (let i = 0; i < dayData.length; i++) {
            if (dayData[i].id === taskId) {
                dayData[i] = newTask;
                break;
            }
        }
        await timetableDoc.ref.update({ [newDay]: dayData });
    } else {
        let oldDay = mapping[taskId];
        let oldDayData = timetableDoc.get(oldDay);
        for (let i = 0; i < oldDayData.length; i++) {
            if (oldDayData[i].id === taskId) {
                oldDayData.splice(i, 1);
                break;
            }
        }

        let newDayData = timetableDoc.get(newDay);
        newDayData.push(newTask);

        mapping[taskId] = newDay;

        await Promise.all([
            timetableDoc.ref.update({ [newDay]: newDayData }),
            timetableDoc.ref.update({ [oldDay]: oldDayData }),
            timetableDoc.ref.update({ map: mapping })
        ]);
    }
    res.send(success({}));
}));

// delete a task
// (userId, taskId) => ()
router.delete('/timetable', wrapper(async (req, res, next) => {
    const { userId, taskId } = req.body;

    let timetableDoc = await db.collection('Timetable').doc(userId).get();
    if (!timetableDoc.exists) {
        res.status(404);
        throw new Error("Invalid user ID");
    }

    let mapping = timetableDoc.get("map");
    if (mapping[taskId] === undefined) {
        res.status(404);
        throw new Error("Invalid task ID");
    }

    let day = mapping[taskId];
    let dayData = timetableDoc.get(day);
    for (let i = 0; i < dayData.length; i++) {
        if (dayData[i].id === taskId) {
            console.log(dayData);
            dayData.splice(i, 1);
            console.log(dayData);
            break;
        }
    }

    delete mapping[taskId];

    await Promise.all([
        timetableDoc.ref.update({ map: mapping }),
        timetableDoc.ref.update({ [day]: dayData })
    ])
    res.send(success({}));
}))