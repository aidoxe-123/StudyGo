import React, { useState, useContext, useEffect } from 'react'
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
    
    const [notiList, setNotiList] = useState({})
    const [openNotiSetting, setOpenNotiSetting] = useState(false)

    const message = {
      '600000': 'ten minutes',
      '1800000': 'half an hour',
      '3600000': 'one hour',
      '86400000': 'one day'
    }

    var dateString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getYear() + 1900)
    var timeString = toTwoDigitString(date.getHours()) + ":" + toTwoDigitString(date.getMinutes())

    useEffect(() => {
      var currNotiList = {}
      Object.keys(itemNoti).forEach(key => currNotiList[key] = true)
      setNotiList(currNotiList)
    }, [])
    function toTwoDigitString(num) {
      return num >= 10 ? "" + num : "0" + num
    }

    function handleDelete() {
      Object.values(itemNoti).forEach(value => { // cancel all notification
        if (value !== '') Notifications.cancelScheduledNotificationAsync(value)
      })
      deleteTask(userId, itemId)
      .then(() => navigation.navigate('Deadlines')) 
    }

    function handleSubmit() {
      // if (task.length > 0) {
      //   var hasNoti = false
      //   Object.keys(notiIds).forEach(key => {
      //     if (date - parseInt(key) > new Date() && notiIds[key] !== '') hasNoti = true
      //   })
      //   if (hasNoti) {
      //     Alert.alert("Alert", 
      //       "If you edit this task, all notifications related to your task's old version will be canceled",
      //       [
      //         {text: 'Cancel'}, 
      //         {
      //           text: 'Proceed', 
      //           onPress: () => {
      //             Object.values(notiIds).forEach(value => {
      //               if (value !== '') Notifications.cancelScheduledNotificationAsync(value)
      //             })
      //             editTask(userId, itemId, task, date, {})
      //               .then(() => navigation.navigate('Deadlines'))
      //           }
      //         }
      //       ]
      //     )
      //   } else {
      //     editTask(userId, itemId, task, date, {})  
      //     .then(() => navigation.navigate('Deadlines'))
      //   }
      // }
      if (task.length > 0) {
        if (date !== itemDate || task !== itemTask) { // if item details are changed
          // delete all notification of the old version
          Object.values(itemNoti).forEach(value => {
            Notifications.cancelScheduledNotificationAsync(value) 
          })
          // make new notification
          var newNotiIds = {}
          var promises = []
          Object.keys(notiList).forEach(key => {
            if (notiList[key] === true) {
              const notification = {
                title: 'Deadline notification',
                body: task + ' will happen in ' + message[key]
              }
              promises.push(Notifications.scheduleLocalNotificationAsync(
                notification,
                {time: date - parseInt(key)}
              ).then(id => {newNotiIds[key] = id}))
            }
          })
          // update api
          Promise.all(promises)
          .then(() => {
            editTask(userId, itemId, task, date, newNotiIds) 
            navigation.navigate('Deadlines')
          })
        } else { // if item details are unchanged
          var newNotiIds = {}
          var promises = []
          Object.keys(notiList).forEach(key => {
            if (typeof itemNoti[key] !== 'undefined') {
              // inherit the old notifications
              newNotiIds[key] = itemNoti[key] 
            } else if (notiList[key] === true) {
              // create new notifications
              const notification = {
                title: 'Deadline notification',
                body: task + ' will happen in ' + message[key]
              }
              promises.push(Notifications.scheduleLocalNotificationAsync(
                notification,
                {time: date - parseInt(key)}
              ).then(id => {newNotiIds[key] = id}))
            }
          })
          // update api
          Promise.all(promises)
          .then(() => {
            editTask(userId, itemId, task, date, newNotiIds) 
            navigation.navigate('Deadlines')
          })
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

    function handleNotify(duration, state) {
      notiList[duration.toString()] = state
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
              style={[YellowLine.rightWhiteButton, date < new Date() && {backgroundColor: '#00000080'}]} 
              onPress={openCloseNotificationSetting}
              disabled={date < new Date()}
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
              notiList={notiList}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    )
}