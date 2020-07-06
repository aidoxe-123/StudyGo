// get all classes
// -----------------------------------------------
export async function allClasses(userId) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/timetable/all', requestOptions)
    .then(res => res.json())
    .catch(error => console.log(error))
}
///////////////////////////////////////////////////

// edit class
// ------------------------------------------------
export async function editClass(userId, taskId, newTask, newDay) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId,
      taskId: taskId,
      newTask: newTask,
      newDay: newDay        
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/timetable', requestOptions)
    .catch(error => console.log(error))
}
////////////////////////////////////////////////////

// delete class
// -------------------------------------------------
export async function deleteClass(userId, taskId) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId,
      taskId: taskId,
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/timetable', requestOptions)
    .catch(error => console.log(error))
} 
///////////////////////////////////////////////////

// add class
// ------------------------------------------------
export async function addClass(userId, day, task) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId,
      day: day,
      task: task     
    })
  }
  fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/timetable', requestOptions)
    .catch(error => console.log(error))
}
////////////////////////////////////////////////////