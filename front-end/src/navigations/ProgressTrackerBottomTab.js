import React, { useState, useEffect, userContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FinishedTasks from '../screens/progressTracker/FinishedTask';
import UnfinishedTasks from '../screens/progressTracker/UnfinishedTask';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Module({ navigation, route }) {

    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Unfinished Tasks') {
                iconName = 'progress-one';
            } else if (route.name === 'Finished Tasks') {
                iconName = 'progress-full';
            }
            return <Entypo name={iconName} size={size} color={color} />
        }
    })

    const tabBarOptions = {
        activeTintColor: 'white',
        activeBackgroundColor: '#e76f51',
        inactiveTintColor: '#e76f51',
        inactiveBackgroundColor: 'white',
    }

    return (
        <Tab.Navigator 
            screenOptions={screenOptions} 
            tabBarOptions={tabBarOptions} 
            initialRouteName="Unfinished Tasks"
        >
            <Tab.Screen 
                name="Unfinished Tasks" 
                component={UnfinishedTasks} 
                initialParams={{ moduleId: route.params.moduleId }} 
            />
            <Tab.Screen 
                name="Finished Tasks"  
                component={FinishedTasks} 
                initialParams={{ moduleId: route.params.moduleId }} 
            />
        </Tab.Navigator>
    )
}