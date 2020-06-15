import React, { useState, useContext } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import { AddTodoStyles } from '../../../style/AddTodoStyles'
import { YellowLine } from '../../../style/yellowLine'
import { UserIdContext, DatePicker } from '../../components/index'

export default function EditTodo({ route, navigation }) {
    const userId = useContext(UserIdContext)
    const { itemId, itemTask, itemDate } = route.params
    const [task, setTask] = useState(itemTask)
    const [date, setDate] = useState(new Date(Date.parse(itemDate)))
    const [editDate, setEditDate] = useState(false)

    var dateString = date.getDate() + '/' + date.getMonth() + '/' + (date.getYear() + 1900)

    // Delete an element
    function handleDelete() {
        const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: userId,
            taskId: itemId
        })
        }
        fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
        .then(() => navigation.navigate('Deadlines'))
        .catch(error => console.log(error))    
    }

    function handleSubmit() {
        if (task.length > 0) {
          const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              userId: userId,
              taskId: itemId,
              newTitle: task,
              newDate: date
            })
          }
          fetch('https://fir-tut2-82e4f.firebaseapp.com/api/v1/to-do-list', requestOptions)
            .then(navigation.navigate('Deadlines'))
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
            <TouchableOpacity 
                style={YellowLine.leftWhiteButton} 
                onPress={() => navigation.navigate('Deadlines')}
            >
              <View style={YellowLine.insideWhiteButton}>
                <Ionicons name='ios-arrow-back' size={18} style={YellowLine.whiteButtonIcon}/>
                <Text style={YellowLine.whiteButtonText}>Cancel</Text>
              </View> 
            </TouchableOpacity>
            <Text h1 style={YellowLine.headerText}>Edit Task</Text>
            <TouchableOpacity style={YellowLine.rightWhiteButton} onPress={handleDelete}>
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