import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { TodoStyles } from '../../style/TodoStyles.js'

export default function TodoItem({item}) {
    var dateString = item.date.getDate() + '/' + item.date.getMonth() + '/' + (item.date.getYear() + 1900)

    return (
            <View style={TodoStyles.task}>
                <Text style={TodoStyles.taskText}>{item.task}</Text>
                <Text style={TodoStyles.taskText}>{dateString}</Text>
            </View>

    )
}