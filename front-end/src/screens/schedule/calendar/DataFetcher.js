// get data
// -----------------------------------------------------
export async function getEvents(userId, month, year) {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId,
      month: month,
      year: year
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/calendar/events', requestOptions)
    .then(res => res.json())
    .then(({events}) => {
      Object.keys(events).forEach(key => events[key].sort(compareTask))
      return events
    })
    .catch(error => console.log(error))
}
//////////////////////////////////////////////////////////

// delete data 
// -------------------------------------------------------
export async function deleteEvent(userId, date, eventId) {
  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId,
      date: date,
      eventId: eventId
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/calendar', requestOptions)
    .catch(error => console.log(error))
}
/////////////////////////////////////////////////////////////////////

// add new data
// -------------------------------------------------------------
export async function addEvent(userId, date, event) {
  const currTime = new Date().toUTCString()
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId,
      date: date,
      event: {
        ...event,
        createAt: currTime
      }
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/calendar', requestOptions)
    .catch(error => console.log(error))
}
///////////////////////////////////////////////////////////////////////////

// edit existing data
// ---------------------------------------------------------------------
export async function editEvent(userId, eventId, date, newEvent) {
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId: userId,
      eventId: eventId,
      date: date,
      newEvent: newEvent      
    })
  }
  return fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/calendar', requestOptions)
    .catch(error => console.log(error))
}
////////////////////////////////////////////////////////////////////////

// supplement functions to help sort tasks
// -----------------------------------------------------------------
function compareType(type1, type2) { 
  // deadline < assessment < special
  if (type1 === type2) return 0 // if have same type then equal
  if (type1 === 'deadline') return -1 // then type1 < type2 for all type1 != type2
  if (type2 === 'deadline') return 1 // then type1 > type2 for all type1 != type2
  if (type1 === 'special') return 1 // then type1 > type2 for all type1 != type2
  if (type2 === 'special') return -1 // then type1 < type2 for all type1 != type2
}

function compareTask(task1, task2) {
  const timestamp1 = new Date(task1.createAt)
  const timestamp2 = new Date(task2.createAt)
  if (timestamp1 < timestamp2) return -1
  if (timestamp1 > timestamp2) return 1
  return compareType(task1.type, task2.type)
}
////////////////////////////////////////////////////////////////////////
