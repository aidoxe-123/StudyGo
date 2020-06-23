import React, { useState, useContext } from 'react'
import { 
  View, Text, TextInput, TouchableOpacity, 
  TouchableWithoutFeedback, Keyboard 
} from 'react-native'
import { Fontisto, Ionicons, Feather } from '@expo/vector-icons'
import { AddTodoStyles } from '../../../style/AddTodoStyles'
import { YellowLine } from '../../../style/yellowLine'
import { UserIdContext, DatePicker } from '../../components/index'
import { deleteTask, editTask } from './DataFetcher'

export default function EditTodo({ route, navigation }) {
    const userId = useContext(UserIdContext)
    const { itemId, itemTask, itemDate } = route.params
    const [task, setTask] = useState(itemTask)
    const [date, setDate] = useState(new Date(Date.parse(itemDate)))
    const [editDate, setEditDate] = useState(false)
    const [editTime, setEditTime] = useState(false)

    var dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getYear() + 1900)
    var timeString = toTwoDigitString(date.getHours()) + ":" + toTwoDigitString(date.getMinutes())

    function toTwoDigitString(num) {
      return num >= 10 ? "" + num : "0" + num
    }

    function handleDelete() {
      deleteTask(userId, itemId)
      .then(() => navigation.navigate('Deadlines')) 
    }

    function handleSubmit() {
        if (task.length > 0) {
          editTask(userId, itemId, task, date)
          .then(() => navigation.navigate('Deadlines'))
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

    function handleNotify() {
      const notification = {
        title: 'Deadline notification',
        body: 'The event will happen in one hour'
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
            <Text h1 style={YellowLine.headerText}>Task Info</Text>
            <TouchableOpacity style={YellowLine.rightWhiteButton}>
              <View style={[YellowLine.insideWhiteButton, {paddingHorizontal: 5}]}>
                <Text>Notify me</Text>
                <Feather name="bell" size={24} color="black" />
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
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View>
                <Text style={AddTodoStyles.label}>Date:</Text>
                <View style={AddTodoStyles.dateView}>
                  <Text style={AddTodoStyles.dateBox}>{dateString}</Text>
                  <Fontisto name='date' size={28} color='#333' onPress={() => setEditDate(true)}/>
                  <DatePicker 
                    showDatePicker={editDate} 
                    value={date}  
                    handleChange={handleChangeDatePicker}
                  />
                </View>
              </View>
              <View style={{marginLeft: 20}}>
                <Text style={AddTodoStyles.label}>Time:</Text>
                <View style={AddTodoStyles.dateView}>
                  <Text style={AddTodoStyles.dateBox}>{timeString}</Text>
                  <Feather name='clock' size={28} color='#333' onPress={() => setEditTime(true)}/>
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
          <View style={AddTodoStyles.bottomRow}>
            <TouchableOpacity style={AddTodoStyles.button} onPress={handleDelete}>
              <Text style={AddTodoStyles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={AddTodoStyles.button} onPress={handleSubmit}> 
                <Text style={AddTodoStyles.buttonText}>Save changes</Text>
            </TouchableOpacity>
          </View>      
        </View>
      </TouchableWithoutFeedback>
    )
}