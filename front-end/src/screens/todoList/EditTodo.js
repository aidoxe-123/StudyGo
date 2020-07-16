import React, { useState, useContext, useEffect } from 'react'
import { 
  View, Text, TextInput, TouchableOpacity, 
  TouchableWithoutFeedback, Keyboard,
} from 'react-native'
import { Fontisto, Ionicons, Feather } from '@expo/vector-icons'
import { AddTodoStyles } from '../../../style/AddTodoStyles'
import { YellowLine } from '../../../style/yellowLine'
import { UserIdContext, DatePicker } from '../../components/index'
import { editTask } from './DataFetcher'
import { Notifications } from 'expo'
import NotificationSettings from './NotificationSettings'

export default function EditTodo({ route, navigation }) {
    const userId = useContext(UserIdContext)
    const { itemId, itemTask, itemDate, itemNoti } = route.params
    const [task, setTask] = useState(itemTask)
    const [date, setDate] = useState(new Date(Date.parse(itemDate)))
    const [editDate, setEditDate] = useState(false)
    const [editTime, setEditTime] = useState(false)
    
    const [notiList, setNotiList] = useState()

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

    function handleSubmit() {
      if (task.length > 0) {
        if (date - new Date(itemDate) !== 0 || task !== itemTask) { // if item details are changed
          // delete all notification of the old version
          Object.values(itemNoti).forEach(value => {
            Notifications.cancelScheduledNotificationAsync(value) 
          })
          // make new notification
          var newNotiIds = {}
          var promises = []
          Object.keys(notiList).forEach(key => {
            if (notiList[key] === true) {
              if (date - parseInt(key) > new Date()) {
                const notification = {
                  title: 'Deadline notification',
                  body: task + ' will happen in ' + message[key]
                }
                promises.push(Notifications.scheduleLocalNotificationAsync(
                  notification,
                  {time: date - parseInt(key)}
                ).then(id => {newNotiIds[key] = id}))
              } else {
                newNotiIds[key] = 'some random id'
              }
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
            if (notiList[key] === true) {
              if (typeof itemNoti[key] !== 'undefined') {
                //inherit the old notifications
                newNotiIds[key] = itemNoti[key]
              } else if (date - parseInt(key) > new Date()) {
                // create new notifications
                const notification = {
                  title: 'Deadline notification',
                  body: task + ' will happen in ' + message[key]
                }
                promises.push(Notifications.scheduleLocalNotificationAsync(
                  notification,
                  {time: date - parseInt(key)}
                ).then(id => {newNotiIds[key] = id}))
              } else {
                newNotiIds[key] = 'some random id'
              }
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
      setNotiList(prev => {
        return {
          ...prev,
          [duration.toString()] : state
        }
      })
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
                onChangeText={(value) => setTask(value)}
                value={task}
            />
            <View style={{flexDirection: 'row', marginTop: 20}}>
              {/* select date */}
              <View>  
                <View style={AddTodoStyles.dateView}>
                  <Fontisto name="date" size={24} color="black" />
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
              <View style={{marginLeft: 20}}>    
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
          { notiList &&
            <NotificationSettings 
              handleNotify={handleNotify}
              notiList={notiList}
            />
          }
        </View>
      </TouchableWithoutFeedback>
    )
}