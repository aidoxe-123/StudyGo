import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Header } from '../components/index'
import Profile from '../screens/profile/Profile'

const Stack = createStackNavigator()

export default function ProfileStack() {
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
        name='Profile' 
        component={Profile}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Profile' navigation={navigation} />
          }
        }} 
      />   
    </Stack.Navigator>
  )
}