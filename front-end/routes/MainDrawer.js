import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useEffect } from 'react'
import { BackHandler} from 'react-native' 
import TimetableStack from './TimetableStack'
import ProgressTrackerStack from './ProgressTrackerStack'
import TodoStack from './TodoStack'
import DrawerSlider from '../shared component/DrawerSlider'
import { MaterialCommunityIcons, Octicons, FontAwesome5 } from '@expo/vector-icons'

const Drawer = createDrawerNavigator()
export const UserIdContext = React.createContext('')

export default function MainDrawer({ route, navigation }) {
    
    useEffect(() => {
        const backAction = () => true
        BackHandler.addEventListener('hardwareBackPress', backAction)
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction)
    }, [])

    
    return (
        <UserIdContext.Provider value={route.params.userId}>
        <Drawer.Navigator 
            drawerContent={props => <DrawerSlider {...props}/>}
            drawerContentOptions={{
                activeTintColor: 'coral',
                inactiveTintColor: 'rgba(0,0,0,0.5)'
            }}
        >
            <Drawer.Screen 
                name='Timetable' 
                component={TimetableStack} 
                options={{
                    drawerIcon: ({focused, size, color}) => (
                        <MaterialCommunityIcons name='timetable' size={24} color={color}/>
                    )
                }}
            />
            <Drawer.Screen 
                name='Progress Tracker' 
                component={ProgressTrackerStack}
                options={{
                    drawerIcon: ({focused, size, color}) => (
                        <Octicons name='graph' size={24} color={color}/>
                    )
                }}
            />
            <Drawer.Screen 
                name='Deadlines' 
                component={TodoStack}
                options={{
                    drawerIcon: ({focused, size, color}) => (
                        <FontAwesome5 name='tasks' size={24} color={color}/>
                    )
                }}
            />
        </Drawer.Navigator>
        </UserIdContext.Provider>
    )
}