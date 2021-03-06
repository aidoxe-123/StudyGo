import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function HourTitle({startHour, endHour}) {
  const timeArray = []
  for (var i = 0; i <= 24; i++) {
    timeArray[i] = i
  }

  const toTimeString = (hour) => (hour < 10) ? '0' + hour + ':00' : hour + ':00'
  return (
    <View style={styles.row}>
      {
        timeArray.filter(hour => hour >= startHour && hour <= endHour)
        .map(toTimeString)
        .map(hour => {
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
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourText: {
    textAlign: 'center',
    fontFamily: 'sourcesanspro-regular',
    fontSize: 15,
  }
})