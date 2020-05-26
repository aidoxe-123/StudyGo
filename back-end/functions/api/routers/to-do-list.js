const db = require('./../firebaseDb').firestore();
const express = require('express');

const router = express();

module.exports = router;

// given the id, return the complete list of task in to do list
// (id) -> (idValid, tasks)
router.post('/to-do-list/all', (req, res) => {
    let docRef = db.collection('users').doc(req.body.id);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                res.send({
                    idValid: false
                })
            } else {
                let list = [];
                docRef.collection('to_do_list').get()
                    .then(snapshot => {
                        snapshot.forEach(doc => {
                            list.push({
                                id: doc.id,
                                date: doc.data().date,
                                task: doc.data().title
                            });
                        });
                    }).then(snapshot => {
                        list.sort((task1, task2) => (task1.date < task2.date) ? -1 : 1);
                        res.send({ idValid: true, tasks: list });
                    })
            }
        });
})

//given the user id, add the task
//(id, task) -> (idValid, taskId) (task = {title, date})
router.post('/to-do-list', (req, res) => {
    let docRef = db.collection('users').doc(req.body.id);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                res.send({
                    idValid: false
                })
            } else {
                docRef.collection('to_do_list').add({
                    title: req.body.task.title,
                    date: req.body.task.date
                }).then(ref => {
                    res.send({
                        idValid: true,
                        taskId: ref.id
                    })
                })
            }
        });
})

// given the user id and task id, change the task (either name or date or both)
// (userId, taskId, newTitle, newDate) -> (userIdValid, taskIdValid)
router.put('/to-do-list', (req, res) => {
    let docRef = db.collection('users').doc(req.body.userId);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                res.send({
                    userIdValid: false
                })
            } else {
                let taskRef = docRef.collection('to_do_list').doc(req.body.taskId);
                taskRef.get()
                    .then(task => {
                        if (!task.exists) {
                            res.send({
                                userIdValid: true,
                                taskIdValid: false
                            })
                        } else {
                            let newData = {
                                title: req.body.newTitle,
                                date: req.body.newDate
                            }
                            taskRef.set(newData);
                            res.send({
                                userIdValid: true,
                                taskIdValid: true
                            })
                        }
                    });
            }
        })
})

// given the user id and task id, delete the task
// (userId, taskId) -> (userIdValid, taskIdValid)
router.delete('/to-do-list', (req, res) => {
    let docRef = db.collection('users').doc(req.body.userId);

    docRef.get()
        .then(doc => {
            if (!doc.exists) {
                res.send({
                    userIdValid: false
                })
            } else {
                let taskRef = docRef.collection('to_do_list').doc(req.body.taskId);
                taskRef.get()
                    .then(task => {
                        if (!task.exists) {
                            res.send({
                                userIdValid: true,
                                taskIdValid: false
                            })
                        } else {
                            taskRef.delete()
                            res.send({
                                userIdValid: true,
                                taskIdValid: true
                            })
                        }
                    });
            }
        })
})
