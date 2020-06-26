import { AsyncStorage } from 'react-native';

export const updateModulesData = async () => {
    try {
        let currentTime = new Date().getTime();
        let lastTime = await AsyncStorage.getItem("lastUpdateModules");
        if (lastTime !== null && currentTime - lastTime < 86400000) return;

        let requestOption = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        let res = await fetch('https://api.nusmods.com/v2/2019-2020/moduleList.json', requestOption).then(res => res.json());
        await AsyncStorage.setItem(
            "lastUpdateModules",
            currentTime.toString()
        );
        await AsyncStorage.setItem(
            "allModules",
            JSON.stringify(res)
        )
    } catch (error) {
        console.log(error);
    }
}

export const getModulesData = async () => {
    try {
        let result = await AsyncStorage.getItem("allModules");
        return JSON.parse(result);
    } catch (error) {
        console.log(error);
    }
}

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
    if (res == undefined) res = {}
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

export const addModule = async (userId, moduleId, title) => {
    let requestOption2 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title,
            moduleId: moduleId
        })
    }
    let res2 = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/modules/admin', requestOption2)
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            moduleId: moduleId
        })
    }
    let res = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/modules', requestOption)
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
    let res = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks', requestOption).then(res => res.json());
    return res.taskId;
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
}

export const deleteTask = async (userId, taskId) => {
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

export const hostTask = async (moduleId, title, userId) => {
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            moduleId: moduleId,
            title: title,
            userId: userId
        })
    }
    let res = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks/admin', requestOption).then(res => res.json());
    return res.taskId;
}

export const linkTask = async (userId, taskId, moduleId, refId, isHost) => {
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            moduleId: moduleId,
            taskId: taskId,
            refId: refId,
            isHost: isHost,
            userId: userId
        })
    }
    await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks/ref', requestOption);
}

export const editTitle = async (userId, moduleId, taskId, newTitle) => {
    let requestOption = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: userId,
            moduleId: moduleId,
            taskId: taskId,
            newTitle: newTitle
        })
    }
    await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks/admin/title', requestOption);
}

export const editStat = async (moduleId, taskId, newRegistered, newCompleted) => {
    let requestOption = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            moduleId: moduleId,
            taskId: taskId,
            newRegistered: newRegistered,
            newCompleted: newCompleted
        })
    }
    await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks/admin/stat', requestOption);
}

export const getPublicTasks = async (moduleId) => {
    let requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            moduleId: moduleId,
        })
    }
    let res = await fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/progress-tracker/tasks/admin/all', requestOption).then(res => res.json());
    return res.allTasks;
}
