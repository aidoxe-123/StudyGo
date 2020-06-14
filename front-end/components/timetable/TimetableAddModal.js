import React, {useState, useEffect } from 'react'
import { View, Animated, Modal, Text, 
  Dimensions, TouchableOpacity, TextInput,
  TouchableWithoutFeedback, Keyboard, Picker, Alert
} from 'react-native'
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'; 
import { TimetableStyles } from '../../style/TimetableStyles'
import { TimetableEditStyles } from '../../style/TimetableEditStyles'
import { getAutoFocusEnabled } from 'expo/build/AR';

export default function TimetableEditModal({height, width, x, y, handleClose, handleAdd}) {
  const SCREEN_WIDTH = Dimensions.get('window').width
  const SCREEN_HEIGHT = Dimensions.get('window').height

  const [tempName, setTempName] = useState('') // to be used in edit form
  const [tempDes, setTempDes] = useState('') // to be used in edit form
  const [tempDay, setTempDay] = useState('monday') // to be used in edit form
  const [tempStartHour, setTempStartHour] = useState('00')
  const [tempStartMinute, setTempStartMinute] = useState('00')
  const [tempEndHour, setTempEndHour] = useState('00')
  const [tempEndMinute, setTempEndMinute] = useState('00')

  const [validHour, setValidHour] = useState(true)

  const modalCoordinate = useState(new Animated.ValueXY({x: x, y: y}))[0]
  const modalHeight = useState(new Animated.Value(height))[0]
  const modalWidth = useState(new Animated.Value(width))[0]
  const whiteBoxFlex = useState(new Animated.Value(0))[0]

  const days = useState([
    {dayName: 'monday'},
    {dayName: 'tuesday'},
    {dayName: 'wednesday'},
    {dayName: 'thurday'},
    {dayName: 'friday'},
  ])[0]

  function toTwoDigitString(number) {
    return number < 10 ? '0' + number : '' + number
  }

  function toMinuteSinceMidnight(hourStr, minuteStr) {
    return (hourStr === '' ? 0 : Number.parseInt(hourStr) * 60)
      + (minuteStr === '' ? 0 : Number.parseInt(minuteStr))
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
      duration: duration
    })
    const changeWidth = Animated.timing(modalWidth, {
      toValue: SCREEN_WIDTH / 4 * 3,
      duration: duration
    })
    const changeHeight = Animated.timing(modalHeight, {
      toValue: SCREEN_HEIGHT / 4 * 3,
      duration: duration,
    })
    const changeWhiteBoxFlex = Animated.timing(whiteBoxFlex, {
      toValue: 4,
      duration: duration
    })
    Animated.parallel([
      changeCoordinate,
      changeWidth,
      changeHeight,  
      changeWhiteBoxFlex
    ]).start()
  }, [])

  function handleSubmit() {
    var newStart = toMinuteSinceMidnight(tempStartHour, tempStartMinute)
    var newEnd = toMinuteSinceMidnight(tempEndHour, tempEndMinute)
    
    if (newStart > newEnd) {
      setValidHour(false)
      return
    }
    
    if (tempName === '') return

    var lesson = {
      day: tempDay,
      start: newStart,
      end: newEnd,
      name: tempName,
      description: tempDes,
    }
    handleAdd(lesson)
  }

  return (
    <Modal visible={true} transparent={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={TimetableEditStyles.container}>
          <Animated.View
            style={[{
              height: modalHeight,
              width: modalWidth,
              backgroundColor: '#588093'
            }, modalCoordinate.getLayout()]}
          >
            <View style={TimetableEditStyles.insideBlueBox}>  
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
              }}
            >
              <View style={TimetableEditStyles.editDescriptionBox} >
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
              <TouchableOpacity 
                style={[TimetableEditStyles.doneButton, {right: 10}]}
                onPress={handleSubmit}
              >
                <MaterialIcons name="done" size={24} color="white" />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}