import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TodoList from './components/todo_list/TodoList.js'
import { NavigationContainer } from '@react-navigation/native'
import LoginStack from './routes/LoginStack'

export default function App() {
  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  )
}