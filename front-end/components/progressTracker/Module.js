import React, { useState, useEffect, userContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FinishedTasks from './FinishedTask';
import UnfinishedTasks from './UnfinishedTask';
import { Entypo } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Module({ navigation }) {

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
        activeBackgroundColor: 'coral',
        inactiveTinColor: 'white',
        inactiveBackgroundColor: 'lightgrey'
    }

    return (
        <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
            <Tab.Screen name="Unfinished Tasks" component={UnfinishedTasks} />
            <Tab.Screen name="Finished Tasks" component={FinishedTasks} />

        </Tab.Navigator>
    )
}