const db = require('./../firebaseDb').firestore();
const express = require('express');
const router = express();
const { wrapper, success } = require('./../utility');

module.exports = router;

// given the id, return the complete list of task in to do list
// (id) -> (tasks)
router.post('/to-do-list/all', wrapper(async (req, res) => {
    let doc = await db.collection('users').doc(req.body.id).get();

    if (!doc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    let tasks = [];
    let snapshot = (await doc.ref.collection('to_do_list').get()).docs;
    for (docc of snapshot) {
        tasks.push({
            id: docc.id,
            date: docc.get('date'),
            task: docc.get('title')
        })
    }
    tasks.sort((task1, task2) => (task1.date < task2.date) ? -1 : 1);

    res.send(success({ tasks: tasks }));
}));

//given the user id, add the task
//(id, task) -> (taskId) (task = {title, date})
router.post('/to-do-list', wrapper(async (req, res) => {
    const { task, id } = req.body;
    let doc = await db.collection('users').doc(id).get();

    if (!doc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    doc.ref.collection('to_do_list').add({
        title: task.title,
        date: task.date
    }).then(ref =>
        res.send(success({ taskId: ref.id }))
    )
}));

// given the user id and task id, change the task (either name or date or both)
// (userId, taskId, newTitle, newDate) -> ()
router.put('/to-do-list', wrapper(async (req, res) => {
    const { userId, taskId, newTitle, newDate } = req.body;

    let doc = await db.collection('users').doc(userId).get();

    if (!doc.exists) {
        res.status(404);
        throw new Error("Invalid user ID");
    }

    let task = await doc.ref.collection('to_do_list').doc(taskId).get();

    if (!task.exists) {
        res.status(404);
        throw new Error("Invalid task ID");
    }

    await task.ref.set({ title: newTitle, date: newDate });

    res.send(success({}));
}));

// given the user id and task id, delete the task
// (userId, taskId) -> ()
router.delete('/to-do-list', wrapper(async (req, res) => {
    let doc = await db.collection('users').doc(req.body.userId).get();

    if (!doc.exists) {
        res.status(404);
        throw new Error("Invalid user ID");
    }

    let task = await doc.ref.collection('to_do_list').doc(req.body.taskId).get();

    if (!task.exists) {
        res.status(404);
        throw new Error("Invalid task ID");
    }

    await task.ref.delete();
    res.send(success({}));
}));
