import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Header } from '../components/index'
import Setting from '../screens/setting/Setting'

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
        name='Setting' 
        component={Setting}
        options = {({navigation}) => {
          return {
            headerTitle: () => <Header title='Setting' navigation={navigation} />
          }
        }} 
      />   
    </Stack.Navigator>
  )
}