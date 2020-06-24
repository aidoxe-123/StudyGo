import React, { useState, useContext } from 'react'
import { 
  View, Text, TextInput, TouchableOpacity, 
  TouchableWithoutFeedback, Keyboard, Alert 
} from 'react-native'
import { Fontisto, Ionicons, Feather } from '@expo/vector-icons'
import { AddTodoStyles } from '../../../style/AddTodoStyles'
import { YellowLine } from '../../../style/yellowLine'
import { UserIdContext, DatePicker } from '../../components/index'
import { deleteTask, editTask } from './DataFetcher'
import { Notifications } from 'expo'
import NotificationSettings from './NotificationSettings'

export default function EditTodo({ route, navigation }) {
    const userId = useContext(UserIdContext)
    const { itemId, itemTask, itemDate, itemNoti } = route.params
    const [task, setTask] = useState(itemTask)
    const [date, setDate] = useState(new Date(Date.parse(itemDate)))
    const [editDate, setEditDate] = useState(false)
    const [editTime, setEditTime] = useState(false)
    const initialDate = useState(date)[0]
    
    const [notiIds, setNotiIds] = useState(itemNoti)
    const [openNotiSetting, setOpenNotiSetting] = useState(false)

    var dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getYear() + 1900)
    var timeString = toTwoDigitString(date.getHours()) + ":" + toTwoDigitString(date.getMinutes())

    function toTwoDigitString(num) {
      return num >= 10 ? "" + num : "0" + num
    }

    function handleDelete() {
      Object.values(notiIds).forEach(value => { // cancel all notification
        if (value !== '') Notifications.cancelScheduledNotificationAsync(value)
      })
      deleteTask(userId, itemId)
      .then(() => navigation.navigate('Deadlines')) 
    }

    function handleSubmit() {
      if (task.length > 0) {
        var hasNoti = false
        Object.keys(notiIds).forEach(key => {
          if (date - parseInt(keys) > new Date() && notiIds[key] !== '') hasNoti = true
        })
        if (hasNoti) {
          Alert.alert("Alert", 
            "If you edit this task, all notifications related to your task's old version will be canceled",
            [
              {text: 'Cancel'}, 
              {
                text: 'Proceed', 
                onPress: () => {
                  Object.values(notiIds).forEach(value => {
                    if (value !== '') Notifications.cancelScheduledNotificationAsync(value)
                  })
                  editTask(userId, itemId, task, date, {})
                    .then(() => navigation.navigate('Deadlines'))
                }
              }
            ]
          )
        } else {
          editTask(userId, itemId, task, date, {})  
          .then(() => navigation.navigate('Deadlines'))
        }
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

    // pass down to the notification setting
    // handle creating new notifications
    // duration: number in milisecons, timeMess: string
    // ------------------------------------------------------------------
    function handleNotify(duration, timeMess) {
      if (typeof notiIds[duration.toString()] === 'undefined') { 
      // if this item has not been notified before
        if (date - new Date() > duration) {
          const notification = {
            title: 'Deadline notification',
            body: task + ' will happen in ' + timeMess
          }
          Notifications.scheduleLocalNotificationAsync(
            notification,
            {time: date - duration}
          ).then(notiId => {
            var newNotiIds = {
              ...notiIds,
              [duration.toString()]: notiId
            }
            editTask(userId, itemId, task, date, newNotiIds) 
            setNotiIds(newNotiIds)
          })
          Alert.alert('Success', 'Notification set', [{text: 'OK'}])
        } else {
          Alert.alert('Alert',
            'It is less than ' + timeMess + ' until ' + task,
            [{text: 'OK'}])
        }   
      } else {
        Alert.alert('Already have notification', 
            'The notification has been set before', 
            [{text: 'OK'}])
      }
    }

    function openCloseNotificationSetting() {
      setOpenNotiSetting(prevState => !prevState)
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
                <Text style={YellowLine.whiteButtonText}>Back</Text>
              </View> 
            </TouchableOpacity>
            <Text h1 style={YellowLine.headerText}>Task Info</Text>
            <TouchableOpacity 
              style={[YellowLine.rightWhiteButton, initialDate < new Date() && {backgroundColor: '#00000080'}]} 
              onPress={openCloseNotificationSetting}
              disabled={initialDate < new Date()}
            >
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
          {
            /* Notification setting modal */
            openNotiSetting &&
            <NotificationSettings 
              closeModal={openCloseNotificationSetting}
              handleNotify={handleNotify}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    )
}