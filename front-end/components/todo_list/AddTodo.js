import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import DatePicker from '../../shared component/DatePicker'
import { AddTodoStyles } from '../../style/AddTodoStyles.js'

export default function AddTodo({navigation, route}) {
    const handleAdd = route.params.handleAdd
    const [text, setText] = useState('')
    const [date, setDate] = useState(new Date())
    const [editDate, setEditDate] = useState(false)

    var dateString = date.getDate() + '/' + date.getMonth() + '/' + (date.getYear() + 1900)

    function handleSubmit() {
        setText('')
        setDate(new Date())
        navigation.pop()
        handleAdd(text, date)
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
                <View style={AddTodoStyles.header}>
                    <TouchableOpacity style={AddTodoStyles.whiteButton} onPress={() => navigation.pop()}>
                        <View style={AddTodoStyles.insideWhiteButton}>
                            <Ionicons name='ios-arrow-back' size={18} />
                            <Text style={AddTodoStyles.whiteButtonText}>Cancel</Text>
                        </View> 
                    </TouchableOpacity>
                    <Text h1 style={AddTodoStyles.headerText}>Add Task</Text>
                </View>
                <View style={AddTodoStyles.form}>
                    <Text style={AddTodoStyles.label}>Task name:</Text>
                    <TextInput
                        style={AddTodoStyles.input}
                        placeholder='e.g Do homework'
                        onChangeText={(value) => setText(value)}
                        value={text}
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
                        <Text style={AddTodoStyles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>               
            </View>
        </TouchableWithoutFeedback>
    )
}