import React from 'react'
import {View, StyleSheet} from 'react-native'
import Cell from './Cell'

export default function DayRow({lessons, openModal}) {
  const timeArray = []
  for (var i = 0; i < 24; i++) {
    timeArray[i] = i
  }

  return (
    <View style={styles.row}>
      <View style={{width: 50}}/>
      { timeArray.map(index => {
          return (
            <View style={styles.backgroundCell} key={index.toString()}/>
          )
        })
      }
      <View style={{width: 50, borderLeftWidth: 1}}/>
      { lessons.map(lesson => {
        return (
          <Cell 
            key={lesson.id} 
            lesson={lesson} 
            openModal={openModal}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  backgroundCell: {
    width: 100,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  }
})