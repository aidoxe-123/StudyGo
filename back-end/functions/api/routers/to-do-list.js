const db = require('./../firebaseDb').firestore();
const express = require('express');

const router = express();

module.exports = router;

// given the id, return the complete list of task in to do list
// (id) -> (idValid, tasks)
router.post('/to-do-list', (req, res) => {
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
router.post('/to-do-list/add', (req, res) => {
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

