import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import DatePicker from '../../shared component/DatePicker'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import { AddTodoStyles } from '../../style/AddTodoStyles'
import { YellowLine } from '../../style/yellowLine'

export default function EditTodo({ route, navigation }) {
    const { item, handleEdit, handleDelete } = route.params
    const [task, setTask] = useState(item.task)
    const [date, setDate] = useState(item.date)
    const [editDate, setEditDate] = useState(false)

    var dateString = date.getDate() + '/' + date.getMonth() + '/' + (date.getYear() + 1900)
    function deleteItem() {
        navigation.pop()
        handleDelete(item.id)
    }
    function handleSubmit() {
        if (task.length > 0) {
            handleEdit(item.id, task, date)
        }
        navigation.pop()
    }
    
    function handleChangeDateTimePicker(event, date) {
        setEditDate(false)
        if (typeof date !== 'undefined') {
            setDate(date)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={AddTodoStyles.container}>
                <View style={YellowLine.header}>
                    <TouchableOpacity style={YellowLine.leftWhiteButton} onPress={() => navigation.pop()}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon}/>
                            <Text style={YellowLine.whiteButtonText}>Cancel</Text>
                        </View> 
                    </TouchableOpacity>
                    <Text h1 style={YellowLine.headerText}>Edit Task</Text>
                    <TouchableOpacity style={YellowLine.rightWhiteButton} onPress={deleteItem}>
                        <View style={YellowLine.insideWhiteButton}>
                            <Text style={YellowLine.whiteButtonText}>Delete</Text>
                        </View> 
                    </TouchableOpacity>
                </View>
                <View style={AddTodoStyles.form}>
                    <Text style={AddTodoStyles.label}>Task name:</Text>
                    <TextInput
                        style={AddTodoStyles.input}
                        placeholder='e.g Do homework'
                        onChangeText={(value) => setTask(value)}
                        value={task}
                    />
                    <Text style={AddTodoStyles.label}>{"\n"}Add date:</Text>
                    <View style={AddTodoStyles.dateView}>
                        <Text style={AddTodoStyles.dateBox}>{dateString}</Text>
                        <Fontisto name='date' size={28} color='#333' onPress={() => setEditDate(true)}/>
                        <DatePicker showDatePicker={editDate} date={date} handleChange={handleChangeDateTimePicker}/>
                    </View>
                </View>
                <View style={AddTodoStyles.bottomRow}>
                    <TouchableOpacity style={AddTodoStyles.button} onPress={handleSubmit}> 
                        <Text style={AddTodoStyles.buttonText}>Save changes</Text>
                    </TouchableOpacity>
                </View>       
            </View>
        </TouchableWithoutFeedback>
    )
}