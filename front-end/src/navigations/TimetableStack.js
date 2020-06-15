import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Timetable from '../screens/timetable/Timetable'
import { Header } from '../components/index'

const Stack = createStackNavigator()

export default function TimetableStack() {
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
        name='Timetable' 
        component={Timetable}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Timetable' navigation={navigation} />
          }
        }} 
      />
    </Stack.Navigator>
  )
}