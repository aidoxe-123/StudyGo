import React, {useState, useEffect } from 'react'
import { View, Animated, Modal, Text, 
  Dimensions, TouchableOpacity, TextInput, StyleSheet,
  TouchableWithoutFeedback, Keyboard, Picker,
} from 'react-native'
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons'; 
import { TimetableStyles } from '../../../../style/TimetableStyles'
import { TimetableEditStyles } from '../../../../style/TimetableEditStyles'

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
    const duration = 250
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
      useNativeDriver: false,
    })
    const changeHeight = Animated.timing(modalHeight, {
      toValue: SCREEN_HEIGHT / 4 * 3,
      duration: duration,
      useNativeDriver: false,
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
        <View style={styles.container}>
          <Animated.View
            style={[{
              height: modalHeight,
              width: modalWidth,
              backgroundColor: '#51c9e7',
              borderRadius: 10,
              overflow: 'hidden'
            }, modalCoordinate.getLayout()]}
          >
            <View style={styles.insideBlueBox}>  
              <View>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 4, height: 30}}>
                    <Picker
                      itemStyle={{}}
                      mode="dropdown"
                      style={styles.dayDropdown}
                      itemStyle={{fontFamily: 'raleway-medium'}}
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
                      style={[styles.duration, !validHour && {color: 'red'}]} 
                      value={tempStartHour.toString()}
                      keyboardType='numeric'
                      onChangeText={value => setTempStartHour(handleTimeChange(value, tempStartHour, 24))}
                    />
                    <Text style={[styles.duration, !validHour && {color: 'red'}]}>:</Text>
                    <TextInput 
                      style={[styles.duration, !validHour && {color: 'red'}]} 
                      value={tempStartMinute.toString()}
                      keyboardType='numeric'
                      onChangeText={value => setTempStartMinute(handleTimeChange(value, tempStartMinute, 60))}
                    />
                    <Text style={[styles.duration, !validHour && {color: 'red'}]}> - </Text>
                    <TextInput 
                      style={[styles.duration, !validHour && {color: 'red'}]} 
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
                  style={[styles.name, 
                    {borderBottomWidth: 1, borderColor: 'white'}
                  ]}
                  value={tempName}
                  onChangeText={text => setTempName(text)}
                  placeholder='Class name'
                  placeholderTextColor='#ffffff'
                />
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
              }}
            >
              <View style={styles.editDescriptionBox} >
                <TextInput
                  style={styles.editDescriptionInput}
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
                style={[styles.doneButton, {right: 10}]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00000080'
  },
  insideBlueBox: {
    flex: 1, 
    paddingHorizontal: 10, 
    paddingTop: 23
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
  dayDropdown: {
    color: 'rgba(255,255,255,0.7)', 
    transform: [
      {scaleX: 16/14}, 
      {scaleY: 16/14}, 
      {translateX: 5}, 
      {translateY: -9}
    ],
    height: 50,
    width: 100
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
  }
})