import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Timetable from '../screens/schedule/timetable/Timetable'
import Calendar from '../screens/schedule/calendar/Calendar'
import { Header } from '../components/index'

const Stack = createStackNavigator()

export default function TimetableStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#e76f51'},
        headerTitleStyle: {
          color: '#fff'
        },
        headerLeft: null
      }}
    >
      <Stack.Screen 
        name='Timetable' 
        component={Timetable}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Schedule' navigation={navigation} />
          }
        }} 
      />  
      <Stack.Screen
        name='Calendar'
        component={Calendar}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Schedule' navigation={navigation} />
          }
        }}
      />     
    </Stack.Navigator>
  )
}