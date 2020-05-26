import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native'
import DatePicker from '../../shared component/DatePicker'
import { Fontisto } from '@expo/vector-icons'
import { TodoStyles } from '../../style/TodoStyles.js'

export default function EditTodo({changeEditId, item, handleEdit}) {
    const [task, setTask] = useState(item.task)
    const [date, setDate] = useState(item.date)
    const [editDate, setEditDate] = useState(false)

    var dateString = date.getDate() + '/' + date.getMonth() + '/' + (date.getYear() + 1900)

    function handleFormSubmit(task, date) {
        if (task.length > 0) {
            changeEditId(item)
            handleEdit(item.id, task, date)
        }
    }
    
    function handleChangeDateTimePicker(event, date) {
        setEditDate(false)
        if (typeof date !== 'undefined') {
            setDate(date)
        }
    }

    return (
        <View style={TodoStyles.task}>
            <TextInput 
                style={TodoStyles.editTodoInput}
                placeholder='e.g edited task'
                value={task}
                onChangeText={value => setTask(value)}
            />
            <View style={TodoStyles.dateView}>
                <Text style={TodoStyles.dateContainer}>{dateString}</Text>
                <Fontisto name='date' size={18} color='#333' onPress={() => setEditDate(true)}/>
                <DatePicker showDatePicker={editDate} date={date} handleChange={handleChangeDateTimePicker}/>
            </View>
            <TouchableOpacity 
                style={TodoStyles.button}
                onPress={() => handleFormSubmit(task, date)}
            >
                <Text style={TodoStyles.buttonText}>Change</Text>
            </TouchableOpacity>
        </View>
    )
}