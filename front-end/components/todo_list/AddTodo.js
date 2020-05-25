import React, { useState } from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Fontisto } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TodoStyles } from '../../style/TodoStyles.js'

export default function AddTodo({handleAdd}) {
    const [text, setText] = useState('')
    const [date, setDate] = useState(new Date())
    const [editDate, setEditDate] = useState(false)

    var dateString = date.getDate() + '/' + date.getMonth() + '/' + (date.getYear() + 1900)

    function handleSubmit(text) {
        handleAdd(text, date)
        setText('')
        setDate(new Date())
    }

    function handleChangeDateTimePicker(event, date) {
        setEditDate(false)
        if (typeof date !== 'undefined') {
            setDate(date)
        }
    }

    return (
        <View>
            <View style={TodoStyles.addTodoForm}>
                <TextInput
                    style={TodoStyles.addTodoInput}
                    placeholder='Add deadline'
                    onChangeText={(value) => setText(value)}
                    value={text}
                />
                <View style={[TodoStyles.dateView, {flex: 3}]}>
                    <Text style={TodoStyles.dateContainer}>{dateString}</Text>
                    <Fontisto name='date' size={18} color='#333' onPress={() => setEditDate(true)}/>
                    { editDate && (
                        <DateTimePicker
                            value={date}
                            onChange={handleChangeDateTimePicker}
                        />
                    )}
                </View>
            </View>
            <TouchableOpacity style={TodoStyles.button} onPress={() => handleSubmit(text)}> 
                <Text style={TodoStyles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    )
}