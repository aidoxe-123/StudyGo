import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Register from '../screens/login/Register'
import Login from '../screens/login/Login'
import MainDrawer from './MainDrawer'

const Stack = createStackNavigator()

export default function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'white'},
        headerTitleStyle: {
          color: 'black'
        },
        headerLeft: null,
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='MainDrawer' component={MainDrawer} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}