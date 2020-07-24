import React from 'react'
import {View, StyleSheet, Animated} from 'react-native'
import Cell from './Cell'

export default function DayRow({lessons, openModal, portionWidth}) {
  const paddingWidth = Animated.divide(portionWidth, new Animated.Value(2))

  const timeArray = []
  for (var i = 0; i < 24; i++) {
    timeArray[i] = i
  }

  return (
    <Animated.View style={styles.row}>
      <Animated.View style={{width: paddingWidth}}/>
      { timeArray.map(index => {
          return (
            <Animated.View style={[styles.backgroundCell, {width: portionWidth}]} key={index.toString()}/>
          )
        })
      }
      <Animated.View style={{width: paddingWidth, borderLeftWidth: 1}}/>
      { lessons.map(lesson => {
        return (
          <Cell 
            key={lesson.id} 
            lesson={lesson} 
            openModal={openModal}
            portionWidth={portionWidth}
          />
        )
      })}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  backgroundCell: {
    // width: 100,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  }
})