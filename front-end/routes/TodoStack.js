import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import TodoList from '../components/todo_list/TodoList'
import AddTodo from '../components/todo_list/AddTodo'
import Header from '../shared component/Header'
import EditTodo from '../components/todo_list/EditTodo'

const Stack = createStackNavigator()

export default function TodoStack({ route }) {
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