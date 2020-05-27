import React from 'react'
import { View, Text, } from 'react-native'
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