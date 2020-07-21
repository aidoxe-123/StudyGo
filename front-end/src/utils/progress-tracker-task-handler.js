import { addTask, updateTask, hostTask, linkTask, editStat, editTitle, deleteTask, getTasks, deleteModule } from "./data-fetchers/ProgressTracker";

// deal with personal task
export const addOrEdit = async (isAdd, userId, moduleId, taskId, title, isFinished, details) => {
    if (isAdd) {
        if (taskId !== "") return;
        return await addTask(userId, moduleId, title, isFinished, details);
    } else {
        await updateTask(userId, taskId, title, isFinished, details);
        return taskId;
    }
}

export const deleteModuleRecursive = async (userId, moduleId) => {
    let arr = [];
    arr = arr.concat((await getTasks(userId, moduleId, true)));
    arr = arr.concat((await getTasks(userId, moduleId, false)));
    await Promise.all(arr.map(item => deleteT(userId, item.taskId, item.isFinished, item.reference, moduleId)));
    deleteModule(userId, moduleId);
}

export const deleteT = async (userId, taskId, isFinished, reference, moduleId, unregister = true) => {
    let finish = isFinished ? 1 : 0;
    let un = unregister ? 1 : 0;
    await deleteTask(userId, taskId);
    if (reference !== "") {
        await editStat(moduleId, reference, -un, -finish);
    }
}

export const completeTask = async (userId, moduleId, title, taskId, reference, isTransfer) => {
    await Promise.all([
        deleteT(userId, taskId, false, reference, moduleId, false),
        editStat(moduleId, reference, 0, 1)
    ]);
    if (isTransfer) addTask(userId, moduleId, title, true, "Not graded yet");
}
// Explanation for the function handling links in unfinished task of progress tracker:
// // host new task
// hostTask
// linkTaskY
// editStatCur
// // link to exist task
// linkTaskN
// editStatCur
// // change link exist task (maybe hosting)
// editStatPrev
// linkTaskN
// editStatCur
// // change name hosting task
// editTitle
// // unlink task
// editStatPrev
// linkTaskN

// a = prev == cur ?
// b = prev != "" ?
// c = cur != "" ?

//                                  abc
// host new task:                   100
// link to exist task:              001
// change link exist task:          011
// change name hosting task:        111
// unlink task:                     010

// a = 1 => b = c
// b = c = 0 => a = 1
// 000, 101, 110: never happen

// hostTask: b=c=0
// linkTaskY: b=c=0
// editStatPrev: a=0, b=1
// linkTaskN: a=0
// editStatCur: a!=c
// editTitle: a=b=c=1

// deal with public tasks
export const link = async (userId, moduleId, taskId, title, isFinished, prevId, curId) => {
    let same = (prevId === curId);
    let havePrevId = (prevId != "");
    let haveCurId = (curId != "");
    let finish = isFinished ? 1 : 0;

    let newId = "";

    if (!havePrevId && !haveCurId) {
        newId = await hostTask(moduleId, title, userId);
    }

    if (!same && havePrevId) {
        await editStat(moduleId, prevId, -1, -finish);
    }

    if (!havePrevId && !haveCurId) {
        await linkTask(userId, taskId, moduleId, newId, true);
    }

    if (!same) {
        await linkTask(userId, taskId, moduleId, curId, false);
    }

    if (same != haveCurId) {
        await editStat(moduleId, newId + curId, 1, finish);
    }

    if (same && havePrevId) {
        await editTitle(userId, moduleId, newId + curId, title);
    }
}

// miss the case link but not host -> host
export const link2 = async (userId, moduleId, taskId, title, isFinished, prevId) => {
    let finish = isFinished ? 1 : 0;
    let newId = await hostTask(moduleId, title, userId);
    await Promise.all([
        editStat(moduleId, prevId, -1, -finish),
        linkTask(userId, taskId, moduleId, newId, true),
        editStat(moduleId, newId, 1, finish)
    ])
}

// P.S.: this is a mess, will refactor if have time 








