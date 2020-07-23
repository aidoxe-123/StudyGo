import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import ProgressTracker from '../screens/progressTracker/ProgressTracker'
import Module from './ProgressTrackerBottomTab';
import AddModule from '../screens/progressTracker/Add Module';
import AddFinished from '../screens/progressTracker/Add Finished';
import EditFinished from '../screens/progressTracker/EditFinished';
import EditUnfinished from '../screens/progressTracker/EditUnfinished';
import LinkTask from '../screens/progressTracker/Link';
import { Header } from '../components/index'

const Stack = createStackNavigator()

export default function ProgressTrackerStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#e76f51' },
        headerTitleStyle: {
          color: '#fff'
        },
        headerTintColor: '#fff',
        headerLeft: null
      }}
    >
      <Stack.Screen
        name='Progress Tracker'
        component={ProgressTracker}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='Progress' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Module'
        component={Module}
        options={({ navigation, route }) => {
          return {
            headerTitle: () => <Header title='Progress' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Add Module'
        component={AddModule}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='Progress' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Add Finished'
        component={AddFinished}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='Progress' navigation={navigation} />
          }
        }}
      />
      <Stack.Screen
        name='Edit Finished'
        component={EditFinished}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='Progress' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name='Edit Unfinished'
        component={EditUnfinished}
        options={({ navigation, route }) => {
          return {
            headerTitle: () => <Header title='Progress' navigation={navigation} />
          }
        }}
      />

      <Stack.Screen
        name="Link"
        component={LinkTask}
        options={({ navigation }) => {
          return {
            headerTitle: () => <Header title='Progress' navigation={navigation} />
          }
        }}
      />
    </Stack.Navigator>
  )
}