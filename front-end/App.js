import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import LoginStack from './src/navigations/LoginStack'

export default function App() {
  return (
    <NavigationContainer>
       <LoginStack />
    </NavigationContainer>
  )
}