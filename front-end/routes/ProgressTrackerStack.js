import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ProgressTracker from '../components/progressTracker/ProgressTracker'
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
        name='Progress Tracker' 
        component={ProgressTracker}
        options = {({routes, navigation}) => {
          return {
            headerTitle: () => <Header title='Progress Tracker' navigation={navigation} />
          }
        }} 
      />
    </Stack.Navigator>
  )
}