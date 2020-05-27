import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { BackHandler} from 'react-native' 
import TimetableStack from './TimetableStack'
import ProgressTrackerStack from './ProgressTrackerStack'
import TodoStack from './TodoStack'


const Drawer = createDrawerNavigator()

export default function MainDrawer({ route }) {
    

    useEffect(() => {
        const backAction = () => true
        BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
    }, [])

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