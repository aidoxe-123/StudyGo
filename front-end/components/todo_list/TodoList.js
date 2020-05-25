import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { TodoStyles } from '../../style/TodoStyles.js'
import TodoItem from './TodoItem.js'
import AddTodo from './AddTodo.js'
import EditTodo from './EditTodo.js'
import TodoButtons from './TodoButtons.js'

export default function TodoList() {
  const [todos, setTodos] = useState([]) // the data fetched from the api

  const [editId, setEditId] = useState(-1)
        
  // get data from api
  // id cannot be -1
  useEffect(() => {
    const newTodos = [
      { id: 1, date: new Date(2020, 5, 18), task: 'finish todo list'},
      { id: 2, date: new Date(2020, 6, 1), task: 'submit milestone 1'},
      { id: 3, date: new Date(2020, 8, 1), task: 'shopee hack'},
    ]
  setTodos(newTodos)
  }, [])

  // Add delete an element
  function handleDelete(id) {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id))
  }
    
  // Add a new element
  function handleAdd(text, date) {
    if (text.length >= 1) {
      let newItem = {
        id: Math.random(100),
        date: date,
        task: text
      }
      setTodos(prevTodos => {
        let newTodo = [
          newItem,
          ...prevTodos
        ]
        return newTodo
      })
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
    setTodos(prevTodos => {
      return prevTodos.map(item => {
        if (item.id === id) {
          let newItem = {
            ...item,
            task: task,
            date: date,
          }
          return newItem
        } else {
          return item
        }
      })
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={TodoStyles.container}>
        <View style={TodoStyles.content}>
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
      </View>
    </TouchableWithoutFeedback>
  )
}