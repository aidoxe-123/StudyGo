import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import TimetableStack from './TimetableStack'
import ProgressTrackerStack from './ProgressTrackerStack'
import TodoStack from './TodoStack'


const Drawer = createDrawerNavigator()

export default function MainDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Timetable' component={TimetableStack}/>
            <Drawer.Screen name='Progress Tracker' component={ProgressTrackerStack}/>
            <Drawer.Screen name='Deadlines' component={TodoStack}/>
        </Drawer.Navigator>
    )
}