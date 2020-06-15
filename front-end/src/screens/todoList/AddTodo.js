import React, { useState, useContext } from 'react'
import { View, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import { AddTodoStyles } from '../../../style/AddTodoStyles'
import { YellowLine } from '../../../style/yellowLine'
import { UserIdContext, DatePicker } from '../../components/index'

export default function AddTodo({navigation}) {
    const userId = useContext(UserIdContext)
    const [text, setText] = useState('')
    const [date, setDate] = useState(new Date())
    const [editDate, setEditDate] = useState(false)

    var dateString = date.getDate() + '/' + date.getMonth() + '/' + (date.getYear() + 1900)

    function handleSubmit() {
        if (text.length >= 1) {
            const requestOptions = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: userId,
                task: {
                  title: text,
                  date: date,
                }
              })
            }
            fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
              .then(() => {
                setText('')
                setDate(new Date())
                navigation.navigate('Deadlines')
              })
              .catch(error => console.log(error))      
        }        
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
                    <Text h1 style={YellowLine.headerText}>Add Task</Text>
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