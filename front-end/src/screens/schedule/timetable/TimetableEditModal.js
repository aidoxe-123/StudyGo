import React, {useState, useEffect } from 'react'
import { View, Animated, Modal, Text, 
  Dimensions, TouchableOpacity, TextInput,
  TouchableWithoutFeedback, Keyboard, Picker, Alert
} from 'react-native'
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'; 
import { TimetableStyles } from '../../../../style/TimetableStyles'
import { TimetableEditStyles } from '../../../../style/TimetableEditStyles'

export default function TimetableEditModal({height, width, x, y, handleClose, handleEdit, handleDelete, lesson}) {
  const SCREEN_WIDTH = Dimensions.get('window').width
  const SCREEN_HEIGHT = Dimensions.get('window').height

  const [start, setStart] = useState(lesson.start)
  const [end, setEnd] = useState(lesson.end)
  const [name, setName] = useState(lesson.name)
  const [day, setDay] = useState(lesson.day)
  const [description, setDescription] = useState(lesson.description)

  const [tempName, setTempName] = useState(lesson.name) // to be used in edit form
  const [tempDes, setTempDes] = useState(lesson.description) // to be used in edit form
  const [tempDay, setTempDay] = useState(day) // to be used in edit form
  const [tempStartHour, setTempStartHour] = useState(toTwoDigitString(Math.floor(start / 60)))
  const [tempStartMinute, setTempStartMinute] = useState(toTwoDigitString(start % 60))
  const [tempEndHour, setTempEndHour] = useState(toTwoDigitString(Math.floor(end / 60)))
  const [tempEndMinute, setTempEndMinute] = useState(toTwoDigitString(end % 60))

  const [validHour, setValidHour] = useState(true)

  const modalCoordinate = useState(new Animated.ValueXY({x: x, y: y}))[0]
  const modalHeight = useState(new Animated.Value(height))[0]
  const modalWidth = useState(new Animated.Value(width))[0]
  const whiteBoxFlex = useState(new Animated.Value(0))[0]

  const [edit, setEdit] = useState(false)

  const days = useState([
    {dayName: 'monday'},
    {dayName: 'tuesday'},
    {dayName: 'wednesday'},
    {dayName: 'thursday'},
    {dayName: 'friday'},
  ])[0]

  function toTwoDigitString(number) {
    return number < 10 ? '0' + number : '' + number
  }

  function toMinuteSinceMidnight(hourStr, minuteStr) {
    return (hourStr === '' ? 0 : Number.parseInt(hourStr) * 60)
      + (minuteStr === '' ? 0 : Number.parseInt(minuteStr))
  }

  function makeTimeString(start, end, day) {
    const startHour = toTwoDigitString(Math.floor(start / 60))  + ':' 
                    + toTwoDigitString(start % 60)
    const endHour = toTwoDigitString(Math.floor(end / 60))  + ':' 
                  + toTwoDigitString(end % 60)
    const timeString = day.charAt(0).toUpperCase() + day.slice(1) + ', ' + startHour + ' - ' + endHour 
    // Day of week, hh:mm-hh:mm
    return timeString
  }

  function handleTimeChange(value, prevValue, threshold) {
    setValidHour(true)
    if ((value.length > 2 && value.charAt(0) !== '0') || value.includes(',') || value.includes('.')) {
      return prevValue
    } else if (value === '') {
      return ''
    } else {
      var shortenStr = value.length > 2 ? value.slice(1) : value
      if (Number.parseInt(shortenStr) < threshold) {
        return shortenStr
      } else {
        return prevValue
      }
    }
  }

  useEffect(() => {
    const duration = 300
    const changeCoordinate = Animated.timing(modalCoordinate, {
      toValue: {
        x: SCREEN_WIDTH / 8,
        y: SCREEN_HEIGHT / 8,
      },
      duration: duration,
      useNativeDriver: false
    })
    const changeWidth = Animated.timing(modalWidth, {
      toValue: SCREEN_WIDTH / 4 * 3,
      duration: duration,
      useNativeDriver: false
    })
    const changeHeight = Animated.timing(modalHeight, {
      toValue: SCREEN_HEIGHT / 4 * 3,
      duration: duration,
      useNativeDriver: false
    })
    const changeWhiteBoxFlex = Animated.timing(whiteBoxFlex, {
      toValue: 4,
      duration: duration,
      useNativeDriver: false
    })
    Animated.parallel([
      changeCoordinate,
      changeWidth,
      changeHeight,  
      changeWhiteBoxFlex
    ]).start()
  }, [])

  function handlePenButtonClicked() {
    setTempDes(description)
    setTempName(name)
    setTempStartHour(toTwoDigitString(Math.floor(start / 60)))
    setTempStartMinute(toTwoDigitString(start % 60))
    setTempEndHour(toTwoDigitString(Math.floor(end / 60)))
    setTempEndMinute(toTwoDigitString(end % 60))
    setEdit(prevEdit => !prevEdit)
  }

  function handleSubmit() {
    var newStart = toMinuteSinceMidnight(tempStartHour, tempStartMinute)
    var newEnd = toMinuteSinceMidnight(tempEndHour, tempEndMinute)
    
    if (newStart > newEnd) {
      setValidHour(false)
      return
    }
    
    if (tempName === '') return
    
    setStart(newStart)
    setEnd(newEnd)
    setDescription(tempDes)
    setName(tempName)
    setDay(tempDay)

    var newLesson = {
      day: tempDay,
      start: newStart,
      end: newEnd,
      name: tempName,
      description: tempDes,
    }
    handleEdit(newLesson, lesson.id)
    setEdit(false)
  }

  function handleDeleteClicked() {
    Alert.alert('Delete task', 'Are you sure you want to delete?', [
      {text: 'cancel', onPress:() => {}},
      {text: 'proceed', onPress:() => handleDelete(lesson.id)}
    ])
  }
  return (
    <Modal visible={true} transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={TimetableEditStyles.container}>
          <Animated.View
            style={[{
              height: modalHeight,
              width: modalWidth,
              backgroundColor: '#588093',
              borderRadius: 10,
              overflow: 'hidden'
            }, modalCoordinate.getLayout()]}
          >
            <View style={TimetableEditStyles.insideBlueBox}>
              { !edit ? (
                <View>
                  <Text style={TimetableEditStyles.duration}>
                    {makeTimeString(start, end, day)}
                  </Text>
                  <Text style={TimetableEditStyles.name}>{name}</Text>
                </View>
                ) : (
                <View>
                  <View style={[TimetableEditStyles.editDayTimeRow]}>
                    <View style={{flex: 4, height: 30}}>
                      <Picker
                        itemStyle={{}}
                        mode="dropdown"
                        style={TimetableEditStyles.dayDropdown}
                        selectedValue={tempDay}
                        onValueChange={value => setTempDay(value)}
                      >
                        {days.map((day, index) => (
                          <Picker.Item
                            color="black"
                            label={day.dayName.charAt(0).toUpperCase() + day.dayName.slice(1,3)}
                            value={day.dayName}
                            index={index}
                            key={index}
                          />
                        ))}
                      </Picker>
                    </View>
                    <View style={{flex: 6, flexDirection: 'row'}}>
                      <TextInput 
                        style={[TimetableEditStyles.duration, !validHour && {color: 'red'}]} 
                        value={tempStartHour.toString()}
                        keyboardType='numeric'
                        onChangeText={value => setTempStartHour(handleTimeChange(value, tempStartHour, 24))}
                      />
                      <Text style={[TimetableEditStyles.duration, !validHour && {color: 'red'}]}>:</Text>
                      <TextInput 
                        style={[TimetableEditStyles.duration, !validHour && {color: 'red'}]} 
                        value={tempStartMinute.toString()}
                        keyboardType='numeric'
                        onChangeText={value => setTempStartMinute(handleTimeChange(value, tempStartMinute, 60))}
                      />
                      <Text style={[TimetableEditStyles.duration, !validHour && {color: 'red'}]}> - </Text>
                      <TextInput 
                        style={[TimetableEditStyles.duration, !validHour && {color: 'red'}]} 
                        value={tempEndHour.toString()}
                        keyboardType='numeric'
                        onChangeText={value => setTempEndHour(handleTimeChange(value, tempEndHour, 24))}
                      />
                      <Text style={[TimetableEditStyles.duration, !validHour && {color: 'red'}]}>:</Text>
                      <TextInput 
                        style={[TimetableEditStyles.duration, !validHour && {color: 'red'}]} 
                        value={tempEndMinute.toString()}
                        keyboardType='numeric'
                        onChangeText={value => setTempEndMinute(handleTimeChange(value, tempEndMinute, 60))}
                      />
                    </View>
                  </View>
                  <TextInput 
                    style={[TimetableStyles.lessonName, 
                      {fontSize: 30, borderBottomWidth: 1, borderColor: 'white'}
                    ]}
                    value={tempName}
                    onChangeText={text => setTempName(text)}
                    placeholder='Class name'
                  />
                </View>
                )
              }
              
              <TouchableOpacity 
                onPress={handleClose} 
                style={TimetableEditStyles.closeButton}
              >
                <AntDesign name="close" size={30} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <Animated.View 
              style={{
                flex: whiteBoxFlex, 
                backgroundColor: 'white',
                padding: 10,
              }}>
              {
                !edit 
                ? <Text style={TimetableEditStyles.viewDescription}>{description}</Text> 
                : <View style={TimetableEditStyles.editDescriptionBox} >
                  <TextInput
                    style={TimetableEditStyles.editDescriptionInput}
                    underlineColorAndroid="transparent"
                    placeholder="Type the description of the class"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    value={tempDes}
                    onChangeText={text => setTempDes(text)}
                  />
                </View>
              }
              {
                edit && 
                <TouchableOpacity 
                  style={TimetableEditStyles.doneButton}
                  onPress={handleSubmit}
                >
                  <MaterialIcons name="done" size={24} color="white" />
                </TouchableOpacity>
              }
              {
                edit &&
                <TouchableOpacity
                  style={TimetableEditStyles.deleteButton}
                  onPress={handleDeleteClicked}
                >
                  <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
              }
              
              <TouchableOpacity
                style={TimetableEditStyles.penButton}
                onPress={handlePenButtonClicked}
              >
                  <Feather name="edit-2" size={24} color='white'/>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}