import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TimetableHourColumn() {
  const timeArray = []
  for (var i = 0; i <= 24; i++) {
    timeArray[i] = (i  < 10) 
      ? '0' + i +':00'
      : i + ':00' 
  }
  return (
    <View style={styles.hourColumn}>
        <View style={styles.substituteRow}></View>
        {
          timeArray.map(hour => {
            return <Text style={styles.hourText} key={hour}>{hour}</Text>
          })
        }
    </View>
  )
}

const styles = StyleSheet.create({
  hourColumn: {
    height: '100%',
    width: '20%',
  },
  hourText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'sourcesanspro-regular'
  },
  substituteRow: {
    flex: 0.5,
  },
})