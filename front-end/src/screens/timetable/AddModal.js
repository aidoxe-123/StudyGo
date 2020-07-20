import React, { useState, useEffect } from 'react'
import {
  View, Modal, Text,
  Dimensions, TouchableOpacity, TextInput, StyleSheet,
  TouchableWithoutFeedback, Keyboard, Picker, Alert, Platform
} from 'react-native'
import Animated from 'react-native-reanimated'
import { useTransition, mix } from 'react-native-redash'
import { DatePicker, DropdownList } from '../../components/index'
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';


export default function EditModal({ height, width, x, y, handleClose, handleAdd }) {
  const SCREEN_WIDTH = Dimensions.get('window').width
  const SCREEN_HEIGHT = Dimensions.get('window').height

  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [name, setName] = useState('')
  const [day, setDay] = useState('monday')
  const [description, setDescription] = useState()

  const [editingStart, setEditingStart] = useState(false)
  const [editingEnd, setEditingEnd] = useState(false)

  const [toggled, setToggle] = useState(false)
  const transition = useTransition(toggled, { duration: 250 })
  const translateX = mix(transition, 0, SCREEN_WIDTH / 8 - x)
  const translateY = mix(transition, 0, SCREEN_HEIGHT / 8 - y)
  const modalHeight = mix(transition, height, SCREEN_HEIGHT / 4 * 3)
  const modalWidth = mix(transition, width, SCREEN_WIDTH / 4 * 3)
  const borderRadius = mix(transition, 0, 10)
  const whiteBoxFlex = mix(transition, 0, 4)

  const days = useState([
    { dayName: 'monday' },
    { dayName: 'tuesday' },
    { dayName: 'wednesday' },
    { dayName: 'thursday' },
    { dayName: 'friday' },
    { dayName: 'saturday' },
    { dayName: 'sunday' },
  ])[0]

  function toTwoDigitString(number) {
    return number < 10 ? '0' + number : '' + number
  }

  function toHourString(timeFromMidnight) {
    return toTwoDigitString(Math.floor(timeFromMidnight / 60)) + ':'
      + toTwoDigitString(timeFromMidnight % 60)
  }

  function makeTimeString(start, end, day) {
    const startHour = toHourString(start)
    const endHour = toHourString(end)
    const timeString = day.charAt(0).toUpperCase() + day.slice(1) + ', ' + startHour + ' - ' + endHour
    // Day of week, hh:mm-hh:mm
    return timeString
  }

  function handleChangeStartTime(event, date) {
    setEditingStart(false)
    if (typeof date !== 'undefined') {
      var hour = date.getHours()
      var minute = date.getMinutes()
      setStart(hour * 60 + minute)
    }
  }

  function handleChangeEndTime(event, date) {
    setEditingEnd(false)
    if (typeof date !== 'undefined') {
      var hour = date.getHours()
      var minute = date.getMinutes()
      setEnd(hour * 60 + minute)
    }
  }

  useEffect(() => {
    setToggle(true)
  }, [])

  function handleSubmit() {
    if (name === '') {
      Alert.alert('Missing name', 'Class name cannot be empty',
        [{ text: 'ok' }]
      )
      return
    }

    if (end <= start) {
      Alert.alert('Invalid time interval', 'End time must be after start time',
        [{ text: 'ok' }]
      )
      return
    }

    var newLesson = {
      day: day,
      start: start,
      end: end,
      name: name,
      description: description,
    }
    handleAdd(newLesson)
  }

  return (
    <Modal visible={true} transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Animated.View
            style={{
              top: y,
              left: x,
              height: modalHeight,
              width: modalWidth,
              backgroundColor: '#51c9e7',
              borderRadius: 10,
              overflow: 'hidden',
              borderRadius: borderRadius,
              transform: [
                { translateX: translateX },
                { translateY: translateY }
              ]
            }}
          >
            <View style={styles.insideBlueBox}>
              <View>
                <View style={{ flexDirection: 'row', zIndex: 1 }}>
                  <View style={{ flex: 1, alignItems: 'center', zIndex: 999 }}>
                    {Platform.OS == 'android'
                      ? <Picker
                        itemStyle={{}}
                        mode="dropdown"
                        style={styles.dayDropdown}
                        selectedValue={day}
                        onValueChange={value => setDay(value)}
                      >
                        {days.map((day, index) => (
                          <Picker.Item
                            color="black"
                            label={day.dayName.toUpperCase()}
                            value={day.dayName}
                            index={index}
                            key={index}
                          />
                        ))}
                      </Picker>
                      : <View style={styles.dayDropdown}>
                        <DropdownList
                          placeHolder="MONDAY"
                          allOptions={days}
                          labelExtractor={item => item.dayName.toUpperCase()}
                          onChoose={item => setDay(item.dayName)}
                          optionStyle={{
                            backgroundColor: 'white',
                            padding: "3%",
                            borderColor: '#51c9e7',
                            borderBottomWidth: 1
                          }}
                          selectStyle={{
                            backgroundColor: '#51c9e7',
                            padding: "3%",
                            text: {
                              fontSize: 18,
                              color: 'rgba(255,255,255,0.7)',
                            },
                            borderColor: '#51c9e7',
                            borderBottomWidth: 1
                          }}
                        />
                      </View>
                    }
                  </View>
                  <View style={styles.hourContainer}>
                    <TouchableOpacity onPress={() => setEditingStart(true)}>
                      <Text style={styles.duration}>{toHourString(start)}</Text>
                    </TouchableOpacity>
                    <Text style={styles.duration}> - </Text>
                    <TouchableOpacity onPress={() => setEditingEnd(true)}>
                      <Text style={styles.duration}>{toHourString(end)}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ zIndex: 0 }}>
                  <TextInput
                    style={[styles.name,
                    { borderBottomWidth: 1, borderColor: 'white' }
                    ]}
                    value={name}
                    onChangeText={text => setName(text)}
                    placeholder='Class name'
                    placeholderTextColor='#ffffff80'
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={handleClose}
                style={styles.closeButton}
              >
                <AntDesign name="close" size={30} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <Animated.View
              style={{
                flex: whiteBoxFlex,
                backgroundColor: 'white',
                padding: 10,
                zIndex: 0,
              }}>
              <View style={styles.editDescriptionBox} >
                <TextInput
                  style={styles.editDescriptionInput}
                  underlineColorAndroid="transparent"
                  placeholder="Type the description of the class"
                  placeholderTextColor="#00000030"
                  numberOfLines={10}
                  multiline={true}
                  value={description}
                  onChangeText={text => setDescription(text)}
                />
              </View>
              <TouchableOpacity
                style={[styles.doneButton, { right: 10 }]}
                onPress={handleSubmit}
              >
                <MaterialIcons name="done" size={24} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          <DatePicker
            showDatePicker={editingStart}
            value={new Date(2020, 1, 1, Math.floor(start / 60), start % 60)}
            handleChange={handleChangeStartTime}
            mode='time'
          />
          <DatePicker
            showDatePicker={editingEnd}
            value={new Date(2020, 1, 1, Math.floor(end / 60), end % 60)}
            handleChange={handleChangeEndTime}
            mode='time'
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080'
  },
  insideBlueBox: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 23,
    zIndex: 1
  },
  duration: {
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
  },
  name: {
    color: 'white',
    fontFamily: 'sourcesanspro-semibold',
    fontSize: 30
  },
  dayDropdown: Platform.OS == 'android' ?
    {
      flex: 1,
      color: 'rgba(255,255,255,0.7)',
      width: '100%'
    } : {
      flex: 1,
      position: 'absolute',
      width: '100%'
    },
  closeButton: {
    position: 'absolute',
    right: 7,
    top: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewDescription: {
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
    padding: 6
  },
  editDescriptionBox: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    height: 160
  },
  editDescriptionInput: {
    textAlignVertical: 'top',
    height: 150,
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
  },
  doneButton: {
    position: 'absolute',
    bottom: 10,
    right: 70,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#2a9d8f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  penButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#51c9e7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButton: {
    position: 'absolute',
    bottom: 10,
    right: 130,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#e76f51',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hourContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})