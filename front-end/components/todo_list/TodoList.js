import React, { useState, useEffect } from 'react'
import { View, FlatList, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../style/TodoStyles.js'
import TodoItem from './TodoItem.js'

/* features that are not yet implemented:
+ still cannot store the task locally by date 
  -> every time a change is made, we have to wait for the data
  -> when add/edit/delete, have to post to the api the add/edit/delete request 
    and then fetch back all the tasks from the api to display
  -> plan to have a local data base on the front end to store the tasks,
   only upload the changes to the api once to minimize loading time
+ still cannot work with out the internet
*/

export default function TodoList({ route, navigation }) {
  const userId = route.params.userId

  const [todos, setTodos] = useState([]) 
  // array of deadlines/tasks
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
  const handleAdd = (text, date) => {
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

  //<AddTodo handleAdd={handleAdd}/>
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={TodoStyles.container}>
        <Spinner
          visible={loading}
          textContent='Loading...'
          textStyle={TodoStyles.spinner}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AddDeadline', {handleAdd: handleAdd})}>
          <Text style={TodoStyles.addTask}>+ Add a new task</Text>
        </TouchableOpacity>        
        <View style={TodoStyles.list}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={todos}
            renderItem={({item}) => (
              <TodoItem 
                item={item} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete}
                navigation={navigation}
              />
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}