import React, { useState, useEffect, useContext } from 'react'
import { View, FlatList, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Spinner from 'react-native-loading-spinner-overlay';
import { TodoStyles } from '../../../style/TodoStyles.js'
import TodoItem from './TodoItem.js'
import { UserIdContext } from '../../components/index'
import { allTasks } from './DataFetcher'

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
      allTasks(userId)
      .then(tasksWithCorrectDateFormat => setTodos(tasksWithCorrectDateFormat))
      .then(() => setLoading(false))
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
                itemDate: item.date.toString(),
                itemNoti: typeof item.noti === 'undefined' ? {} : item.noti
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