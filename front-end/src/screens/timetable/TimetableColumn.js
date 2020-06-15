import React from 'react'
import { View, Text, } from 'react-native'
import { TimetableStyles } from '../../../style/TimetableStyles'
import TimetableCell from './TimetableCell'

export default function TimetableColumn({dateName, lessons, openModal}) {
  const timeArray = []
  for (var i = 0; i < 24; i++) {
    timeArray[i] = i
  }

  return (
    <View style={TimetableStyles.column}>
      <Text style={TimetableStyles.header}>{dateName.toUpperCase().substring(0, 3)}</Text>
      { timeArray.map(index => {
          return (
            <View style={{flex: 1}} key={index.toString()}>
              <View style={TimetableStyles.backgroundCell}></View>
            </View> 
          )
        })
      }
      <View style={[TimetableStyles.substituteRow, {borderTopWidth: 1, borderColor: '#dddddd'}]}></View>
      { lessons.map(lesson => {
        return (
          <TimetableCell 
            key={lesson.id} 
            lesson={lesson} 
            openModal={openModal}
            dateName={dateName}
          />
        )
      })}
    </View>
  )
}