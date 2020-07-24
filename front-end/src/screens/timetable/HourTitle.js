import React from 'react'
import {View, Text, StyleSheet, Animated} from 'react-native'

//portionWidth: Animted.Value
export default function HourTitle({portionWidth}) {
  const timeArray = []
  for (var i = 0; i <= 24; i++) {
    timeArray[i] = (i  < 10) 
      ? '0' + i +':00'
      : i + ':00' 
  }
  return (
    <Animated.View style={styles.row}>
      {
        timeArray.map(hour => {
          return (
            <Animated.View key={hour} style={[styles.hourContainer, {width: portionWidth}]}>
              <Text style={styles.hourText}>{hour}</Text>
            </Animated.View>
          )
        })
      }
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 0.5,
    flexDirection: 'row'
  },
  hourContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourText: {
    textAlign: 'center',
    fontFamily: 'sourcesanspro-regular',
    fontSize: 20,
  }
})