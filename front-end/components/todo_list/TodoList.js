import React, { useState, useEffect } from 'react'
import { View, FlatList, TouchableWithoutFeedback, Keyboard, BackHandler} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../style/TodoStyles.js'
import TodoItem from './TodoItem.js'
import AddTodo from './AddTodo.js'
import EditTodo from './EditTodo.js'
import TodoButtons from './TodoButtons.js'

/* features that are not yet implemented:
+ still cannot store the task locally by date 
  -> every time a change is made, we have to wait for the data
  -> when add/edit/delete, have to post to the api the add/edit/delete request 
    and then fetch back all the tasks from the api to display
  -> plan to have a local data base on the front end to store the tasks,
   only upload the changes to the api once to minimize loading time
+ still cannot work with out the internet
*/

export default function TodoList({ route }) {
  const userId = route.params.userId

  const [todos, setTodos] = useState([]) 
  // array of deadlines/tasks
  const [editId, setEditId] = useState(-1) 
  // the id of the item that is currently being edited
  // editId === -1 means that currently there is nothing being edited
  const [loading, setLoading] = useState(true)
  // represent whether the screen is currenly loading
        
  // get data from api
  // id cannot be -1
  useEffect(() => {
    const requestOptions = {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         id: userId
       })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list/all', requestOptions)
      .then(res => res.json())
      .then(data => data.tasks)
      .then(tasksArr => tasksArr.map(task => {
        return {
          ...task,
          date: new Date(Date.parse(task.date))
        }
      }))
      .then(tasksWithCorrectDateFormat => setTodos(tasksWithCorrectDateFormat))
      .then(() => setLoading(false))
      .catch(error => console.log(error))
  }, [])

  function fetchData() { 
    // this function is temporary until a local database is implemented
    // get all the tasks from the api
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: userId
      })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list/all', requestOptions)
      .then(res => res.json())
      .then(data => data.tasks)
      .then(tasksArr => tasksArr.map(task => {
        return {
          ...task,
          date: new Date(Date.parse(task.date))
        }
      }))
      .then(tasksWithCorrectDateFormat => setTodos(tasksWithCorrectDateFormat))
      .then(() => setLoading(false))
      .catch(error => console.log(error))
  }

  // Add delete an element
  function handleDelete(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        taskId: id
      })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
      .then(res => {
        setLoading(true)
        fetchData()
      })
      .catch(error => console.log(error))    
  }
    
  // Add a new element
  function handleAdd(text, date) {
    if (text.length >= 1) {
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: userId,
          task: {
            title: text,
            date: date,
          }
        })
      }
      fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
        .then(res => {
          setLoading(true)
          fetchData()
        })
        .catch(error => console.log(error))      
    }
  }

  // change the id that conrespond to opening/closing edit form
  function changeEditId(item) {
    if (editId === item.id) {
      setEditId(-1)
    } else {
      setEditId(item.id)
    }
  }

  // edit an element
  function handleEdit(id, task, date) {
    const requestOptions = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        taskId: id,
        newTitle: task,
        newDate: date
      })
    }
    fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
      .then(res => {
        setLoading(true)
        fetchData()
      })
      .catch(error => console.log(error))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={TodoStyles.container}>
        <Spinner
          visible={loading}
          textContent='Loading...'
          textStyle={TodoStyles.spinner}
        />
        <AddTodo handleAdd={handleAdd}/>
        <View style={TodoStyles.list}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={todos}
            renderItem= {({item}) => (
              <View style={TodoStyles.todoItem}>
                { editId !== item.id
                  ? <TodoItem 
                      item={item} 
                    />
                  : <EditTodo
                      changeEditId={changeEditId}
                      item={item}
                      handleEdit={handleEdit}
                    />      
                }
                <TodoButtons item={item} handleDelete={handleDelete} changeEditId={changeEditId} />    
              </View>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}