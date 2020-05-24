import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

const Stack = createStackNavigator()

export default function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'white'},
        headerTitleStyle: {
          color: 'black'
        },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  )
}