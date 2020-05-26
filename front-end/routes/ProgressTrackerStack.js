import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ProgressTracker from '../components/progressTracker/ProgressTracker'
import Header from '../shared component/Header'

const Stack = createStackNavigator()

export default function ProgressTrackerStack({route}) {
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
        initialParams={route.params}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Progress Tracker' navigation={navigation} />
          }
        }} 
      />
    </Stack.Navigator>
  )
}