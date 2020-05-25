import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import TodoList from '../components/todo_list/TodoList'
import Header from '../shared component/Header'

const Stack = createStackNavigator()

export default function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'coral'},
        headerTitleStyle: {
          color: '#fff'
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name='Deadlines' 
        component={TodoList} 
        options = {({routes, navigation}) => {
          return {
            headerTitle: () => <Header title='Deadlines' navigation={navigation} />
          }
        }}
      />
    </Stack.Navigator>
  )
}