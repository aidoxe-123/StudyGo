import React, {useContext} from 'react'
import { View, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { YellowLine } from '../../style/yellowLine'
import { UserIdContext} from '../../routes/MainDrawer'


export default function Timetable() {
  const userId = useContext(UserIdContext)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <View style={YellowLine.header}>
          <Text h1 style={YellowLine.headerText}>Timetable</Text>
          <TouchableOpacity style={YellowLine.rightWhiteButton}>
              <View style={YellowLine.insideWhiteButton}>
                  <Text style={YellowLine.whiteButtonText}>Calendar</Text>
                  <Ionicons name='ios-arrow-forward' size={18} style={YellowLine.whiteButtonIcon}/>
              </View> 
          </TouchableOpacity>
        </View>
        <Text>{userId}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}