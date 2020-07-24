import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function HourTitle() {
  const timeArray = []
  for (var i = 0; i <= 24; i++) {
    timeArray[i] = (i < 10)
      ? '0' + i + ':00'
      : i + ':00'
  }
  return (
    <View style={styles.row}>
      {
        timeArray.map(hour => {
          return (
            <View key={hour} style={styles.hourContainer}>
              <Text style={styles.hourText}>{hour}</Text>
            </View>
          )
        })
      }
    </View>
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