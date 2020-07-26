import React, { useState, useContext } from 'react'
import { View, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Fontisto, Ionicons, Feather } from '@expo/vector-icons'
import { AddTodoStyles } from '../../../style/AddTodoStyles'
import { YellowLine } from '../../../style/yellowLine'
import { UserIdContext, DatePicker } from '../../components/index'
import { addTask } from '../../utils/data-fetchers/TodoList'

export default function AddTodo({ navigation }) {
    const userId = useContext(UserIdContext)

    const oneHourFromNow = new Date()
    oneHourFromNow.setHours(oneHourFromNow.getHours() + 1)

    const [text, setText] = useState('')
    const [date, setDate] = useState(oneHourFromNow)
    const [editDate, setEditDate] = useState(false)
    const [editTime, setEditTime] = useState(false)

    var dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getYear() + 1900)
    var timeString = toTwoDigitString(date.getHours()) + ":" + toTwoDigitString(date.getMinutes())

    function toTwoDigitString(num) {
        return num >= 10 ? "" + num : "0" + num
    }

    function handleSubmit() {
        if (text.length >= 1) {
            addTask(userId, text, date)
                .then(() => {
                    setText('')
                    setDate(new Date())
                    navigation.navigate('Deadlines')
                })
        } else {
            Alert.alert('Empty title', 'Title must have at least 1 character', [{text: 'Got it'}])
        }
    }

    function handleChangeDatePicker(event, date) {
        setEditDate(false)
        if (typeof date !== 'undefined') {
            setDate(date)
        }
    }

    function handleChangeTimePicker(event, date) {
        setEditTime(false)
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
                            <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon} />
                            <Text style={YellowLine.whiteButtonText}>Back</Text>
                        </View>
                    </TouchableOpacity>
                    <Text h1 style={YellowLine.headerText}>Add Task</Text>
                    <TouchableOpacity
                        style={YellowLine.rightWhiteButton}
                        onPress={handleSubmit}
                    >
                        <View style={YellowLine.insideWhiteButton}>
                            <Text style={YellowLine.whiteButtonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={AddTodoStyles.form}>
                    <Text style={AddTodoStyles.label}>Task name:</Text>
                    <TextInput
                        style={AddTodoStyles.input}
                        placeholder='e.g Do homework'
                        onChangeText={(value) => setText(value)}
                        value={text}
                    />
                    <View style={{ marginTop: 20 }}>
                        {/* select date */}
                        <View>
                            <View style={AddTodoStyles.dateView}>
                                <Fontisto name='date' size={28} color='#333' />
                                <Text style={AddTodoStyles.label}> Date: </Text>
                                <TouchableOpacity onPress={() => setEditDate(true)}>
                                    <Text style={AddTodoStyles.dateBox}>{dateString}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    showDatePicker={editDate}
                                    value={date}
                                    handleChange={handleChangeDatePicker}
                                />
                            </View>
                        </View>

                        {/* select time */}
                        <View>
                            <View style={AddTodoStyles.dateView}>
                                <Feather name='clock' size={28} color='#333' />
                                <Text style={AddTodoStyles.label}> Time: </Text>
                                <TouchableOpacity onPress={() => setEditTime(true)}>
                                    <Text style={AddTodoStyles.dateBox}>{timeString}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    showDatePicker={editTime}
                                    value={date}
                                    handleChange={handleChangeTimePicker}
                                    mode='time'
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}