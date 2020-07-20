import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Calendar from '../screens/calendar/Calendar'
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
        name='Calendar' 
        component={Calendar}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Calendar' navigation={navigation} />
          }
        }} 
      />  
    </Stack.Navigator>
  )
}