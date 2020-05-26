import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import TimetableStack from './TimetableStack'
import ProgressTrackerStack from './ProgressTrackerStack'
import TodoStack from './TodoStack'


const Drawer = createDrawerNavigator()

export default function MainDrawer({route}) {
    return (
        <Drawer.Navigator>
            <Drawer.Screen 
                name='Timetable' 
                component={TimetableStack} 
                initialParams={route.params}
            />
            <Drawer.Screen 
                name='Progress Tracker' 
                component={ProgressTrackerStack}
                initialParams={route.params}
            />
            <Drawer.Screen 
                name='Deadlines' 
                component={TodoStack}
                initialParams={route.params}
            />
        </Drawer.Navigator>
    )
}