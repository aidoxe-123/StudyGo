import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import TodoList from '../screens/todoList/TodoList'
import AddTodo from '../screens/todoList/AddTodo'
import { Header } from '../components/index'
import EditTodo from '../screens/todoList/EditTodo'

const Stack = createStackNavigator()

export default function TodoStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'coral'},
        headerTitleStyle: {
          color: '#fff'
        },
        headerLeft: null,
      }}
    >
      <Stack.Screen 
        name='Deadlines' 
        component={TodoList} 
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Deadlines' navigation={navigation} />
          }
        }}
      />
      <Stack.Screen
        name='AddDeadline'
        component={AddTodo}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Deadlines' navigation={navigation} />
          }
        }}
      />
      <Stack.Screen
        name='EditDeadline'
        component={EditTodo}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Deadlines' navigation={navigation} />
          }
        }}
      />
    </Stack.Navigator>
  )
}