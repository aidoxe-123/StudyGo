const db = require('./../firebaseDb').firestore();
const express = require('express');
const check = require('./../handling-error');
const router = express();

module.exports = router;

// given the id, return the complete list of task in to do list
// (id) -> (tasks)
router.post('/to-do-list/all', (req, res) => {

    check(req.body, ["id"]);

    let response = {
        StatusCode: 0,
        msg: "",
        tasks: []
    }

    let docRef = db.collection('users').doc(req.body.id);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                response.StatusCode = 404;
                response.msg = "Invalid ID";

                res.send(response)
            } else {
                docRef.collection('to_do_list').get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            response.tasks.push({
                                id: doc.id,
                                date: doc.data().date,
                                task: doc.data().title
                            });
                        });
                    }).then(snapshot => {
                        response.tasks.sort((task1, task2) => (task1.date < task2.date) ? -1 : 1);
                        response.StatusCode = 200;

                        res.send(response);
                    })
            }
        })
})

//given the user id, add the task
//(id, task) -> (taskId) (task = {title, date})
router.post('/to-do-list', (req, res) => {

    check(req.body, ["id", "task"]);

    let response = {
        StatusCode: 0,
        msg: "",
        taskId: ""
    }

    let docRef = db.collection('users').doc(req.body.id);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                response.StatusCode = 404;
                response.msg = "Invalid ID";

                res.send(response);
            } else {
                docRef.collection('to_do_list').add({
                    title: req.body.task.title,
                    date: req.body.task.date
                }).then(ref => {
                    response.StatusCode = 200;
                    response.taskId = ref.id;

                    res.send(response);
                })
            }
        });
})

// given the user id and task id, change the task (either name or date or both)
// (userId, taskId, newTitle, newDate) -> ()
router.put('/to-do-list', (req, res) => {

    check(req.body, ["userId", "taskId", "newTitle", "newDate"]);

    let response = {
        StatusCode: 0,
        msg: ""
    }

    let docRef = db.collection('users').doc(req.body.userId);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                response.StatusCode = 404;
                response.msg = "Invalid user ID";

                res.send(response);
            } else {

                let taskRef = docRef.collection('to_do_list').doc(req.body.taskId);

                taskRef.get()
                    .then(task => {
                        if (!task.exists) {
                            response.StatusCode = 404;
                            response.msg = "Invalid task ID";

                            res.send(response);
                        } else {
                            let newData = {
                                title: req.body.newTitle,
                                date: req.body.newDate
                            }

                            taskRef.set(newData);

                            response.StatusCode = 200;

                            res.send(response);
                        }
                    });
            }
        });
})

// given the user id and task id, delete the task
// (userId, taskId) -> ()
router.delete('/to-do-list', (req, res) => {

    check(req.body, ["userId", "taskId"]);

    let response = {
        StatusCode: 0,
        msg: ""
    }

    let docRef = db.collection('users').doc(req.body.userId);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                response.StatusCode = 404;
                response.msg = "Invalid user ID";

                res.send(response);
            } else {
                let taskRef = docRef.collection('to_do_list').doc(req.body.taskId);
                taskRef.get()
                    .then(task => {
                        if (!task.exists) {
                            response.StatusCode = 404;
                            response.msg = "Invalid task ID";

                            res.send(response);
                        } else {
                            taskRef.delete()

                            response.StatusCode = 200;
                            res.send(response)
                        }
                    });
            }
        });
})
