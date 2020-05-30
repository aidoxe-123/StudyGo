import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../style/TodoStyles.js'
import TodoItem from './TodoItem.js'
import { UserIdContext } from '../../shared component/UserIdContext'

/* features that are not yet implemented:
+ still cannot store the task locally by date 
  -> every time a change is made, we have to wait for the data
  -> when add/edit/delete, have to post to the api the add/edit/delete request 
    and then fetch back all the tasks from the api to display
  -> plan to have a local data base on the front end to store the tasks,
   only upload the changes to the api once to minimize loading time
+ still cannot work with out the internet
*/

export default function TodoList({ navigation }) {
  const isFocused = useIsFocused()
  
  const userId = useContext(UserIdContext)

  const [todos, setTodos] = useState([]) 
  // array of deadlines/tasks
  const [loading, setLoading] = useState(true)
  // represent whether the screen is currenly loading
        
  // get data from api
  // id cannot be -1
  useEffect(() => {
    if (isFocused) {
      setLoading(true)
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
  }, [isFocused])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={TodoStyles.container}>
        <Spinner
          visible={loading}
          textContent='Loading...'
          textStyle={TodoStyles.spinner}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AddDeadline')}>
          <Text style={TodoStyles.addTask}>+ Add a new task</Text>
        </TouchableOpacity>        
        <View style={TodoStyles.list}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={todos}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate('EditDeadline', {
                itemId: item.id,
                itemTask: item.task,
                itemDate: item.date.toDateString()
              })} >
                <TodoItem item={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}