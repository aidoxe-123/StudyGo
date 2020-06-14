import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ProgressTracker from '../components/progressTracker/ProgressTracker'
import Module from '../components/progressTracker/Module';
import AddModule from '../components/progressTracker/Add Module';
import AddFinished from '../components/progressTracker/Add Finished';
import AddUnfinished from '../components/progressTracker/Add Unfinished';
import EditFinished from '../components/progressTracker/EditFinished';
import EditUnfinished from '../components/progressTracker/EditUnfinished';
import Header from '../shared component/Header'

const Stack = createStackNavigator()

export default function ProgressTrackerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: 'coral' },
        headerTitleStyle: {
          color: '#fff'
        },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name='Progress Tracker'
        component={ProgressTracker}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='Modules' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Module'
        component={Module}
        options={({ navigation, route }) => {
          return {
            headerTitle: () => <Header title={route.params.name} navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Add Module'
        component={AddModule}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='New module' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Add Finished'
        component={AddFinished}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='New tasks' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Add Unfinished'
        component={AddUnfinished}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='New tasks' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Edit Finished'
        component={EditFinished}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='Edit' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Edit Unfinished'
        component={EditUnfinished}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='Edit' navigation={navigation} />
          }
        }}
      />
    </Stack.Navigator>
  )
}