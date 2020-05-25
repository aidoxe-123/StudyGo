import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Timetable from '../components/timetable/Timetable'
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
        name='Timetable' 
        component={Timetable}
        options = {({routes, navigation}) => {
          return {
            headerTitle: () => <Header title='Timetable' navigation={navigation} />
          }
        }} 
      />
    </Stack.Navigator>
  )
}