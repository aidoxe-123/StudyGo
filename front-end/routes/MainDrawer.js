import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { BackHandler} from 'react-native' 
import TimetableStack from './TimetableStack'
import ProgressTrackerStack from './ProgressTrackerStack'
import TodoStack from './TodoStack'
import DrawerSlider from '../shared component/DrawerSlider'

const Drawer = createDrawerNavigator()

export default function MainDrawer({ route, navigation }) {
    useEffect(() => {
        const backAction = () => true
        BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
    }, [])

    return (
        <Drawer.Navigator 
            drawerContent={props => <DrawerSlider {...props}/>}
            drawerContentOptions={{
                activeTintColor: 'rgba(0,0,0,0.87)'
            }}>
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