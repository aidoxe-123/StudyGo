import React from 'react'
import { View, Text, } from 'react-native'
import { TimetableStyles } from '../../../style/TimetableStyles'

export default function TimetableEmptyColumn() {
  const timeArray = []
  for (var i = 0; i < 25; i++) {
    timeArray[i] = i
  }
  return (
    <View style={[TimetableStyles.column, {width: 70}]}>
      { timeArray.map(index => {
        return (
          <View key={index.toString()} style={{flex: 1, borderLeftWidth: 1, borderColor: '#dddddd'}}></View>
        )
      })}
      <View style={TimetableStyles.substituteRow}></View>
    </View>
  )
}