import React from 'react'
import { View, Text } from 'react-native'
import { TimetableStyles } from '../../../../style/TimetableStyles'

export default function TimetableHourColumn() {
  const timeArray = []
  for (var i = 0; i <= 24; i++) {
    timeArray[i] = (i  < 10) 
      ? '0' + i +':00'
      : i + ':00' 
  }
  return (
    <View style={TimetableStyles.hourColumn}>
        <View style={TimetableStyles.substituteRow}></View>
        {
          timeArray.map(hour => {
            return <Text style={TimetableStyles.hourText} key={hour}>{hour}</Text>
          })
        }
    </View>
  )
}