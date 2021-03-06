import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { BackHandler } from 'react-native'
import TimetableStack from './TimetableStack'
import CalendarStack from './CalendarStack'
import ProgressTrackerStack from './ProgressTrackerStack'
import TodoStack from './TodoStack'
import SettingStack from './SettingStack'
import { MaterialCommunityIcons, Octicons, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons'
import { UserIdContext, DrawerSlider } from '../components/index'

const Drawer = createDrawerNavigator()

export default function MainDrawer({ route }) {

    useEffect(() => {
        const backAction = () => true
        BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
    }, [])


    return (
        <UserIdContext.Provider value={route.params.userId}>
            <Drawer.Navigator
                drawerContent={props => <DrawerSlider {...props} />}
                drawerContentOptions={{
                    activeTintColor: '#e76f51',
                    inactiveTintColor: '#696969',
                    labelStyle: {
                        fontFamily: 'raleway-medium',
                        fontSize: 16
                    }
                }}
            >
                <Drawer.Screen
                    name='Timetable'
                    component={TimetableStack}
                    options={{
                        drawerIcon: ({ focused, size, color }) => (
                            <MaterialCommunityIcons name='timetable' size={24} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Calendar'
                    component={CalendarStack}
                    options={{
                        drawerIcon: ({ focused, size, color }) => (
                            <Feather name="calendar" size={24} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Progress Tracker'
                    component={ProgressTrackerStack}
                    options={{
                        drawerIcon: ({ focused, size, color }) => (
                            <Octicons name='graph' size={24} color={color} />
                        )
                    }}
                />
                <Drawer.Screen
                    name='Deadlines'
                    component={TodoStack}
                    options={{
                        drawerIcon: ({ focused, size, color }) => (
                            <FontAwesome5 name='tasks' size={24} color={color} />
                        )
                    }}
                />
                {/* <Drawer.Screen
                    name='Settings'
                    component={SettingStack}
                    options={{
                        drawerIcon: ({ focused, size, color }) => (
                            <AntDesign name='setting' size={24} color={color} />
                        )
                    }}
                /> */}
            </Drawer.Navigator>
        </UserIdContext.Provider>
    )
}