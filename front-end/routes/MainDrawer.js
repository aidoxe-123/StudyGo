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
                initialParams={{userId: route.params.userId}}
            />
            <Drawer.Screen 
                name='Progress Tracker' 
                component={ProgressTrackerStack}
                initialParams={{userId: route.params.userId}}
            />
            <Drawer.Screen 
                name='Deadlines' 
                component={TodoStack}
                initialParams={{userId: route.params.userId}}
            />
        </Drawer.Navigator>
    )
}