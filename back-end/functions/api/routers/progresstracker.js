const firebase = require('./../firebaseDb');
const db = firebase.firestore();
const express = require('express');
const { v4 } = require('uuid');
const router = express();
const { wrapper, success } = require('./../utility');
const admin = require('firebase-admin');

module.exports = router;

// add new module to server
// (moduleId, title) => ()
router.post('/progress-tracker/modules/admin', wrapper(async (req, res, next) => {
    const { moduleId, title } = req.body;
    let moduleRef = db.collection('Modules').doc("allModules");
    if ((await moduleRef.get()).get(moduleId) !== undefined) {
        res.status(409);
        throw new Error("This module ID is already exist");
    }
    let batch = db.batch();
    batch.update(moduleRef, { [moduleId]: title });
    batch.set(db.collection('Modules').doc(moduleId), { studentN: 0, tasks: [] });
    await batch.commit();
    res.send(success({}))
}))

// register a module
// (userId, moduleId) => ()
router.post('/progress-tracker/modules', wrapper(async (req, res, next) => {
    const { userId, moduleId } = req.body;

    let idDoc = await db.collection('users').doc(userId).get();
    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    let moduleDoc = await db.collection("Modules").doc("allModules").get();

    let title = moduleDoc.get(moduleId);
    if (title === undefined) {
        res.status(404);
        throw new Error("Invalid module");
    }

    let modules = idDoc.get("modules");
    if (modules === undefined) modules = {};
    if (modules[moduleId] !== undefined) {
        res.status(409);
        throw new Error("Module already registered");
    }
    modules[moduleId] = title;

    let batch = db.batch();
    batch.update(idDoc.ref,
        { modules: modules })

    batch.update(db.collection("Modules").doc(moduleId),
        { studentN: firebase.firestore.FieldValue.increment(1) })

    await batch.commit();
    res.send(success({}));
}));

// return all registered modules of user
// (userId) => (modules)
router.post('/progress-tracker/modules/all', wrapper(async (req, res, next) => {
    const { userId } = req.body;
    let idDoc = await db.collection('users').doc(userId).get();
    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    let modules = idDoc.get("modules");

    res.send(success({ modules: modules }));
}))

// delete a module of user
// (userId, moduleId) => ()
router.delete('/progress-tracker/modules', wrapper(async (req, res, next) => {
    const { userId, moduleId } = req.body;

    let idDoc = await db.collection('users').doc(userId).get();
    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    let moduleDoc = await db.collection("Modules").doc("allModules").get();

    let title = moduleDoc.get(moduleId);
    if (title === undefined) {
        res.status(404);
        throw new Error("Invalid module");
    }

    let modules = idDoc.get("modules");
    if (modules === undefined || modules[moduleId] === undefined) {
        res.status(409);
        throw new Error("Unregistered module");
    }
    delete modules[moduleId];

    let batch = db.batch();
    batch.update(idDoc.ref,
        { modules: modules })

    batch.update(db.collection("Modules").doc(moduleId),
        { studentN: firebase.firestore.FieldValue.increment(-1) })

    await batch.commit();
    res.send(success({}));
}));

// add new task
// (userId, moduleId, title, isFinished, details) => (taskId)
router.post('/progress-tracker/tasks', wrapper(async (req, res, next) => {
    const { userId, moduleId, title, isFinished, details } = req.body;
    // check user id
    let idDoc = await db.collection('users').doc(userId).get();
    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid ID");
    }

    //check module id
    let modules = idDoc.get("modules");
    if (modules === undefined || modules[moduleId] === undefined) {
        res.status(409);
        throw new Error("Unregistered module");
    }

    let taskId
    do { taskId = v4(); } while ((await idDoc.ref.collection("ProgressTracker").doc(taskId).get()).exists)

    //add new task into users/userid/progresstracker/taskid
    await idDoc.ref.collection("ProgressTracker").doc(taskId).set({
        moduleId: moduleId,
        title: title,
        isFinished: isFinished,
        details: details
    })
    res.send(success({ taskId: taskId }));
}))

// update a task
// (userId, taskId, title, isFinished, details) => ()
router.put('/progress-tracker/tasks', wrapper(async (req, res, next) => {
    const { userId, taskId, title, isFinished, details } = req.body;
    // check user id
    let idDoc = await db.collection('users').doc(userId).get();
    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid user ID");
    }

    let taskDoc = await idDoc.ref.collection("ProgressTracker").doc(taskId).get();
    if (!taskDoc.exists) {
        res.status(404);
        throw new Error("Invalid task ID");
    }

    await idDoc.ref.collection("ProgressTracker").doc(taskId).update({
        isFinished: isFinished,
        details: details,
        title: title
    })
    res.send(success({}));
}))

// delete a task
// (userId, taskId) => ()
router.delete('/progress-tracker/tasks', wrapper(async (req, res, next) => {
    const { userId, taskId } = req.body;
    // check user id
    let idDoc = await db.collection('users').doc(userId).get();
    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid user ID");
    }

    let taskDoc = await idDoc.ref.collection("ProgressTracker").doc(taskId).get();
    if (!taskDoc.exists) {
        res.status(404);
        throw new Error("Invalid task ID");
    }
    await idDoc.ref.collection("ProgressTracker").doc(taskId).delete();
    res.send(success({}));
}))

// get all tasks (either finished or unfinished)
// (userId, moduleId, isFinished) => (tasks)
router.post('/progress-tracker/tasks/all', wrapper(async (req, res, next) => {
    const { userId, moduleId, isFinished } = req.body;
    // check user id
    let idDoc = await db.collection('users').doc(userId).get();
    if (!idDoc.exists) {
        res.status(404);
        throw new Error("Invalid user ID");
    }

    //check module id
    let modules = idDoc.get("modules");
    if (modules === undefined || modules[moduleId] === undefined) {
        res.status(409);
        throw new Error("Unregistered module");
    }

    let query = await idDoc.ref.collection("ProgressTracker").where("moduleId", '==', moduleId).where("isFinished", '==', isFinished).get();
    let output = query.docs.map(doc => { let out = doc.data(); out.taskId = doc.id; return out; });
    res.send(success({ tasks: output }));
}))

// add new task to server
// (moduleId, title) => (taskId)
router.post('/progress-tracker/tasks/addTask/admin', wrapper(async (req, res, next) => {
    const { moduleId, title } = req.body;

    let moduleDoc = await db.collection("Modules").doc(moduleId).get();

    if (!moduleDoc.exists) {
        res.status(404);
        throw new Error("Invalid module");
    }

    let names = moduleDoc.get("tasks");

    let taskId;
    do { taskId = v4() } while (names.includes(taskId));

    let batch = db.batch();
    batch.set(db.collection("TaskPT").doc(taskId),
        { moduleId: moduleId, title: title, registered: 0, completed: 0 });
    batch.update(db.collection("Modules").doc(moduleId),
        { tasks: firebase.firestore.FieldValue.arrayUnion(taskId) })

    await batch.commit();
    res.send(success({ taskId: taskId }))
}))

