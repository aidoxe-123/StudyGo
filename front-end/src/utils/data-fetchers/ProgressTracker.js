// import db from '../../../firebaseDb'

//console.log(Promise.resolve(db.firestore().collection('users').doc('hahahihi@gmail.com1590422614818').get()));
export const getModules = async (userId) => {
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId
        })
    }
    let res = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/modules/all', requestOption)
    res = await res.json();
    res = res.modules;
    let output = Object.keys(res).map(key => ({ key: key, text: res[key] }));
    return { data: output };
}

export const deleteModule = async (userId, moduleId) => {
    let requestOption = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            moduleId: moduleId
        })
    }
    await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/modules', requestOption)
}

export const addModule = async (userId, moduleId) => {
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            moduleId: moduleId
        })
    }
    await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/modules', requestOption)
}

export const getTasks = async (userId, moduleId, isFinished) => {
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            moduleId: moduleId,
            isFinished: isFinished
        })
    }
    let res = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks/all', requestOption)
    res = await res.json();
    if (res.StatusCode !== 200) throw new Error(res.msg);
    res = res.tasks;
    return res;
}

export const addTask = async (userId, moduleId, title, isFinished, details) => {
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            moduleId: moduleId,
            isFinished: isFinished,
            title: title,
            details: details
        })
    }
    let res = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks', requestOption)
}

export const updateTask = async (userId, taskId, title, isFinished, details) => {
    let requestOption = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            taskId: taskId,
            isFinished: isFinished,
            title: title,
            details: details
        })
    }
    let res = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks', requestOption)
    console.log(await res.json());
}

export const deleteTasks = async (userId, taskId) => {
    let requestOption = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            taskId: taskId
        })
    }
    await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks', requestOption)
}